import type { HighlighterCore } from 'shiki/core'

export type CodeLanguage = 'tsx' | 'ts' | 'bash' | 'css' | 'json'

let highlighter: Promise<HighlighterCore> | null = null

/** Lazily creates one shared highlighter with only the languages the docs use. */
async function createHighlighter() {
  const [{ createHighlighterCore }, { createJavaScriptRegexEngine }] = await Promise.all([
    import('shiki/core'),
    import('shiki/engine/javascript'),
  ])
  return createHighlighterCore({
    themes: [import('shiki/themes/github-light.mjs'), import('shiki/themes/github-dark-dimmed.mjs')],
    langs: [
      import('shiki/langs/tsx.mjs'),
      import('shiki/langs/typescript.mjs'),
      import('shiki/langs/bash.mjs'),
      import('shiki/langs/css.mjs'),
      import('shiki/langs/json.mjs'),
    ],
    engine: createJavaScriptRegexEngine(),
  })
}

export async function highlight(code: string, lang: CodeLanguage) {
  highlighter ??= createHighlighter()
  const shiki = await highlighter
  return shiki.codeToHtml(code, {
    lang: lang === 'ts' ? 'typescript' : lang,
    themes: { light: 'github-light', dark: 'github-dark-dimmed' },
  })
}
