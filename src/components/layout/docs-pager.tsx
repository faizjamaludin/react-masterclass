import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { docPages } from '@/config/navigation'
import { cn } from '@/lib/utils'

export function DocsPager({ href }: { href: string }) {
  const index = docPages.findIndex((page) => page.href === href)
  const prev = docPages[index - 1]
  const next = docPages[index + 1]

  const linkClass =
    'flex flex-1 flex-col gap-1 rounded-[var(--radius-md)] border border-[var(--color-border)] p-4 transition-colors hover:border-[var(--color-brand-300)] hover:bg-[var(--color-surface-overlay)]'

  return (
    <div className="mt-16 flex flex-col gap-3 border-t border-[var(--color-border)] pt-8 sm:flex-row">
      {prev ? (
        <Link to={prev.href} className={linkClass}>
          <span className="flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
            <ChevronLeft size={14} /> Previous
          </span>
          <span className="text-sm font-medium text-[var(--color-text-primary)]">{prev.title}</span>
        </Link>
      ) : (
        <span className="flex-1" />
      )}
      {next && (
        <Link to={next.href} className={cn(linkClass, 'items-end text-right')}>
          <span className="flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
            Next <ChevronRight size={14} />
          </span>
          <span className="text-sm font-medium text-[var(--color-text-primary)]">{next.title}</span>
        </Link>
      )}
    </div>
  )
}
