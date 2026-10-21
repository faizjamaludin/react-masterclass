import { Target } from 'lucide-react'

interface TryItProps {
  /** A hint revealed on demand, so readers try first */
  hint?: string
  children: React.ReactNode
}

/** A small hands-on challenge at the end of a lesson. */
export function TryIt({ hint, children }: TryItProps) {
  return (
    <aside className="my-6 rounded-[var(--radius-lg)] border-2 border-dashed border-[var(--color-brand-300)] p-4 dark:border-[var(--color-brand-600)]">
      <p className="flex items-center gap-2 font-[family-name:var(--font-heading)] text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-brand-600)] dark:text-[var(--color-brand-300)]">
        <Target size={14} /> Try it
      </p>
      <div className="mt-2 text-[var(--color-text-primary)] [&_p]:m-0 [&_p]:text-[var(--color-text-primary)]">{children}</div>
      {hint && (
        <details className="mt-3 text-sm">
          <summary className="cursor-pointer font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]">Show a hint</summary>
          <p className="mt-2 text-[var(--color-text-secondary)]">{hint}</p>
        </details>
      )}
    </aside>
  )
}
