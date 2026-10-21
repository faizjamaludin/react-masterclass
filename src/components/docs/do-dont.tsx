import { CheckCircle2, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DoDontProps {
  type: 'do' | 'dont'
  children: React.ReactNode
}

/** A "Do" or "Don't" guideline card. Place two inside a `<DoDontGrid>`. */
export function DoDont({ type, children }: DoDontProps) {
  const isDo = type === 'do'
  const Icon = isDo ? CheckCircle2 : XCircle
  return (
    <div
      className={cn(
        'rounded-[var(--radius-md)] border-t-4 border-x border-b border-x-[var(--color-border)] border-b-[var(--color-border)] bg-[var(--color-surface-raised)] p-4 text-sm',
        isDo ? 'border-t-[var(--color-success)]' : 'border-t-[var(--color-error)]',
      )}
    >
      <p className={cn('mb-2 flex items-center gap-1.5 font-[family-name:var(--font-heading)] font-semibold', isDo ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]')}>
        <Icon size={16} />
        {isDo ? 'Do' : "Don't"}
      </p>
      <div className="text-[var(--color-text-secondary)] [&_p]:m-0">{children}</div>
    </div>
  )
}

export function DoDontGrid({ children }: { children: React.ReactNode }) {
  return <div className="my-6 grid gap-4 sm:grid-cols-2">{children}</div>
}
