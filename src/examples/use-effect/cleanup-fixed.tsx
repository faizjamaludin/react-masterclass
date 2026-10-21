import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import { Button } from '@/components/ui/button'

function Ticker({ setTotal }: { setTotal: Dispatch<SetStateAction<number>> }) {
  useEffect(() => {
    const id = setInterval(() => setTotal((t) => t + 1), 700)
    // Cleanup stops the interval when Ticker unmounts
    return () => clearInterval(id)
  }, [setTotal])

  return <p className="text-xs text-[var(--color-text-muted)]">Ticker is on screen</p>
}

export default function Demo() {
  const [show, setShow] = useState(true)
  const [total, setTotal] = useState(0)

  return (
    <div className="space-y-2 text-sm">
      <Button size="sm" variant="outline" onClick={() => setShow((s) => !s)}>{show ? 'Hide ticker' : 'Show ticker'}</Button>
      {show && <Ticker setTotal={setTotal} />}
      <p>Total ticks: <b>{total}</b></p>
    </div>
  )
}
