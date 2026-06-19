import { Fragment } from 'react'

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/**
 * Renders `text`, wrapping every case-insensitive occurrence of `query`
 * in a subtly highlighted <mark>. Empty/whitespace queries render plain text.
 */
export function Highlight({ text, query }: { text: string; query: string }) {
  const term = query.trim()
  if (!term) return <>{text}</>

  const parts = text.split(new RegExp(`(${escapeRegExp(term)})`, 'ig'))

  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === term.toLowerCase() ? (
          <mark
            key={i}
            className="rounded-[3px] bg-accent/25 px-0.5 text-accent-light"
          >
            {part}
          </mark>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </>
  )
}
