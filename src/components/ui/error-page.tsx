import * as React from 'react'
import { cn } from '@/lib/utils'

interface ErrorPageProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Status code shown large above the title, e.g. "404" */
  code: string
  title: string
  description: string
  /** Actions, usually a primary Button and an outline Button */
  children?: React.ReactNode
}

function ErrorPage({ code, title, description, className, children, ...props }: ErrorPageProps) {
  return (
    <div
      role="alert"
      className={cn('flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 py-16 text-center', className)}
      {...props}
    >
      <p
        aria-hidden
        className="font-[family-name:var(--font-heading)] text-6xl font-bold text-[var(--color-brand-600)] dark:text-[var(--color-brand-300)]"
      >
        {code}
      </p>
      <div className="max-w-md space-y-2">
        <h1 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-[var(--color-text-primary)]">
          {title}
        </h1>
        <p className="text-sm text-[var(--color-text-secondary)]">{description}</p>
      </div>
      {children && <div className="mt-2 flex flex-wrap items-center justify-center gap-2">{children}</div>}
    </div>
  )
}

export { ErrorPage }
