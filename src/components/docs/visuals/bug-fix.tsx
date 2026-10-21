import { Suspense } from 'react'
import { Bug, CheckCircle2 } from 'lucide-react'
import { ExampleRender } from '@/components/docs/component-preview'

interface BugFixProps {
  /** Example names inside `src/examples`, e.g. `use-state/mutation-broken` */
  broken: string
  fixed: string
  /** What goes wrong, in one line */
  problem: string
  /** Why the fix works, in one line */
  fix: string
}

function Side({ tone, name, text }: { tone: 'broken' | 'fixed'; name: string; text: string }) {
  const isBroken = tone === 'broken'
  const Icon = isBroken ? Bug : CheckCircle2
  return (
    <div className="flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface-raised)]">
      <p className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider ${isBroken ? 'bg-[var(--color-error-bg)] text-[var(--color-error-text)]' : 'bg-[var(--color-success-bg)] text-[var(--color-success)]'}`}>
        <Icon size={14} /> {isBroken ? 'Broken' : 'Fixed'}
      </p>
      <div className="flex min-h-[150px] flex-1 items-center justify-center p-4">
        <Suspense fallback={<p className="text-sm text-[var(--color-text-muted)]">Loading…</p>}>
          <ExampleRender name={name} />
        </Suspense>
      </div>
      <p className="border-t border-[var(--color-border)] px-4 py-2 text-xs text-[var(--color-text-secondary)]">{text}</p>
    </div>
  )
}

/** Two live examples side by side: the bug and its fix. */
export function BugFix({ broken, fixed, problem, fix }: BugFixProps) {
  return (
    <div className="my-6 grid gap-4 sm:grid-cols-2">
      <Side tone="broken" name={broken} text={problem} />
      <Side tone="fixed" name={fixed} text={fix} />
    </div>
  )
}
