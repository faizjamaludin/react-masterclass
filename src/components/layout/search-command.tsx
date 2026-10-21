import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { docPages } from '@/config/navigation'
import { cn } from '@/lib/utils'
import { ShortcutKey } from './shortcut-key'

export function SearchCommand() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen((value) => !value)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return docPages
    return docPages.filter((page) => `${page.title} ${page.description} ${page.section.title}`.toLowerCase().includes(q))
  }, [query])

  const handleOpenChange = (next: boolean) => {
    setOpen(next)
    if (!next) {
      setQuery('')
      setActiveIndex(0)
    }
  }

  const select = (href: string) => {
    handleOpenChange(false)
    navigate(href)
  }

  const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, results.length - 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (event.key === 'Enter' && results[activeIndex]) {
      select(results[activeIndex].href)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search documentation"
        className="flex h-9 w-9 items-center justify-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-3 text-sm text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-brand-300)] sm:w-56 sm:justify-start"
      >
        <Search size={14} />
        <span className="hidden flex-1 text-left sm:inline">Search docs…</span>
        <ShortcutKey className="hidden sm:inline-flex" />
      </button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="top-[20%] max-w-xl translate-y-0 overflow-hidden p-0" aria-describedby={undefined}>
          <DialogTitle className="sr-only">Search documentation</DialogTitle>
          <div className="flex items-center gap-2 border-b border-[var(--color-border)] px-4">
            <Search size={16} className="text-[var(--color-text-muted)]" />
            <input
              autoFocus
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setActiveIndex(0)
              }}
              onKeyDown={onInputKeyDown}
              placeholder="Search pages and components…"
              className="h-12 flex-1 bg-transparent pr-8 text-sm text-[var(--color-text-primary)] outline-none! placeholder:text-[var(--color-text-muted)]"
            />
          </div>
          <ul className="max-h-80 overflow-y-auto p-2 [scrollbar-gutter:stable]" role="listbox">
            {results.length === 0 && <li className="px-3 py-6 text-center text-sm text-[var(--color-text-muted)]">No results for “{query}”</li>}
            {results.map((page, index) => (
              <li key={page.href} role="option" aria-selected={index === activeIndex}>
                <button
                  type="button"
                  onClick={() => select(page.href)}
                  onMouseMove={() => setActiveIndex(index)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-[var(--radius-sm)] px-3 py-2 text-left',
                    index === activeIndex && 'bg-[var(--color-surface-overlay)]',
                  )}
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-[var(--color-text-primary)]">{page.title}</p>
                    <p className="truncate text-xs text-[var(--color-text-muted)]">{page.description}</p>
                  </div>
                  <span className="text-xs text-[var(--color-text-muted)]">{page.section.title}</span>
                  <ArrowRight size={14} className="text-[var(--color-text-muted)]" />
                </button>
              </li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>
    </>
  )
}
