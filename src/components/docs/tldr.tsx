import { Zap } from 'lucide-react'

/** One-sentence answer shown at the top of a lesson. */
export function TLDR({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 flex gap-3 rounded-[var(--radius-lg)] border border-[var(--color-brand-200)] bg-[var(--color-brand-50)] p-4 dark:border-[var(--color-brand-700)] dark:bg-[var(--color-brand-900)]/40">
      <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-[#c6ff3d] text-black">
        <Zap size={14} fill="currentColor" />
      </span>
      <div>
        <p className="font-[family-name:var(--font-heading)] text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-brand-600)] dark:text-[var(--color-brand-300)]">TL;DR</p>
        <div className="mt-1 text-[var(--color-text-primary)] [&_p]:m-0 [&_p]:text-[var(--color-text-primary)]">{children}</div>
      </div>
    </div>
  )
}
