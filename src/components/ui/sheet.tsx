import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

const Sheet = DialogPrimitive.Root
const SheetTrigger = DialogPrimitive.Trigger
const SheetClose = DialogPrimitive.Close
const SheetPortal = DialogPrimitive.Portal

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-[var(--color-overlay)] backdrop-blur-sm',
      'data-[state=open]:animate-in data-[state=open]:fade-in-0',
      'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
      className,
    )}
    {...props}
  />
))
SheetOverlay.displayName = 'SheetOverlay'

const sideClasses = {
  left: 'inset-y-0 left-0 h-full w-72 border-r border-[var(--color-border)] data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left',
  right: 'inset-y-0 right-0 h-full w-72 border-l border-[var(--color-border)] data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right',
  top: 'inset-x-0 top-0 max-h-[80svh] border-b border-[var(--color-border)] data-[state=open]:slide-in-from-top data-[state=closed]:slide-out-to-top',
  bottom: 'inset-x-0 bottom-0 max-h-[80svh] rounded-t-[var(--radius-lg)] border-t border-[var(--color-border)] data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom',
} as const

interface SheetContentProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  side?: 'left' | 'right' | 'top' | 'bottom'
}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  SheetContentProps
>(({ side = 'left', className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed z-50 flex flex-col bg-[var(--color-surface-raised)] shadow-[var(--shadow-modal)] outline-none',
        'transition ease-in-out',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:duration-200 data-[state=open]:duration-300',
        sideClasses[side],
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-3 top-3 rounded-[var(--radius-sm)] p-1 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-overlay)] transition-colors">
        <X size={16} />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </SheetPortal>
))
SheetContent.displayName = 'SheetContent'

const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col gap-1.5 px-4 py-4 border-b border-[var(--color-border)]', className)} {...props} />
)
SheetHeader.displayName = 'SheetHeader'

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('text-base font-bold font-[family-name:var(--font-heading)] text-[var(--color-text-primary)]', className)}
    {...props}
  />
))
SheetTitle.displayName = 'SheetTitle'

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-[var(--color-text-secondary)]', className)}
    {...props}
  />
))
SheetDescription.displayName = 'SheetDescription'

const SheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('mt-auto flex justify-end gap-2 border-t border-[var(--color-border)] px-4 py-3', className)} {...props} />
)
SheetFooter.displayName = 'SheetFooter'

export { Sheet, SheetTrigger, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter }
