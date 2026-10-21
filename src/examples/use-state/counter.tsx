import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function Demo() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex items-center gap-3">
      <Button variant="outline" onClick={() => setCount((c) => c - 1)}>-</Button>
      <span className="w-10 text-center text-lg font-semibold">{count}</span>
      <Button onClick={() => setCount((c) => c + 1)}>+</Button>
      <Button variant="ghost" onClick={() => setCount(0)}>Reset</Button>
    </div>
  )
}
