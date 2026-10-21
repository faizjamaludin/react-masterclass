import { useId } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

/** Hand-built geometry for the VIALING wordmark: 7-unit strokes on a 32-unit cap height. Clipped flat top and bottom. */
const wordmarkLetters = [
  { x: 0, d: 'M0.65 -9.59L13 32L25.35 -9.59' },
  { x: 33, d: 'M3.5 -10L3.5 42' },
  { x: 47, d: 'M0.38 41.5L17.12 -9.5M27.62 41.5L10.88 -9.5M7 22H21' },
  { x: 82, d: 'M3.5 0V32M0 28.5H22' },
  { x: 111, d: 'M3.5 -10L3.5 42' },
  { x: 125, d: 'M3.5 0V32M24.5 0V32M-1.99 -8.36L29.99 40.36' },
  { x: 160, d: 'M25.58 7.97A12.5 12.5 0 1 0 28.5 16H17' },
]

export function VialingMark({ className }: { className?: string }) {
  const id = useId()
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={className}>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5a2d6e" />
          <stop offset="1" stopColor="#2a1236" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="12" fill={`url(#${id}-bg)`} />
      <path d="M13 12 24 32 35 12" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24" cy="32" r="5.5" fill="#c6ff3d" stroke="#3a1a48" strokeWidth="3" />
    </svg>
  )
}

export function VialingWordmark({ className }: { className?: string }) {
  const id = useId()
  return (
    <svg viewBox="0 0 192 32" role="img" aria-label="Vialing" className={className}>
      <clipPath id={`${id}-clip`}>
        <rect x="-20" y="0" width="240" height="32" />
      </clipPath>
      <g clipPath={`url(#${id}-clip)`} fill="none" stroke="currentColor" strokeWidth="7" strokeMiterlimit="10">
        {wordmarkLetters.map((l) => (
          <path key={l.x} transform={`translate(${l.x} 0)`} d={l.d} />
        ))}
      </g>
    </svg>
  )
}

/** Lockup: mark + Vialing wordmark over the course name. */
export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" aria-label="Vialing React Masterclass, home" className={cn('flex items-center gap-3', className)}>
      <VialingMark className="size-9 shrink-0" />
      <span className="flex flex-col items-start gap-1.5 text-[#3a1d4e] dark:text-white">
        <VialingWordmark className="h-3 w-auto" />
        <span className="font-[family-name:var(--font-heading)] text-[10px] font-semibold uppercase leading-none tracking-[0.32em] text-[var(--color-text-secondary)]">
          React Masterclass
        </span>
      </span>
    </Link>
  )
}
