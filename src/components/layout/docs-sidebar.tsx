import { Check } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { docPages, navigation } from '@/config/navigation'
import { useProgress } from '@/hooks/use-progress'
import { cn } from '@/lib/utils'

interface DocsSidebarProps {
  /** Called after a link is clicked — used to close the mobile sheet */
  onNavigate?: () => void
}

export function DocsSidebar({ onNavigate }: DocsSidebarProps) {
  const { completed, isComplete } = useProgress()
  const done = docPages.filter((page) => completed.includes(page.href)).length
  const percent = Math.round((done / docPages.length) * 100)

  return (
    <nav aria-label="Documentation" className="space-y-6">
      <div className="px-3">
        <div className="flex items-baseline justify-between text-xs text-[var(--color-text-muted)]">
          <span>Your progress</span>
          <span className="font-mono">{done}/{docPages.length}</span>
        </div>
        <div role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100} aria-label="Course progress" className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[var(--color-surface-overlay)]">
          <div className="h-full rounded-full bg-[#c6ff3d] transition-[width] duration-500" style={{ width: `${percent}%` }} />
        </div>
      </div>
      {navigation.map((section) => (
        <div key={section.id}>
          <h4 className="mb-2 px-3 font-[family-name:var(--font-heading)] text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
            {section.title}
          </h4>
          <ul className="space-y-0.5">
            {section.items.map((item) => (
              <li key={item.slug}>
                <NavLink
                  to={`/docs/${section.id}/${item.slug}`}
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center justify-between rounded-[var(--radius-sm)] px-3 py-1.5 text-sm transition-colors',
                      isActive
                        ? 'bg-[var(--color-brand-50)] font-medium text-[var(--color-brand-600)] dark:bg-[var(--color-brand-800)] dark:text-[var(--color-brand-200)]'
                        : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-overlay)] hover:text-[var(--color-text-primary)]',
                    )
                  }
                >
                  {item.title}
                  {isComplete(`/docs/${section.id}/${item.slug}`) && (
                    <span className="flex size-4 items-center justify-center rounded-full bg-[#c6ff3d] text-black" aria-label="Completed">
                      <Check size={10} strokeWidth={3} />
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  )
}
