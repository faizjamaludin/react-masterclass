import type { ReactNode } from 'react'

interface ProfileCardProps {
  name: string
  role?: string
  children?: ReactNode
}

function ProfileCard({ name, role = 'Engineer', children }: ProfileCardProps) {
  return (
    <div className="w-64 rounded-[var(--radius-lg)] border border-[var(--color-border)] p-4">
      <p className="font-semibold">{name}</p>
      <p className="text-sm text-[var(--color-text-muted)]">{role}</p>
      <div className="mt-3 text-sm text-[var(--color-text-secondary)]">{children}</div>
    </div>
  )
}

export default function Demo() {
  return (
    <div className="flex flex-wrap gap-4">
      <ProfileCard name="Aisyah" role="Tech Lead">Owns the design system.</ProfileCard>
      <ProfileCard name="Daniel" />
    </div>
  )
}
