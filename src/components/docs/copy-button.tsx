import { Check, Copy } from 'lucide-react'
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'
import { cn } from '@/lib/utils'

interface CopyButtonProps {
  value: string
  className?: string
}

export function CopyButton({ value, className }: CopyButtonProps) {
  const { copied, copy } = useCopyToClipboard()

  return (
    <button
      type="button"
      onClick={() => copy(value)}
      aria-label={copied ? 'Copied' : 'Copy code'}
      className={cn(
        'inline-flex h-7 w-7 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--color-border)]',
        'bg-[var(--color-surface-raised)] text-[var(--color-text-secondary)] transition-colors',
        'hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-overlay)]',
        className,
      )}
    >
      {copied ? <Check size={14} className="text-[var(--color-success)]" /> : <Copy size={14} />}
    </button>
  )
}
