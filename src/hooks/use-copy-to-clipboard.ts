import { useCallback, useEffect, useRef, useState } from 'react'

/** Copies text and flips `copied` to true for `resetMs`. */
export function useCopyToClipboard(resetMs = 2000) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        clearTimeout(timer.current)
        timer.current = setTimeout(() => setCopied(false), resetMs)
      } catch {
        setCopied(false)
      }
    },
    [resetMs],
  )

  return { copied, copy }
}
