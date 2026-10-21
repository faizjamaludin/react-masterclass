import path from 'node:path'
import mdx from '@mdx-js/rollup'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import remarkGfm from 'remark-gfm'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    // MDX must run before the React plugin so JSX in .mdx gets transformed
    { enforce: 'pre', ...mdx({ remarkPlugins: [remarkGfm], providerImportSource: '@mdx-js/react' }) },
    react({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ }),
    tailwindcss(),
  ],
  // Scan every example up front so Radix deps are pre-bundled once — otherwise Vite
  // re-optimizes mid-session when a lazy example is opened and React gets loaded twice
  optimizeDeps: {
    entries: ['index.html', 'src/examples/**/*.tsx'],
  },
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})
