import { Children, isValidElement, type ComponentProps, type ReactElement, type ReactNode } from 'react'
import { Link as LinkIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { CodeLanguage } from '@/lib/highlighter'
import { slugify } from '@/lib/slugify'
import { cn } from '@/lib/utils'
import { CodeBlock } from './code-block'

function textOf(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(textOf).join('')
  if (isValidElement<{ children?: ReactNode }>(node)) return textOf(node.props.children)
  return ''
}

interface HeadingProps {
  as: 'h2' | 'h3'
  className: string
  children?: ReactNode
}

/** Heading with a slug id (read by the "On this page" nav) and a hover anchor link. */
function Heading({ as: Tag, className, children }: HeadingProps) {
  const id = slugify(textOf(children))
  return (
    <Tag id={id} className={cn('group scroll-mt-24 font-[family-name:var(--font-heading)]', className)}>
      {children}
      <a
        href={`#${id}`}
        aria-label="Link to this section"
        className="ml-2 inline-flex align-middle text-[var(--color-text-muted)] opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
      >
        <LinkIcon size={16} />
      </a>
    </Tag>
  )
}

export function H2({ children }: { children?: ReactNode }) {
  return (
    <Heading as="h2" className="mt-12 mb-4 border-b border-[var(--color-border)] pb-2 text-2xl font-semibold first:mt-0">
      {children}
    </Heading>
  )
}

export function H3({ children }: { children?: ReactNode }) {
  return (
    <Heading as="h3" className="mt-8 mb-3 text-lg font-semibold">
      {children}
    </Heading>
  )
}

const languages: CodeLanguage[] = ['tsx', 'ts', 'bash', 'css', 'json']

/** Fenced code blocks: MDX renders <pre><code className="language-x">. */
export function Pre({ children }: { children?: ReactNode }) {
  const code = Children.only(children) as ReactElement<{ className?: string; children?: ReactNode }>
  const lang = code.props.className?.replace('language-', '') as CodeLanguage | undefined
  return <CodeBlock code={textOf(code.props.children)} lang={lang && languages.includes(lang) ? lang : 'tsx'} className="my-6" />
}

/** Internal links use the router; external links open in a new tab. */
export function Anchor({ href = '', ...props }: ComponentProps<'a'>) {
  const className = 'font-medium text-[var(--color-brand-600)] underline underline-offset-4 dark:text-[var(--color-brand-300)]'
  return href.startsWith('/') ? (
    <Link to={href} className={className} {...props} />
  ) : (
    <a href={href} className={className} target="_blank" rel="noreferrer" {...props} />
  )
}

export function InlineCode(props: ComponentProps<'code'>) {
  return (
    <code
      className="rounded-[var(--radius-sm)] bg-[var(--color-surface-overlay)] px-1.5 py-0.5 text-[0.85em] tracking-wide text-[var(--color-text-primary)]"
      {...props}
    />
  )
}

export function Table(props: ComponentProps<'table'>) {
  return (
    <div className="my-6 overflow-x-auto rounded-[var(--radius-md)] border border-[var(--color-border)]">
      <table className="w-full text-left text-sm" {...props} />
    </div>
  )
}
