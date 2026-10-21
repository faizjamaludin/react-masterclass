import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { Loader2 } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-600)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-[var(--color-brand-600)] text-white shadow-sm hover:bg-[var(--color-brand-700)] active:bg-[var(--color-brand-800)] dark:bg-[var(--color-brand-500)] dark:hover:bg-[var(--color-brand-400)]',
        ghost:
          'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-overlay)] hover:text-[var(--color-text-primary)]',
        destructive:
          'bg-[var(--color-error)] text-white hover:bg-[var(--color-error)]/90',
        outline:
          'border border-[var(--color-brand-600)] text-[var(--color-brand-600)] hover:bg-[var(--color-brand-50)] bg-transparent dark:border-[var(--color-brand-300)] dark:text-[var(--color-brand-200)] dark:hover:bg-[var(--color-brand-800)]',
        link:
          'text-[var(--color-brand-600)] underline-offset-4 hover:underline p-0 h-auto dark:text-[var(--color-brand-300)]',
        field:
          'w-full justify-start border border-[var(--color-border)] bg-[var(--color-surface-raised)] text-left font-normal text-[var(--color-text-primary)] shadow-sm hover:bg-[var(--color-surface-raised)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-600)] data-[empty=true]:text-[var(--color-text-muted)] aria-invalid:border-[var(--color-error)] aria-invalid:focus-visible:ring-[var(--color-error)]',
      },
      size: {
        default: 'h-8 gap-1.5 px-2.5 text-sm rounded-[var(--radius-md)]',
        xs: 'h-6 gap-1 px-2 text-xs rounded-[var(--radius-sm)] [&_svg]:h-3 [&_svg]:w-3',
        sm: 'h-7 gap-1 px-2.5 text-xs rounded-[var(--radius-sm)] [&_svg]:h-3.5 [&_svg]:w-3.5',
        lg: 'h-9 gap-1.5 px-2.5 text-sm rounded-[var(--radius-md)]',
        icon: 'h-8 w-8 rounded-[var(--radius-md)] [&_svg]:h-4 [&_svg]:w-4',
        'icon-xs': 'h-6 w-6 rounded-[var(--radius-sm)] [&_svg]:h-3 [&_svg]:w-3',
        'icon-sm': 'h-7 w-7 rounded-[var(--radius-sm)] [&_svg]:h-3.5 [&_svg]:w-3.5',
        'icon-lg': 'h-9 w-9 rounded-[var(--radius-md)] [&_svg]:h-4 [&_svg]:w-4',
      },
    },
    compoundVariants: [
      // Matches the height and padding of Input and Select
      { variant: 'field', className: 'h-9 px-3' },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  /** Shows a spinner in place of any icon and disables the button */
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, disabled, children, ...props }, ref) => {
    // Slot needs a single child, so asChild buttons don't render the spinner
    if (asChild) {
      return (
        <Slot className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
          {children}
        </Slot>
      )
    }
    return (
      <button
        className={cn(
          buttonVariants({ variant, size, className }),
          // Hide the button's own icon while the spinner shows
          loading && '[&>svg:not(.animate-spin)]:hidden',
        )}
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading && <Loader2 size={size === 'xs' || size === 'icon-xs' ? 12 : size === 'sm' || size === 'icon-sm' ? 14 : 16} className="animate-spin" />}
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
