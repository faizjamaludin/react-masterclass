import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '@/lib/utils'

type TabsVariant = 'pill' | 'underline'

// TabsList passes its variant down so every trigger matches without className overrides
const TabsVariantContext = React.createContext<TabsVariant>('pill')

const Tabs = TabsPrimitive.Root

const listVariants: Record<TabsVariant, string> = {
  pill: 'inline-flex items-center gap-1 rounded-[var(--radius-lg)] bg-[var(--color-surface-overlay)] p-1',
  underline: 'flex items-center gap-0 border-b border-[var(--color-border)]',
}

const triggerVariants: Record<TabsVariant, string> = {
  pill: cn(
    'rounded-[var(--radius-md)] px-4 py-2 text-sm',
    'data-[state=active]:bg-[var(--color-surface-raised)] data-[state=active]:shadow-sm',
  ),
  underline: cn(
    '-mb-px border-b-2 border-transparent px-4 pb-2.5 pt-1 text-xs',
    'data-[state=active]:border-[var(--color-brand-600)] dark:data-[state=active]:border-[var(--color-brand-300)]',
  ),
}

interface TabsListProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> {
  /** `pill` (default) for standalone tabs, `underline` for tabs inside a card */
  variant?: TabsVariant
}

const TabsList = React.forwardRef<React.ElementRef<typeof TabsPrimitive.List>, TabsListProps>(
  ({ className, variant = 'pill', ...props }, ref) => (
    <TabsVariantContext.Provider value={variant}>
      <TabsPrimitive.List ref={ref} className={cn(listVariants[variant], className)} {...props} />
    </TabsVariantContext.Provider>
  ),
)
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => {
  const variant = React.useContext(TabsVariantContext)
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-1.5 whitespace-nowrap font-medium transition-all duration-150 [&_svg]:shrink-0',
        'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
        'data-[state=active]:font-semibold data-[state=active]:text-[var(--color-brand-600)] dark:data-[state=active]:text-[var(--color-brand-200)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-600)] focus-visible:ring-offset-1',
        'disabled:pointer-events-none disabled:opacity-50',
        triggerVariants[variant],
        className,
      )}
      {...props}
    />
  )
})
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn('mt-4 focus-visible:outline-none', className)}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
