export type SectionId = 'foundations' | 'hooks' | 'patterns'

export interface NavItem {
  title: string
  slug: string
  description: string
}

export interface NavSection {
  id: SectionId
  title: string
  items: NavItem[]
}

export interface DocPageEntry extends NavItem {
  section: NavSection
  href: string
}

/**
 * Single source of truth for the course. Each item maps to
 * `src/content/{section.id}/{item.slug}.mdx` and the route `/docs/{section.id}/{item.slug}`.
 */
export const navigation: NavSection[] = [
  {
    id: 'foundations',
    title: 'Foundations',
    items: [
      { title: 'Introduction', slug: 'introduction', description: 'What this masterclass covers, who it is for and how to use it.' },
      { title: 'Getting Started', slug: 'getting-started', description: 'Set up a Vite + React + TypeScript project and run it.' },
      { title: 'JSX & Components', slug: 'jsx-and-components', description: 'Describe UI with JSX and split it into components.' },
      { title: 'Props & Children', slug: 'props-and-children', description: 'Pass data and content into components, with typed props.' },
      { title: 'Rendering Lists', slug: 'rendering-lists', description: 'Render collections with map, and why keys matter.' },
    ],
  },
  {
    id: 'hooks',
    title: 'Hooks',
    items: [
      { title: 'useState', slug: 'use-state', description: 'Give a component memory, and update it correctly.' },
      { title: 'useEffect', slug: 'use-effect', description: 'Synchronise a component with something outside React.' },
      { title: 'useRef', slug: 'use-ref', description: 'Hold values and DOM nodes that do not trigger a re-render.' },
      { title: 'useContext', slug: 'use-context', description: 'Share data across the tree without prop drilling.' },
      { title: 'useReducer', slug: 'use-reducer', description: 'Manage complex state transitions in one place.' },
      { title: 'Custom Hooks', slug: 'custom-hooks', description: 'Extract and reuse stateful logic.' },
    ],
  },
  {
    id: 'patterns',
    title: 'Patterns',
    items: [
      { title: 'Composition', slug: 'composition', description: 'Build flexible components with children and compound components.' },
      { title: 'Forms', slug: 'forms', description: 'Controlled inputs, validation and submit handling.' },
      { title: 'Data Fetching', slug: 'data-fetching', description: 'Load data with loading, error and empty states, without race conditions.' },
      { title: 'Performance', slug: 'performance', description: 'When to use memo, useMemo and useCallback, and when not to.' },
      { title: 'React 19', slug: 'react-19', description: 'Actions, use, useOptimistic and the other new APIs.' },
    ],
  },
]

export const docHref = (sectionId: SectionId, slug: string) => `/docs/${sectionId}/${slug}`

/** All pages flattened in sidebar order — used for routes, search and prev/next links. */
export const docPages: DocPageEntry[] = navigation.flatMap((section) =>
  section.items.map((item) => ({ ...item, section, href: docHref(section.id, item.slug) })),
)
