import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function Demo() {
  const [count, setCount] = useState(0)

  function addThree() {
    // Each updater gets the latest queued value
    setCount((c) => c + 1)
    setCount((c) => c + 1)
    setCount((c) => c + 1)
  }

  return (
    <div className="flex items-center gap-3 text-sm">
      <Button size="sm" onClick={addThree}>+3</Button>
      <b>{count}</b>
    </div>
  )
}
