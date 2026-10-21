import { Command } from 'lucide-react'
import { cn } from '@/lib/utils'

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)

/** The search shortcut as a key cap: ⌘ K on Mac, Ctrl K elsewhere. The ⌘ is an icon, because most fonts lack the glyph. */
export function ShortcutKey({ className }: { className?: string }) {
  return (
    <kbd
      className={cn(
        'inline-flex h-5 items-center gap-0.5 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-1.5 text-[length:var(--font-size-tiny)] font-medium text-[var(--color-text-secondary)]',
        className
      )}
    >
      {isMac ? <Command size={10} /> : <span>Ctrl</span>}
      <span>K</span>
    </kbd>
  )
}
