const fruits = [
  { id: 1, name: 'Mango', inStock: true },
  { id: 2, name: 'Durian', inStock: false },
  { id: 3, name: 'Rambutan', inStock: true },
]

export default function Demo() {
  return (
    <ul className="w-64 space-y-2">
      {fruits.map((fruit) => (
        <li key={fruit.id} className="flex justify-between rounded-[var(--radius-md)] border border-[var(--color-border)] px-3 py-2 text-sm">
          {fruit.name}
          <span className={fruit.inStock ? 'text-[var(--color-success)]' : 'text-[var(--color-text-muted)]'}>
            {fruit.inStock ? 'In stock' : 'Sold out'}
          </span>
        </li>
      ))}
    </ul>
  )
}
