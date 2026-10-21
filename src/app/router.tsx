import type { MDXContent } from 'mdx/types'
import { createBrowserRouter, Navigate, type RouteObject } from 'react-router-dom'
import { docPages, navigation, type DocPageEntry } from '@/config/navigation'
import { DocsLayout } from '@/layouts/docs-layout'
import { RootLayout } from '@/layouts/root-layout'
import { HomePage } from '@/pages/home-page'
import { NotFoundPage } from '@/pages/not-found-page'

const contentModules = import.meta.glob<{ default: MDXContent }>('/src/content/**/*.mdx')

/** Each doc page is code-split: its MDX loads only when the route is visited. */
function createDocRoute(page: DocPageEntry): RouteObject {
  return {
    path: `${page.section.id}/${page.slug}`,
    lazy: async () => {
      const loader = contentModules[`/src/content/${page.section.id}/${page.slug}.mdx`]
      if (!loader) return { Component: NotFoundPage }
      const [{ DocPage }, { default: Content }] = await Promise.all([import('@/pages/doc-page'), loader()])
      return { Component: () => <DocPage page={page} Content={Content} /> }
    },
  }
}

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    // Shown while the first lazy route loads on a direct visit
    hydrateFallbackElement: <div className="min-h-svh" />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'docs',
        element: <DocsLayout />,
        children: [
          { index: true, element: <Navigate to={docPages[0].href} replace /> },
          // `/docs/foundations` → first page of that section
          ...navigation.map((section) => ({
            path: section.id,
            element: <Navigate to={`/docs/${section.id}/${section.items[0].slug}`} replace />,
          })),
          ...docPages.map(createDocRoute),
        ],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
