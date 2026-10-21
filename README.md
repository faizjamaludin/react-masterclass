# React Masterclass

Documentation site for our team's React course: fundamentals, hooks, patterns and React 19. Each lesson has live previews, source code and rules of thumb.

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # type-check + production build
npm run lint
```

- **Foundations:** introduction, setup, JSX, props, lists
- **Hooks:** useState, useEffect, useRef, useContext, useReducer, custom hooks
- **Patterns:** composition, forms, data fetching, performance, React 19

Stack: React 19, TypeScript, Vite, Tailwind CSS v4, Radix UI, Lucide, React Router 7, MDX, Shiki.

## Adding a lesson

1. Add `{ title, slug, description }` to a section in `src/config/navigation.ts`. Routes, sidebar, search and prev/next links all come from it.
2. Create `src/content/<section>/<slug>.mdx`.
3. For a live example, add `src/examples/<slug>/<name>.tsx` with a default export and embed it with `<ComponentPreview name="<slug>/<name>" />`.

MDX files can use `ComponentPreview`, `PackageManagerCommand`, `PropsTable`, `Callout`, `DoDont` and `DoDontGrid` without importing them.
