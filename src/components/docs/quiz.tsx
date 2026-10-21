import { useId, useState } from 'react'
import { CheckCircle2, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface QuizQuestion {
  question: string
  options: string[]
  /** Index of the correct option */
  answer: number
  /** Shown after answering */
  why: string
}

function Question({ item, index }: { item: QuizQuestion; index: number }) {
  const name = useId()
  const [picked, setPicked] = useState<number | null>(null)
  const answered = picked !== null
  const correct = picked === item.answer

  return (
    <fieldset className="space-y-2">
      <legend className="mb-2 text-sm font-semibold text-[var(--color-text-primary)]">
        {index + 1}. {item.question}
      </legend>
      {item.options.map((option, i) => {
        const isAnswer = answered && i === item.answer
        const isWrongPick = answered && i === picked && !correct
        return (
          <label
            key={option}
            className={cn(
              'flex cursor-pointer items-center gap-3 rounded-[var(--radius-md)] border px-3 py-2 text-sm transition-colors',
              answered && 'cursor-default',
              isAnswer
                ? 'border-[var(--color-success)] bg-[var(--color-success-bg)]'
                : isWrongPick
                  ? 'border-[var(--color-error)] bg-[var(--color-error-bg)]'
                  : 'border-[var(--color-border)] hover:bg-[var(--color-surface-overlay)]',
            )}
          >
            <input type="radio" name={name} disabled={answered} checked={picked === i} onChange={() => setPicked(i)} className="accent-[var(--color-brand-600)]" />
            <span className="flex-1 text-[var(--color-text-primary)]">{option}</span>
            {isAnswer && <CheckCircle2 size={16} className="text-[var(--color-success)]" />}
            {isWrongPick && <XCircle size={16} className="text-[var(--color-error)]" />}
          </label>
        )
      })}
      {answered && (
        <p role="status" className="text-xs text-[var(--color-text-secondary)]">
          <b className={correct ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]'}>{correct ? 'Correct. ' : 'Not quite. '}</b>
          {item.why}
        </p>
      )}
    </fieldset>
  )
}

/** A short self-check at the end of a lesson. Each question gives instant feedback. */
export function Quiz({ questions }: { questions: QuizQuestion[] }) {
  const [attempt, setAttempt] = useState(0)

  return (
    <section aria-label="Quick check" className="my-8 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface-raised)]">
      <header className="flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-surface-overlay)] px-4 py-2">
        <span className="font-[family-name:var(--font-heading)] text-xs font-semibold text-[var(--color-text-primary)]">Pick an answer</span>
        <button type="button" onClick={() => setAttempt((a) => a + 1)} className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]">
          Try again
        </button>
      </header>
      <div key={attempt} className="space-y-6 p-4 sm:p-6">
        {questions.map((item, i) => (
          <Question key={item.question} item={item} index={i} />
        ))}
      </div>
    </section>
  )
}
