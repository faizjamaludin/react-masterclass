import { useEffect, useState } from 'react'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { DiagramFrame } from './diagram-frame'

const steps = [
  { title: 'Event', body: 'The user clicks, types or a timer fires.', emoji: '👆' },
  { title: 'setState', body: 'Your handler asks React for a new value.', emoji: '📝' },
  { title: 'Render', body: 'React calls your component again. It returns new JSX.', emoji: '⚙️' },
  { title: 'Commit', body: 'React updates only the DOM that changed.', emoji: '🖼️' },
]

/** The loop behind every update. Auto-plays; click a step to jump to it. */
export function RenderCycle() {
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(true)

  useEffect(() => {
    if (!playing || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setActive((a) => (a + 1) % steps.length), 1600)
    return () => clearInterval(id)
  }, [playing])

  return (
    <DiagramFrame title="The render cycle" caption="Click a step to pause on it. The loop never ends: every state change starts it again.">
      <ol className="flex flex-col items-stretch gap-2 lg:flex-row lg:items-center">
        {steps.map((step, i) => (
          <li key={step.title} className="flex flex-1 flex-col items-center gap-2 lg:flex-row">
            <button
              type="button"
              onClick={() => {
                setPlaying(false)
                setActive(i)
              }}
              aria-current={active === i ? 'step' : undefined}
              className={cn(
                'w-full flex-1 rounded-[var(--radius-lg)] border p-3 text-left transition-all',
                active === i
                  ? 'scale-[1.03] border-[var(--color-brand-500)] bg-[var(--color-brand-50)] shadow-md dark:bg-[var(--color-brand-900)]/50'
                  : 'border-[var(--color-border)] opacity-70 hover:opacity-100',
              )}
            >
              <span className="text-xl" aria-hidden>{step.emoji}</span>
              <p className="mt-1 font-[family-name:var(--font-heading)] text-sm font-semibold text-[var(--color-text-primary)]">{i + 1}. {step.title}</p>
              <p className="mt-0.5 text-xs text-[var(--color-text-secondary)]">{step.body}</p>
            </button>
            {i < steps.length - 1 && (
              <>
                <ArrowRight size={16} className="hidden shrink-0 text-[var(--color-text-muted)] lg:block" />
                <ChevronDown size={16} className="shrink-0 text-[var(--color-text-muted)] lg:hidden" />
              </>
            )}
          </li>
        ))}
      </ol>
      <div className="mt-4 flex items-center justify-between text-xs text-[var(--color-text-muted)]">
        <span>↺ back to step 1 on the next event</span>
        <button type="button" onClick={() => setPlaying((p) => !p)} className="rounded-full border border-[var(--color-border)] px-3 py-1 hover:bg-[var(--color-surface-overlay)]">
          {playing ? 'Pause' : 'Play'}
        </button>
      </div>
    </DiagramFrame>
  )
}
