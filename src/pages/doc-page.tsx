import { useEffect, useRef, useState } from 'react'
import { MDXProvider } from '@mdx-js/react'
import { ChevronRight } from 'lucide-react'
import type { MDXContent } from 'mdx/types'
import { Link } from 'react-router-dom'
import { CompleteButton } from '@/components/docs/complete-button'
import { DocsPager } from '@/components/layout/docs-pager'
import { TableOfContents, type TocItem } from '@/components/layout/table-of-contents'
import { mdxComponents } from '@/components/docs/mdx-components'
import type { DocPageEntry } from '@/config/navigation'

interface DocPageProps {
  page: DocPageEntry
  Content: MDXContent
}

export function DocPage({ page, Content }: DocPageProps) {
  const articleRef = useRef<HTMLElement>(null)
  const [toc, setToc] = useState<TocItem[]>([])

  useEffect(() => {
    document.title = `${page.title} · ${page.section.title}`
    const headings = articleRef.current?.querySelectorAll<HTMLHeadingElement>('h2[id], h3[id]') ?? []
    setToc(
      Array.from(headings, (heading) => ({
        id: heading.id,
        title: heading.textContent ?? '',
        level: heading.tagName === 'H3' ? 3 : 2,
      })),
    )
  }, [page])

  return (
    <div className="flex gap-10 py-8 lg:pl-10">
      <article ref={articleRef} className="min-w-0 max-w-3xl flex-1">
        <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
          <Link to={`/docs/${page.section.id}`} className="hover:text-[var(--color-text-primary)]">
            {page.section.title}
          </Link>
          <ChevronRight size={12} />
          <span className="text-[var(--color-text-secondary)]">{page.title}</span>
        </nav>
        <header className="mb-10 space-y-3">
          <h1 className="text-3xl font-bold tracking-tight">{page.title}</h1>
          <p className="text-base text-[var(--color-text-secondary)]">{page.description}</p>
        </header>
        <MDXProvider components={mdxComponents}>
          <Content />
        </MDXProvider>
        <CompleteButton href={page.href} />
        <DocsPager href={page.href} />
      </article>
      <aside className="sticky top-24 hidden h-fit max-h-[calc(100svh-8rem)] w-56 shrink-0 overflow-y-auto xl:block">
        <TableOfContents items={toc} />
      </aside>
    </div>
  )
}
