import { memo, useEffect, useRef, useState } from 'react'

/** Counts how many times its component has rendered. Written to the DOM from an effect. */
function RenderBadge({ label }: { label: string }) {
  const count = useRef(0)
  const el = useRef<HTMLSpanElement>(null)

  // No dependency array: runs after every render of the component that owns this badge
  useEffect(() => {
    count.current += 1
    if (el.current) el.current.textContent = `${label} renders: ${count.current}`
  })
  // Reset when Strict Mode simulates an unmount, so dev and production show the same number
  useEffect(() => () => { count.current = 0 }, [])

  return <span ref={el} className="rounded-full bg-[#c6ff3d] px-2 py-0.5 font-mono text-[11px] font-bold text-black" />
}

function Heavy() {
  return (
    <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] p-3 text-sm">
      <RenderBadge label="Child" />
      <p className="mt-2 text-[var(--color-text-secondary)]">I never use the text you type, but I re-render anyway.</p>
    </div>
  )
}

const MemoHeavy = memo(Heavy)

export default function Demo() {
  const [text, setText] = useState('')
  const [useMemoChild, setUseMemoChild] = useState(false)

  return (
    <div className="w-80 space-y-3">
      <div className="flex items-center justify-between">
        <RenderBadge label="Parent" />
        <label className="flex items-center gap-2 text-xs">
          <input type="checkbox" checked={useMemoChild} onChange={(e) => setUseMemoChild(e.target.checked)} />
          wrap child in memo
        </label>
      </div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type to re-render the parent"
        className="h-9 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-transparent px-3 text-sm"
      />
      {useMemoChild ? <MemoHeavy /> : <Heavy />}
    </div>
  )
}
