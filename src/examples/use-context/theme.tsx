import { createContext, useContext, useState, type ReactNode } from 'react'
import { Button } from '@/components/ui/button'

type Mode = 'light' | 'dark'
const ModeContext = createContext<{ mode: Mode; toggle: () => void } | null>(null)

function useMode() {
  const value = useContext(ModeContext)
  if (!value) throw new Error('useMode must be used inside <ModeProvider>')
  return value
}

function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>('light')
  return <ModeContext value={{ mode, toggle: () => setMode((m) => (m === 'light' ? 'dark' : 'light')) }}>{children}</ModeContext>
}

function Panel() {
  const { mode, toggle } = useMode()
  return (
    <div className={`flex items-center gap-3 rounded-[var(--radius-md)] p-4 ${mode === 'dark' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-900'}`}>
      <span className="text-sm">Current mode: {mode}</span>
      <Button size="sm" variant="outline" onClick={toggle}>Toggle</Button>
    </div>
  )
}

export default function Demo() {
  return (
    <ModeProvider>
      <Panel />
    </ModeProvider>
  )
}
