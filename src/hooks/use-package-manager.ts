import { useSyncExternalStore } from 'react'

export const packageManagers = ['npm', 'pnpm', 'yarn', 'bun'] as const
export type PackageManager = (typeof packageManagers)[number]

const STORAGE_KEY = 'package-manager'
const CHANGE_EVENT = 'package-manager-change'

function read(): PackageManager {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return packageManagers.includes(value as PackageManager) ? (value as PackageManager) : 'npm'
  } catch {
    return 'npm'
  }
}

function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback)
  window.addEventListener('storage', callback)
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback)
    window.removeEventListener('storage', callback)
  }
}

/** The chosen package manager, shared by every command block on the site. */
export function usePackageManager() {
  const packageManager = useSyncExternalStore(subscribe, read)

  const setPackageManager = (next: PackageManager) => {
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Storage unavailable — the choice won't persist
    }
    window.dispatchEvent(new Event(CHANGE_EVENT))
  }

  return { packageManager, setPackageManager }
}
