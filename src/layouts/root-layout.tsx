import { Outlet, ScrollRestoration } from 'react-router-dom'
import { SiteHeader } from '@/components/layout/site-header'

export function RootLayout() {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <ScrollRestoration />
    </div>
  )
}
