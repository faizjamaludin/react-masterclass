import { useState } from 'react'
import { ArrowDown, ArrowUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { DiagramFrame } from './diagram-frame'

const nodes = [
  { name: '<App />', owns: 'owns the state: user' },
  { name: '<Page />', owns: 'passes user down' },
  { name: '<Avatar />', owns: 'shows user.name' },
]

/** Props flow down the tree; events flow back up through callbacks. */
export function DataFlow() {
  const [mode, setMode] = useState<'props' | 'events'>('props')
  const down = mode === 'props'

  return (
    <DiagramFrame title="One-way data flow" caption="Data goes down as props. To change it, the child calls a function from its parent.">
      <div className="mb-4 inline-flex rounded-full border border-[var(--color-border)] p-0.5 text-xs font-semibold" role="group" aria-label="Direction">
        {(['props', 'events'] as const).map((m) => (
          <button
            key={m}
            type="button"
            aria-pressed={mode === m}
            onClick={() => setMode(m)}
            className={cn('rounded-full px-3 py-1 transition-colors', mode === m ? 'bg-[var(--color-brand-600)] text-white' : 'text-[var(--color-text-secondary)]')}
          >
            {m === 'props' ? 'Data goes down ↓' : 'Events go up ↑'}
          </button>
        ))}
      </div>
      <div className="mx-auto flex max-w-sm flex-col items-stretch">
        {nodes.map((node, i) => (
          <div key={node.name} className="flex flex-col items-center">
            <div className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-overlay)] px-4 py-2.5 text-center">
              <p className="font-mono text-sm font-bold text-[var(--color-text-primary)]">{node.name}</p>
              <p className="text-xs text-[var(--color-text-muted)]">{node.owns}</p>
            </div>
            {i < nodes.length - 1 && (
              <div className={cn('flex items-center gap-2 py-2 text-xs font-mono font-bold motion-safe:animate-pulse', down ? 'text-[var(--color-success)]' : 'text-[var(--color-brand-500)]')}>
                {down ? <ArrowDown size={16} /> : <ArrowUp size={16} />}
                {down ? 'user={user}' : 'onRename(name)'}
              </div>
            )}
          </div>
        ))}
      </div>
    </DiagramFrame>
  )
}
