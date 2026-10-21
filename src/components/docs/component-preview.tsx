import { Suspense, use, type ComponentType } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { loadExample, loadExampleSource } from '@/examples/registry'
import { cn } from '@/lib/utils'
import { CodeBlock } from './code-block'

const exampleCache = new Map<string, Promise<{ default: ComponentType }>>()
const sourceCache = new Map<string, Promise<string>>()

function getExample(name: string) {
  let promise = exampleCache.get(name)
  if (!promise) {
    promise = loadExample(name)
    exampleCache.set(name, promise)
  }
  return promise
}

export function ExampleRender({ name }: { name: string }) {
  const { default: Example } = use(getExample(name))
  return <Example />
}

function getSource(name: string) {
  let promise = sourceCache.get(name)
  if (!promise) {
    promise = loadExampleSource(name)
    sourceCache.set(name, promise)
  }
  return promise
}

function ExampleSource({ name }: { name: string }) {
  const source = use(getSource(name))
  return <CodeBlock code={source} bare />
}

interface ComponentPreviewProps {
  /** Path of the example inside `src/examples`, without extension — e.g. `button/variants` */
  name: string
  /** Alignment of the preview content */
  align?: 'center' | 'start'
  className?: string
}

export function ComponentPreview({ name, align = 'center', className }: ComponentPreviewProps) {
  return (
    <Tabs defaultValue="preview" className={cn('my-6', className)}>
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <div className="mt-3 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)]">
        <TabsContent value="preview" className="mt-0">
          <div
            className={cn(
              'flex min-h-[280px] w-full flex-wrap gap-4 bg-[var(--color-surface-raised)] p-6 sm:p-10',
              align === 'center' ? 'items-center justify-center' : 'items-start justify-start',
            )}
          >
            <Suspense fallback={<p className="text-sm text-[var(--color-text-muted)]">Loading…</p>}>
              <ExampleRender name={name} />
            </Suspense>
          </div>
        </TabsContent>
        <TabsContent value="code" className="mt-0">
          <Suspense fallback={<p className="p-4 text-sm text-[var(--color-text-muted)]">Loading…</p>}>
            <ExampleSource name={name} />
          </Suspense>
        </TabsContent>
      </div>
    </Tabs>
  )
}
