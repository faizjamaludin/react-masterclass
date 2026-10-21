import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { DiagramFrame } from './diagram-frame'

/** Shows React's hidden list of state slots next to a component that uses two of them. */
export function HookSlots() {
  const [count, setCount] = useState(0)
  const [liked, setLiked] = useState(false)
  const [renders, setRenders] = useState(1)
  const [lastChange, setLastChange] = useState<'count' | 'liked' | null>(null)

  const update = (which: 'count' | 'liked', fn: () => void) => {
    setLastChange(which)
    setRenders((r) => r + 1)
    fn()
  }

  const slots = [
    { index: 0, name: 'count', value: String(count) },
    { index: 1, name: 'liked', value: String(liked) },
  ]

  return (
    <DiagramFrame title="Where hook state lives" caption="The function runs again on every render. The values are read back from React's slots, in call order.">
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-[var(--color-text-muted)]">Your component</p>
          <pre className="overflow-x-auto rounded-[var(--radius-md)] bg-[#14111f] p-4 text-[12.5px] leading-6 text-[#f4f4ff]">
            <code>
              {'function Post() {\n  '}
              <span className="text-[#ff4fd8]">const</span>
              {' ['}
              <span className="text-[#c6ff3d]">count</span>
              {', setCount] = '}
              <span className="text-[#38e8ff]">useState</span>
              {'(0)\n  '}
              <span className="text-[#ff4fd8]">const</span>
              {' ['}
              <span className="text-[#c6ff3d]">liked</span>
              {', setLiked] = '}
              <span className="text-[#38e8ff]">useState</span>
              {'(false)\n  ...\n}'}
            </code>
          </pre>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button size="sm" onClick={() => update('count', () => setCount((c) => c + 1))}>count + 1</Button>
            <Button size="sm" variant="outline" onClick={() => update('liked', () => setLiked((l) => !l))}>toggle liked</Button>
          </div>
        </div>

        <div>
          <p className="mb-2 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-[var(--color-text-muted)]">
            <span>Inside React (for this Post)</span>
            <span aria-live="polite">render #{renders}</span>
          </p>
          <ul className="space-y-2">
            {slots.map((slot) => (
              <li
                key={`${slot.name}-${slot.value}`}
                className={cn(
                  'flex items-center gap-3 rounded-[var(--radius-md)] border border-[var(--color-border)] px-3 py-2.5 font-mono text-sm',
                  lastChange === slot.name && 'motion-safe:animate-pulse border-[#c6ff3d] bg-[#c6ff3d]/15',
                )}
              >
                <span className="rounded bg-[var(--color-surface-overlay)] px-1.5 py-0.5 text-[11px] text-[var(--color-text-muted)]">slot {slot.index}</span>
                <span className="text-[var(--color-text-secondary)]">{slot.name}</span>
                <span className="ml-auto font-bold text-[var(--color-text-primary)]">{slot.value}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-[var(--color-text-muted)]">
            Click a button: the slot value changes, React re-runs <code>Post()</code>, and each <code>useState</code> call gets its slot back by position.
          </p>
        </div>
      </div>
    </DiagramFrame>
  )
}
