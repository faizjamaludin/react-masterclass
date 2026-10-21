import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function Demo() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const error = email && !email.includes('@') ? 'Enter a valid email' : ''

  return (
    <form
      noValidate
      className="w-72 space-y-3"
      onSubmit={(e) => {
        e.preventDefault()
        if (email && !error) setSubmitted(true)
      }}
    >
      <label className="block text-sm font-medium">
        Email
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            setSubmitted(false)
          }}
          aria-invalid={!!error}
          className="mt-1 h-9 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-transparent px-3 text-sm"
        />
      </label>
      {error && <p role="alert" className="text-xs text-[var(--color-error)]">{error}</p>}
      {submitted && <p className="text-xs text-[var(--color-success)]">Subscribed as {email}</p>}
      <Button type="submit">Subscribe</Button>
    </form>
  )
}
