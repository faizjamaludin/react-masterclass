import { useSyncExternalStore } from 'react'

const root = () => document.documentElement

function subscribe(callback: () => void) {
  // Token values change when the theme class on <html> changes
  const observer = new MutationObserver(callback)
  observer.observe(root(), { attributes: true, attributeFilter: ['class', 'style'] })
  return () => observer.disconnect()
}

const getSnapshot = () => root().className

/** Returns the current computed value of each CSS custom property, re-read on theme change. */
export function useCssVariables(names: string[]) {
  useSyncExternalStore(subscribe, getSnapshot)
  const styles = getComputedStyle(root())
  return Object.fromEntries(names.map((name) => [name, styles.getPropertyValue(name).trim()]))
}
