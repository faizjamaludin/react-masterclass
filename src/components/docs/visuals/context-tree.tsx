import { useState } from 'react'
import { cn } from '@/lib/utils'
import { DiagramFrame } from './diagram-frame'

const tree = [
  { name: '<App />', note: 'has the user' },
  { name: '<Layout />', note: 'does not need it' },
  { name: '<Sidebar />', note: 'does not need it' },
  { name: '<UserMenu />', note: 'needs the user' },
]

/** Prop drilling versus context: how the same value reaches a deep component. */
export function ContextTree() {
  const [mode, setMode] = useState<'drill' | 'context'>('drill')
  const drilling = mode === 'drill'

  return (
    <DiagramFrame title="Prop drilling vs context" caption="Same data, two routes. Context skips the components that only pass it along.">
      <div className="mb-4 inline-flex rounded-full border border-[var(--color-border)] p-0.5 text-xs font-semibold" role="group" aria-label="Approach">
        {(['drill', 'context'] as const).map((m) => (
          <button
            key={m}
            type="button"
            aria-pressed={mode === m}
            onClick={() => setMode(m)}
            className={cn('rounded-full px-3 py-1 transition-colors', mode === m ? 'bg-[var(--color-brand-600)] text-white' : 'text-[var(--color-text-secondary)]')}
          >
            {m === 'drill' ? 'Props (drilling)' : 'Context'}
          </button>
        ))}
      </div>
      <div className="relative mx-auto max-w-sm space-y-3 pl-10">
        {/* The context "wire" that skips the middle components */}
        <div
          aria-hidden
          className={cn(
            'absolute bottom-6 left-3 top-6 w-1 rounded-full bg-[#c6ff3d] transition-opacity duration-300',
            drilling ? 'opacity-0' : 'opacity-100 motion-safe:animate-pulse',
          )}
        />
        {tree.map((node, i) => {
          const needs = i === 0 || i === tree.length - 1
          const passes = drilling && !needs
          return (
            <div
              key={node.name}
              className={cn(
                'rounded-[var(--radius-md)] border px-4 py-2.5 transition-colors',
                needs ? 'border-[var(--color-brand-500)] bg-[var(--color-brand-50)] dark:bg-[var(--color-brand-900)]/50' : 'border-[var(--color-border)] bg-[var(--color-surface-overlay)]',
                !drilling && !needs && 'opacity-50',
              )}
            >
              <p className="font-mono text-sm font-bold text-[var(--color-text-primary)]">{node.name}</p>
              <p className="text-xs text-[var(--color-text-muted)]">
                {passes ? 'user={user}  ← only passing it on' : node.note}
              </p>
            </div>
          )
        })}
      </div>
    </DiagramFrame>
  )
}
