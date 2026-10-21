import { AlertTriangle, Info, Lightbulb } from 'lucide-react'
import { cn } from '@/lib/utils'

const variants = {
  info: { icon: Info, className: 'border-[var(--color-info-border)] bg-[var(--color-info-bg)] [&>svg]:text-[var(--color-info)]' },
  tip: { icon: Lightbulb, className: 'border-[var(--color-success-border)] bg-[var(--color-success-bg)] [&>svg]:text-[var(--color-success)]' },
  warning: { icon: AlertTriangle, className: 'border-[var(--color-warning-border)] bg-[var(--color-warning-bg)] [&>svg]:text-[var(--color-warning)]' },
} as const

interface CalloutProps {
  variant?: keyof typeof variants
  children: React.ReactNode
}

export function Callout({ variant = 'info', children }: CalloutProps) {
  const { icon: Icon, className } = variants[variant]
  return (
    <div className={cn('my-6 flex gap-3 rounded-[var(--radius-md)] border p-4 text-sm text-[var(--color-text-primary)]', className)}>
      <Icon size={16} className="mt-0.5 shrink-0" />
      <div className="[&_p]:m-0 [&_code]:rounded [&_code]:bg-black/5 [&_code]:px-1 dark:[&_code]:bg-white/10">{children}</div>
    </div>
  )
}
