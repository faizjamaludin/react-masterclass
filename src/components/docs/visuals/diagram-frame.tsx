import { cn } from '@/lib/utils'

interface DiagramFrameProps {
  title: string
  caption?: string
  children: React.ReactNode
  className?: string
}

/** Shared card for interactive diagrams, with a small "interactive" label. */
export function DiagramFrame({ title, caption, children, className }: DiagramFrameProps) {
  return (
    <figure className={cn('my-6 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface-raised)]', className)}>
      <figcaption className="flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-surface-overlay)] px-4 py-2">
        <span className="font-[family-name:var(--font-heading)] text-xs font-semibold text-[var(--color-text-primary)]">{title}</span>
        <span className="rounded-full bg-[#c6ff3d] px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-black">interactive</span>
      </figcaption>
      <div className="p-4 sm:p-6">{children}</div>
      {caption && <p className="border-t border-[var(--color-border)] px-4 py-2 text-xs text-[var(--color-text-muted)]">{caption}</p>}
    </figure>
  )
}
