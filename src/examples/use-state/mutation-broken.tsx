import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function Demo() {
  const [items, setItems] = useState(['Milk'])

  return (
    <div className="space-y-3 text-sm">
      <Button
        size="sm"
        onClick={() => {
          items.push('Egg') // mutates the existing array
          setItems(items) // same array, so React sees no change
        }}
      >
        Add item
      </Button>
      <p>Items shown: <b>{items.length}</b></p>
    </div>
  )
}
