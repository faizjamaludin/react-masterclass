import { Suspense, use } from 'react'
import { highlight, type CodeLanguage } from '@/lib/highlighter'
import { cn } from '@/lib/utils'
import { CopyButton } from './copy-button'

const cache = new Map<string, Promise<string>>()

function getHighlighted(code: string, lang: CodeLanguage) {
  const key = `${lang}:${code}`
  let promise = cache.get(key)
  if (!promise) {
    promise = highlight(code, lang)
    cache.set(key, promise)
  }
  return promise
}

const codeClasses =
  '[&_pre]:overflow-x-auto [&_pre]:p-4 [&_pre]:text-[13px] [&_pre]:leading-relaxed [&_pre]:!bg-transparent'

function HighlightedCode({ code, lang }: { code: string; lang: CodeLanguage }) {
  const html = use(getHighlighted(code, lang))
  return <div className={codeClasses} dangerouslySetInnerHTML={{ __html: html }} />
}

function PlainCode({ code }: { code: string }) {
  return (
    <div className={codeClasses}>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  )
}

interface CodeBlockProps {
  code: string
  lang?: CodeLanguage
  /** Removes the outer border/radius when nested inside another frame */
  bare?: boolean
  className?: string
}

export function CodeBlock({ code, lang = 'tsx', bare = false, className }: CodeBlockProps) {
  const trimmed = code.trimEnd()

  return (
    <div
      className={cn(
        'group relative bg-[var(--color-surface-overlay)] text-[var(--color-text-primary)]',
        !bare && 'rounded-[var(--radius-md)] border border-[var(--color-border)]',
        className,
      )}
    >
      <CopyButton value={trimmed} className="absolute right-3 top-3 z-10 opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100" />
      <Suspense fallback={<PlainCode code={trimmed} />}>
        <HighlightedCode code={trimmed} lang={lang} />
      </Suspense>
    </div>
  )
}
