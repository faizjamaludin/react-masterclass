import { useState } from 'react'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { docPages, navigation } from '@/config/navigation'
import { useProgress } from '@/hooks/use-progress'
import '@/styles/home.css'

const accents = ['var(--vibe-lime-text)', 'var(--vibe-pink)', 'var(--vibe-cyan)'] as const
const accentFills = ['#c6ff3d', '#ff4fd8', '#38e8ff'] as const
const taglines = ['Learn the hooks.', 'Skip the confusion.', 'Ship with confidence.']

/** A tiny live useState demo that doubles as the hero visual. */
function VibeCounter() {
  const [vibes, setVibes] = useState(0)

  return (
    <div className="vibe-card vibe-term vibe-float w-full max-w-md rounded-2xl p-5 font-mono text-[13px] leading-6 [--accent:#8b5cf6]">
      <div className="mb-4 flex items-center gap-1.5">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-xs text-[var(--vibe-dim)]">vibes.tsx</span>
      </div>
      <p>
        <span className="text-[var(--vibe-pink)]">const</span> [vibes, setVibes] ={' '}
        <span className="text-[var(--vibe-cyan)]">useState</span>(<span className="text-[var(--vibe-lime-text)]">{vibes}</span>)
        <span className="vibe-caret ml-1" aria-hidden />
      </p>
      <div className="mt-5 flex items-center justify-between gap-3">
        <p className="text-[var(--vibe-dim)]">// tap it. React remembers.</p>
        <button
          type="button"
          onClick={() => setVibes((v) => v + 1)}
          className="rounded-full bg-[var(--vibe-lime)] px-4 py-1.5 font-sans text-sm font-bold text-black transition-transform hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          ✨ {vibes}
        </button>
      </div>
    </div>
  )
}

export function HomePage() {
  const total = docPages.length
  const { completed, isComplete } = useProgress()
  const done = docPages.filter((page) => completed.includes(page.href)).length
  const next = docPages.find((page) => !completed.includes(page.href))
  const percent = Math.round((done / total) * 100)

  return (
    <div className="vibe min-h-svh">
      <div className="mx-auto max-w-[1200px] px-4 pb-24 pt-32 sm:px-6 sm:pt-40">
        <section className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-[var(--vibe-line)] bg-[var(--vibe-fill)] px-3 py-1 font-mono text-xs text-[var(--vibe-lime-text)]">
              <Sparkles size={12} /> react 19 · team edition
            </p>
            <h1 className="mt-6 text-5xl font-extrabold leading-[1.02] tracking-tight text-[var(--vibe-ink)] sm:text-7xl">
              React, but make it <span className="vibe-gradient-text">click.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-[var(--vibe-dim)]">
              A no-fluff masterclass for our team. Live examples, plain-English explanations and rules we actually use in production.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to={(next ?? docPages[0]).href}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--vibe-lime)] px-6 py-3 text-sm font-bold text-black transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {done === 0 ? 'Start level 01' : next ? `Continue: ${next.title}` : 'Review from the start'} <ArrowUpRight size={16} />
              </Link>
              <Link
                to="/docs/hooks/use-state"
                className="inline-flex items-center rounded-full border border-[var(--vibe-line)] px-6 py-3 text-sm font-semibold text-[var(--vibe-ink)] transition-colors hover:bg-[var(--vibe-fill)] hover:border-[var(--vibe-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--vibe-ink)]"
              >
                Jump to hooks
              </Link>
            </div>
            <div className="mt-8 max-w-sm">
              <div className="flex items-baseline justify-between font-mono text-xs text-[var(--vibe-dim)]">
                <span>{done === total ? 'all levels cleared 🎉' : 'your progress'}</span>
                <span><b className="text-[var(--vibe-ink)]">{done}</b>/{total}</span>
              </div>
              <div role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100} aria-label="Course progress" className="mt-2 h-2 overflow-hidden rounded-full bg-[var(--vibe-line)]">
                <div className="h-full rounded-full bg-[var(--vibe-lime)] transition-[width] duration-500" style={{ width: `${percent}%` }} />
              </div>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-[var(--vibe-dim)]">
              <li><b className="text-[var(--vibe-ink)]">{total}</b> lessons</li>
              <li><b className="text-[var(--vibe-ink)]">{navigation.length}</b> levels</li>
              <li><b className="text-[var(--vibe-ink)]">live</b> examples</li>
              <li><b className="text-[var(--vibe-ink)]">0</b> fluff</li>
            </ul>
          </div>
          <div className="flex justify-center lg:justify-end">
            <VibeCounter />
          </div>
        </section>

        <section className="mt-28" aria-labelledby="levels-heading">
          <h2 id="levels-heading" className="font-mono text-sm uppercase tracking-[0.25em] text-[var(--vibe-dim)]">
            // pick your level
          </h2>
          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {navigation.map((section, i) => (
              <article
                key={section.id}
                className="vibe-card flex flex-col rounded-2xl p-6"
                style={{ '--accent': accentFills[i % accentFills.length] } as React.CSSProperties}
              >
                <p className="font-mono text-5xl font-black" style={{ color: accents[i % accents.length] }}>
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-3 text-xl font-bold text-[var(--vibe-ink)]">{section.title}</h3>
                <p className="font-mono text-xs text-[var(--vibe-dim)]">
                  {section.items.filter((item) => isComplete(`/docs/${section.id}/${item.slug}`)).length}/{section.items.length} done
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {section.items.map((item) => (
                    <li key={item.slug}>
                      <Link
                        to={`/docs/${section.id}/${item.slug}`}
                        className="inline-block rounded-full border border-[var(--vibe-line)] px-3 py-1 text-xs text-[var(--vibe-ink)] transition-colors hover:bg-[var(--vibe-line)] focus-visible:outline-2 focus-visible:outline-[var(--vibe-ink)]"
                      >
                        {isComplete(`/docs/${section.id}/${item.slug}`) && <span aria-label="Completed">✓ </span>}
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <p className="mt-20 text-center font-mono text-sm text-[var(--vibe-dim)]">
          {taglines.join('  ·  ')}
        </p>
      </div>
    </div>
  )
}
