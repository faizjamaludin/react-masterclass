import { useCallback, useState } from 'react'
import { Button } from '@/components/ui/button'

function useToggle(initial = false) {
  const [on, setOn] = useState(initial)
  const toggle = useCallback(() => setOn((v) => !v), [])
  return [on, toggle] as const
}

export default function Demo() {
  const [open, toggle] = useToggle()

  return (
    <div className="space-y-3">
      <Button onClick={toggle}>{open ? 'Hide' : 'Show'} details</Button>
      {open && <p className="text-sm text-[var(--color-text-secondary)]">Hooks can return anything: tuples, objects, functions.</p>}
    </div>
  )
}
