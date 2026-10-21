import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function Demo() {
  const [count, setCount] = useState(0)

  function addThree() {
    // Each line uses the same count from this render
    setCount(count + 1)
    setCount(count + 1)
    setCount(count + 1)
  }

  return (
    <div className="flex items-center gap-3 text-sm">
      <Button size="sm" onClick={addThree}>+3</Button>
      <b>{count}</b>
    </div>
  )
}
