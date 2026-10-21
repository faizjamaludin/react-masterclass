import { Check } from 'lucide-react'
import { useProgress } from '@/hooks/use-progress'
import { cn } from '@/lib/utils'

/** "Mark as complete" toggle shown at the end of every lesson. */
export function CompleteButton({ href }: { href: string }) {
  const { isComplete, toggle } = useProgress()
  const done = isComplete(href)

  return (
    <div className="mt-12 flex items-center justify-between gap-4 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-4">
      <p className="text-sm text-[var(--color-text-secondary)]">{done ? 'Nice. This lesson is done.' : 'Finished reading and trying the examples?'}</p>
      <button
        type="button"
        aria-pressed={done}
        onClick={() => toggle(href)}
        className={cn(
          'inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-transform active:scale-95',
          done ? 'bg-[#c6ff3d] text-black' : 'border border-[var(--color-border)] text-[var(--color-text-primary)] hover:bg-[var(--color-surface-overlay)]',
        )}
      >
        <Check size={14} />
        {done ? 'Completed' : 'Mark as complete'}
      </button>
    </div>
  )
}
