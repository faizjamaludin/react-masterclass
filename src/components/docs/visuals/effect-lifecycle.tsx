import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { DiagramFrame } from './diagram-frame'

const steps = [
  { phase: 'Mount', label: 'Component renders', note: 'React calls your function and gets JSX. No effect has run yet.', code: 'render' },
  { phase: 'Mount', label: 'Screen updates, then setup runs', note: 'After the DOM is updated, React runs your effect: start the timer, subscribe.', code: 'setup()' },
  { phase: 'Update', label: 'A dependency changes, component re-renders', note: 'For example the id prop changed from 1 to 2.', code: 'render' },
  { phase: 'Update', label: 'Cleanup of the OLD effect runs', note: 'React tidies up the previous run first: clear the timer, unsubscribe.', code: 'cleanup()' },
  { phase: 'Update', label: 'Setup runs again with the new values', note: 'The effect starts over, using the new dependency values.', code: 'setup()' },
  { phase: 'Unmount', label: 'Component leaves the screen', note: 'React runs the last cleanup so nothing keeps running in the background.', code: 'cleanup()' },
] as const

const phaseColor = {
  Mount: 'bg-[#c6ff3d] text-black',
  Update: 'bg-[#38e8ff] text-black',
  Unmount: 'bg-[#ff4fd8] text-black',
} as const

/** Step through setup, cleanup and re-run of an effect. */
export function EffectLifecycle() {
  const [step, setStep] = useState(0)
  const current = steps[step]

  return (
    <DiagramFrame title="Life of an effect" caption="Step through to see when setup and cleanup run. Cleanup always runs before the next setup.">
      <ol className="space-y-1.5">
        {steps.map((s, i) => (
          <li
            key={i}
            className={cn(
              'flex items-center gap-3 rounded-[var(--radius-md)] border px-3 py-2 text-sm transition-colors',
              i === step ? 'border-[var(--color-brand-500)] bg-[var(--color-brand-50)] dark:bg-[var(--color-brand-900)]/50' : 'border-[var(--color-border)]',
              i > step && 'opacity-40',
            )}
          >
            <span className={cn('w-16 shrink-0 rounded-full px-2 py-0.5 text-center text-[10px] font-bold uppercase', phaseColor[s.phase])}>{s.phase}</span>
            <span className="flex-1 text-[var(--color-text-primary)]">{s.label}</span>
            <code className="rounded bg-[var(--color-surface-overlay)] px-1.5 py-0.5 text-xs">{s.code}</code>
          </li>
        ))}
      </ol>
      <p className="mt-4 min-h-10 rounded-[var(--radius-md)] bg-[var(--color-surface-overlay)] p-3 text-sm text-[var(--color-text-secondary)]" aria-live="polite">
        {current.note}
      </p>
      <div className="mt-3 flex gap-2">
        <Button size="sm" variant="outline" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>Back</Button>
        <Button size="sm" disabled={step === steps.length - 1} onClick={() => setStep((s) => s + 1)}>Next step</Button>
        <Button size="sm" variant="ghost" onClick={() => setStep(0)}>Reset</Button>
      </div>
    </DiagramFrame>
  )
}
