import { packageManagers, usePackageManager, type PackageManager } from '@/hooks/use-package-manager'
import { cn } from '@/lib/utils'
import { CodeBlock } from './code-block'

type CommandKind = 'shadcn' | 'install' | 'install-dev'

const commands: Record<CommandKind, Record<PackageManager, string>> = {
  shadcn: { npm: 'npx shadcn@latest', pnpm: 'pnpm dlx shadcn@latest', yarn: 'yarn dlx shadcn@latest', bun: 'bunx --bun shadcn@latest' },
  install: { npm: 'npm install', pnpm: 'pnpm add', yarn: 'yarn add', bun: 'bun add' },
  'install-dev': { npm: 'npm install -D', pnpm: 'pnpm add -D', yarn: 'yarn add -D', bun: 'bun add -d' },
}

interface PackageManagerCommandProps {
  /** `shadcn` runs the shadcn CLI; `install` / `install-dev` add packages */
  kind: CommandKind
  /** Everything after the base command, e.g. `add lodash` */
  args: string
  className?: string
}

export function PackageManagerCommand({ kind, args, className }: PackageManagerCommandProps) {
  const { packageManager, setPackageManager } = usePackageManager()

  return (
    <div className={cn('my-6 overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)]', className)}>
      <div role="tablist" aria-label="Package manager" className="flex gap-1 border-b border-[var(--color-border)] bg-[var(--color-surface-raised)] px-2">
        {packageManagers.map((pm) => (
          <button
            key={pm}
            type="button"
            role="tab"
            aria-selected={pm === packageManager}
            onClick={() => setPackageManager(pm)}
            className={cn(
              '-mb-px border-b-2 px-2.5 py-2 text-xs font-medium transition-colors',
              pm === packageManager
                ? 'border-[var(--color-brand-600)] text-[var(--color-text-primary)] dark:border-[var(--color-brand-300)]'
                : 'border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]',
            )}
          >
            {pm}
          </button>
        ))}
      </div>
      <CodeBlock code={`${commands[kind][packageManager]} ${args}`} lang="bash" bare />
    </div>
  )
}
