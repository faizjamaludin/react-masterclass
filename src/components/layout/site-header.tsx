import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { navigation } from '@/config/navigation'
import { cn } from '@/lib/utils'
import { Logo } from './logo'
import { MobileNav } from './mobile-nav'
import { SearchCommand } from './search-command'
import { ThemeToggle } from './theme-toggle'

export function SiteHeader() {
  const onHome = useLocation().pathname === '/'
  const [scrolled, setScrolled] = useState(false)

  // On the front page the header is transparent until the page scrolls under it
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b transition-colors',
        onHome
          ? cn('-mb-[65px]', scrolled ? 'border-[var(--color-border)] bg-[var(--color-surface-raised)]/70 backdrop-blur-md' : 'border-transparent bg-transparent')
          : 'border-[var(--color-border)] bg-[var(--color-surface-raised)]/90 backdrop-blur',
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-4 px-4 sm:px-6">
        <MobileNav />
        <Logo />
        <nav aria-label="Main" className="ml-6 hidden items-center gap-1 lg:flex">
          {navigation.map((section) => (
            <NavLink
              key={section.id}
              to={`/docs/${section.id}`}
              className={({ isActive }) =>
                cn(
                  'rounded-[var(--radius-sm)] px-3 py-1.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'text-[var(--color-brand-600)] dark:text-[var(--color-brand-300)]'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
                )
              }
            >
              {section.title}
            </NavLink>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <SearchCommand />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
