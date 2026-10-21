import { useState } from 'react'
import { Button } from '@/components/ui/button'

const initial = [
  { id: 1, name: 'Aisyah' },
  { id: 2, name: 'Daniel' },
  { id: 3, name: 'Mei' },
]

export default function Demo() {
  const [rows, setRows] = useState(initial)

  return (
    <div className="w-56 space-y-2 text-sm">
      <p className="text-xs text-[var(--color-text-muted)]">Type a note next to each name, then remove the first row.</p>
      {rows.map((row, index) => (
        <div key={index} className="flex items-center gap-2">
          <span className="w-16 shrink-0">{row.name}</span>
          <input placeholder="note" className="h-7 min-w-0 flex-1 rounded border border-[var(--color-border)] bg-transparent px-2 text-xs" />
        </div>
      ))}
      <Button size="xs" variant="outline" onClick={() => setRows(rows.slice(1))}>Remove first</Button>
    </div>
  )
}
