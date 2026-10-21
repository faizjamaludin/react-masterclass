import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

// User 1 is slow (1.5s), user 2 is fast (0.3s)
const fakeFetch = (id: number) =>
  new Promise<string>((resolve) => setTimeout(() => resolve(`User ${id}`), id === 1 ? 1500 : 300))

export default function Demo() {
  const [id, setId] = useState(0)
  const [user, setUser] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    let ignore = false
    fakeFetch(id).then((name) => {
      if (!ignore) setUser(name)
    })
    // Cleanup marks this run as stale, so its late response is ignored
    return () => {
      ignore = true
    }
  }, [id])

  return (
    <div className="space-y-2 text-sm">
      <p className="text-xs text-[var(--color-text-muted)]">Click User 1, then User 2 right away.</p>
      <div className="flex gap-2">
        <Button size="xs" variant="outline" onClick={() => setId(1)}>User 1</Button>
        <Button size="xs" variant="outline" onClick={() => setId(2)}>User 2</Button>
      </div>
      <p>Selected: <b>{id || '-'}</b></p>
      <p>Showing: <b>{id ? (user ?? 'loading…') : '-'}</b></p>
    </div>
  )
}
