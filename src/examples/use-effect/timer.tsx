import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

export default function Demo() {
  const [seconds, setSeconds] = useState(0)
  const [running, setRunning] = useState(true)

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => setSeconds((s) => s + 1), 1000)
    // Cleanup runs before the next effect and on unmount
    return () => clearInterval(id)
  }, [running])

  return (
    <div className="flex items-center gap-3">
      <span className="w-16 text-lg font-semibold tabular-nums">{seconds}s</span>
      <Button variant="outline" onClick={() => setRunning((r) => !r)}>{running ? 'Pause' : 'Resume'}</Button>
    </div>
  )
}
