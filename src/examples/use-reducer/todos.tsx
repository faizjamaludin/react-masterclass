import { useReducer, useState } from 'react'
import { Button } from '@/components/ui/button'

interface Todo {
  id: number
  text: string
  done: boolean
}

type Action = { type: 'add'; text: string } | { type: 'toggle'; id: number } | { type: 'remove'; id: number }

function reducer(todos: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case 'add':
      return [...todos, { id: Date.now(), text: action.text, done: false }]
    case 'toggle':
      return todos.map((t) => (t.id === action.id ? { ...t, done: !t.done } : t))
    case 'remove':
      return todos.filter((t) => t.id !== action.id)
  }
}

export default function Demo() {
  const [todos, dispatch] = useReducer(reducer, [{ id: 1, text: 'Read the docs', done: false }])
  const [text, setText] = useState('')

  return (
    <div className="w-72 space-y-3">
      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault()
          if (!text.trim()) return
          dispatch({ type: 'add', text })
          setText('')
        }}
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="New task"
          className="h-8 min-w-0 flex-1 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-transparent px-3 text-sm"
        />
        <Button size="sm" type="submit">Add</Button>
      </form>
      <ul className="space-y-1 text-sm">
        {todos.map((t) => (
          <li key={t.id} className="flex items-center justify-between">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={t.done} onChange={() => dispatch({ type: 'toggle', id: t.id })} />
              <span className={t.done ? 'text-[var(--color-text-muted)] line-through' : ''}>{t.text}</span>
            </label>
            <Button size="xs" variant="ghost" onClick={() => dispatch({ type: 'remove', id: t.id })}>Remove</Button>
          </li>
        ))}
      </ul>
    </div>
  )
}
