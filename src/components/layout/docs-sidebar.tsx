import { NavLink } from 'react-router-dom'
import { navigation } from '@/config/navigation'
import { cn } from '@/lib/utils'

interface DocsSidebarProps {
  /** Called after a link is clicked — used to close the mobile sheet */
  onNavigate?: () => void
}

export function DocsSidebar({ onNavigate }: DocsSidebarProps) {
  return (
    <nav aria-label="Documentation" className="space-y-6">
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
                      'block rounded-[var(--radius-sm)] px-3 py-1.5 text-sm transition-colors',
                      isActive
                        ? 'bg-[var(--color-brand-50)] font-medium text-[var(--color-brand-600)] dark:bg-[var(--color-brand-800)] dark:text-[var(--color-brand-200)]'
                        : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-overlay)] hover:text-[var(--color-text-primary)]',
                    )
                  }
                >
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  )
}
