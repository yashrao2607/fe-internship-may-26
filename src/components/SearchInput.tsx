import { useRef, useEffect } from 'react'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchInput({ value, onChange, placeholder = 'Search...' }: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault()
        inputRef.current?.focus()
      }
      if (e.key === 'Escape') inputRef.current?.blur()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <div className="group relative">
      {/* Soft focus glow — fades in only while the field is focused. */}
      <div className="pointer-events-none absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-accent/40 via-violet-500/30 to-accent/40 opacity-0 blur-md transition-opacity duration-300 group-focus-within:opacity-100" />

      <div className="relative flex items-center rounded-2xl border border-white/10 bg-elevated/80 backdrop-blur transition-colors duration-200 group-focus-within:border-accent/50">
        <span className="pointer-events-none flex items-center pl-4 text-zinc-500 transition-colors duration-200 group-focus-within:text-accent-light">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.2-5.2m1.7-4.3a6 6 0 11-12 0 6 6 0 0112 0z" />
          </svg>
        </span>

        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent px-3 py-3.5 text-[15px] text-zinc-100 placeholder-zinc-500 focus:outline-none"
          aria-label="Search items"
          autoComplete="off"
          spellCheck={false}
        />

        <div className="flex items-center pr-3">
          {value ? (
            <button
              type="button"
              onClick={() => onChange('')}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-white/5 hover:text-zinc-200"
              aria-label="Clear search"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          ) : (
            <kbd className="hidden select-none items-center rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 font-mono text-[11px] text-zinc-500 sm:inline-flex">
              /
            </kbd>
          )}
        </div>
      </div>
    </div>
  )
}
