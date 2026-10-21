import type { MDXComponents } from 'mdx/types'
import { createElement as h } from 'react'
import { Callout } from './callout'
import { ComponentPreview } from './component-preview'
import { DoDont, DoDontGrid } from './do-dont'
import { Anchor, H2, H3, InlineCode, Pre, Table } from './mdx-elements'
import { PackageManagerCommand } from './package-manager-command'
import { PropsTable } from './props-table'
import { Quiz } from './quiz'
import { TLDR } from './tldr'
import { TryIt } from './try-it'
import { BugFix } from './visuals/bug-fix'
import { ContextTree } from './visuals/context-tree'
import { DataFlow } from './visuals/data-flow'
import { EffectLifecycle } from './visuals/effect-lifecycle'
import { HookSlots } from './visuals/hook-slots'
import { RenderCycle } from './visuals/render-cycle'

/** Returns a component that renders `tag` with fixed classes. */
const styled =
  <T extends keyof React.JSX.IntrinsicElements>(tag: T, className: string) =>
  (props: React.JSX.IntrinsicElements[T]) =>
    h(tag, { className, ...props })

export const mdxComponents: MDXComponents = {
  h2: H2,
  h3: H3,
  p: styled('p', 'my-4 leading-7 text-[var(--color-text-secondary)]'),
  ul: styled('ul', 'my-4 ml-6 list-disc space-y-2 text-[var(--color-text-secondary)] marker:text-[var(--color-text-muted)]'),
  ol: styled('ol', 'my-4 ml-6 list-decimal space-y-2 text-[var(--color-text-secondary)] marker:text-[var(--color-text-muted)]'),
  li: styled('li', 'leading-7'),
  strong: styled('strong', 'font-semibold text-[var(--color-text-primary)]'),
  hr: styled('hr', 'my-10 border-[var(--color-border)]'),
  blockquote: styled('blockquote', 'my-6 border-l-2 border-[var(--color-brand-600)] pl-4 italic text-[var(--color-text-secondary)]'),
  a: Anchor,
  code: InlineCode,
  pre: Pre,
  table: Table,
  thead: styled('thead', 'bg-[var(--color-surface-overlay)] font-[family-name:var(--font-heading)] text-xs text-[var(--color-text-secondary)]'),
  tr: styled('tr', 'border-t border-[var(--color-border)] first:border-t-0'),
  th: styled('th', 'px-4 py-2.5 font-semibold'),
  td: styled('td', 'px-4 py-3 align-top text-[var(--color-text-secondary)]'),

  // Docs components available in every .mdx file without importing
  Callout,
  ComponentPreview,
  DoDont,
  DoDontGrid,
  PackageManagerCommand,
  PropsTable,
  TLDR,
  TryIt,
  Quiz,
  BugFix,
  ContextTree,
  DataFlow,
  EffectLifecycle,
  HookSlots,
  RenderCycle,
}
