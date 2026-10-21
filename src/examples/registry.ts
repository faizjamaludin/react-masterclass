import type { ComponentType } from 'react'

type ExampleModule = { default: ComponentType }

const modules = import.meta.glob<ExampleModule>('./**/*.tsx')
const sources = import.meta.glob<string>('./**/*.tsx', { query: '?raw', import: 'default' })

const toPath = (name: string) => `./${name}.tsx`

/** Loads an example component by name, e.g. `button/variants`. */
export function loadExample(name: string) {
  const loader = modules[toPath(name)]
  if (!loader) throw new Error(`Example "${name}" not found in src/examples`)
  return loader()
}

/** Loads the raw source of an example — shown in the "Code" tab. */
export function loadExampleSource(name: string) {
  const loader = sources[toPath(name)]
  if (!loader) throw new Error(`Example source "${name}" not found in src/examples`)
  return loader()
}
