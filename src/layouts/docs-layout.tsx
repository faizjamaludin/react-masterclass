import { Outlet } from 'react-router-dom'
import { DocsSidebar } from '@/components/layout/docs-sidebar'

export function DocsLayout() {
  return (
    <div className="mx-auto flex max-w-[1440px] px-4 sm:px-6">
      <aside className="sticky top-16 hidden h-[calc(100svh-4rem)] w-60 shrink-0 overflow-y-auto border-r border-[var(--color-border)] py-8 pr-4 lg:block">
        <DocsSidebar />
      </aside>
      <div className="min-w-0 flex-1">
        <Outlet />
      </div>
    </div>
  )
}
