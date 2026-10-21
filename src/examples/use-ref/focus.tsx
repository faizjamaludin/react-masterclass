import { useRef } from 'react'
import { Button } from '@/components/ui/button'

export default function Demo() {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="flex items-center gap-3">
      <input ref={inputRef} placeholder="Type here" className="h-9 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-transparent px-3 text-sm" />
      <Button onClick={() => inputRef.current?.focus()}>Focus input</Button>
    </div>
  )
}
