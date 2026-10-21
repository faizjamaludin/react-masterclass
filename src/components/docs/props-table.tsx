export interface PropDefinition {
  name: string
  type: string
  default?: string
  description: string
}

export function PropsTable({ rows }: { rows: PropDefinition[] }) {
  return (
    <div className="my-6 overflow-x-auto rounded-[var(--radius-md)] border border-[var(--color-border)]">
      <table className="w-full min-w-[560px] text-left text-sm">
        <thead className="bg-[var(--color-surface-overlay)] font-[family-name:var(--font-heading)] text-xs text-[var(--color-text-secondary)]">
          <tr>
            <th className="px-4 py-2.5 font-semibold">Prop</th>
            <th className="px-4 py-2.5 font-semibold">Type</th>
            <th className="px-4 py-2.5 font-semibold">Default</th>
            <th className="px-4 py-2.5 font-semibold">Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name} className="border-t border-[var(--color-border)] align-top">
              <td className="px-4 py-3 font-medium tracking-wide text-[var(--color-brand-600)] dark:text-[var(--color-brand-300)]">{row.name}</td>
              <td className="px-4 py-3 tracking-wide text-[var(--color-text-secondary)]">{row.type}</td>
              <td className="px-4 py-3 tracking-wide text-[var(--color-text-muted)]">{row.default ?? '—'}</td>
              <td className="px-4 py-3 text-[var(--color-text-secondary)]">{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
