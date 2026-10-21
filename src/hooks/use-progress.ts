import { useCallback, useSyncExternalStore } from 'react'

const STORAGE_KEY = 'masterclass-progress'
const listeners = new Set<() => void>()
let cache: string[] | null = null

function read(): string[] {
  if (cache) return cache
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
    cache = Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === 'string') : []
  } catch {
    cache = []
  }
  return cache
}

function write(next: string[]) {
  cache = next
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    // Storage can be blocked; progress then lasts for this tab only
  }
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

/** Lessons the reader marked complete, kept in localStorage. */
export function useProgress() {
  const completed = useSyncExternalStore(subscribe, read)

  const isComplete = useCallback((href: string) => completed.includes(href), [completed])
  const toggle = useCallback((href: string) => {
    const current = read()
    write(current.includes(href) ? current.filter((h) => h !== href) : [...current, href])
  }, [])

  return { completed, isComplete, toggle }
}
