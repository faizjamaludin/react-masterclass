import { useActiveHeading } from '@/hooks/use-active-heading'
import { cn } from '@/lib/utils'

export interface TocItem {
  id: string
  title: string
  level: 2 | 3
}

export function TableOfContents({ items }: { items: TocItem[] }) {
  const ids = items.map((item) => item.id)
  const activeId = useActiveHeading(ids)

  if (items.length === 0) return null

  return (
    <nav aria-label="On this page" className="space-y-3">
      <p className="font-[family-name:var(--font-heading)] text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
        On this page
      </p>
      <ul className="border-l border-[var(--color-border)] text-sm">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                '-ml-px block border-l-2 py-1 transition-colors',
                item.level === 3 ? 'pl-6' : 'pl-3',
                activeId === item.id
                  ? 'border-[var(--color-brand-600)] font-medium text-[var(--color-brand-600)] dark:border-[var(--color-brand-300)] dark:text-[var(--color-brand-300)]'
                  : 'border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
              )}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
