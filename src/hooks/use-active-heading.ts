import { useEffect, useState } from 'react'

/** Tracks which heading id is currently at the top of the viewport. */
export function useActiveHeading(ids: string[]) {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    if (ids.length === 0) return
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) setActiveId(visible[0].target.id)
      },
      // Top band of the viewport, below the sticky header
      { rootMargin: '-80px 0px -70% 0px' },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  return activeId
}
