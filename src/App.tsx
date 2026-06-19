import { useEffect, useMemo, useState } from 'react'
import { SearchInput } from './components/SearchInput'
import { ItemList } from './components/ItemList'
import { LoadingState } from './components/LoadingState'
import { EmptyState } from './components/EmptyState'
import { CategoryFilter, type FilterValue } from './components/CategoryFilter'
import { useSearch } from './hooks/useSearch'
import { ITEMS } from './services/mockApi'
import type { Category } from './types'

const CATEGORIES: Category[] = ['Framework', 'Library', 'Language', 'Tool']

// Restore the query from ?q= so searches are shareable / survive a refresh.
const readQueryFromUrl = () =>
  new URLSearchParams(window.location.search).get('q') ?? ''

export default function App() {
  const { query, setQuery, results, isLoading, error } = useSearch(readQueryFromUrl())
  const [activeCategory, setActiveCategory] = useState<FilterValue>('All')

  // Keep the URL in sync with the current query (no history spam — replaceState).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const trimmed = query.trim()
    if (trimmed) params.set('q', trimmed)
    else params.delete('q')
    const qs = params.toString()
    window.history.replaceState(null, '', qs ? `?${qs}` : window.location.pathname)
  }, [query])

  // Category facet is a pure client-side view over the search results.
  const counts = useMemo(() => {
    const base: Record<FilterValue, number> = {
      All: results.length,
      Framework: 0,
      Library: 0,
      Language: 0,
      Tool: 0,
    }
    for (const item of results) base[item.category] += 1
    return base
  }, [results])

  const filtered = useMemo(
    () =>
      activeCategory === 'All'
        ? results
        : results.filter(item => item.category === activeCategory),
    [results, activeCategory]
  )

  // Skeleton only on the very first load; later searches keep prior results
  // visible under a thin progress bar so the list never flickers empty.
  const showSkeleton = isLoading && results.length === 0

  return (
    <div className="relative min-h-dvh bg-canvas">
      <div className="pointer-events-none fixed inset-0 animate-glow-pulse bg-aurora" aria-hidden="true" />

      <main className="relative mx-auto max-w-2xl px-4 pb-24 sm:px-6">
        <header className="pt-12 sm:pt-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-elevated/60 px-3 py-1 text-xs text-zinc-400 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {ITEMS.length} tools indexed
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Frontend Tools
          </h1>
          <p className="mt-2 max-w-md text-[15px] leading-relaxed text-zinc-400">
            Search across the frameworks, libraries, languages and tooling that power the modern web.
          </p>
        </header>

        {/* Sticky control bar: search + facets stay reachable while scrolling. */}
        <div className="sticky top-0 z-20 -mx-4 mt-8 border-b border-white/[0.06] bg-canvas/80 px-4 pb-4 pt-4 backdrop-blur-xl sm:-mx-6 sm:px-6">
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder="Search by name, category, or description..."
          />
          <div className="mt-3">
            <CategoryFilter
              active={activeCategory}
              onChange={setActiveCategory}
              counts={counts}
            />
          </div>

          {/* Indeterminate progress — visible only while a request is in flight. */}
          <div className="absolute inset-x-0 bottom-0 h-0.5 overflow-hidden">
            {isLoading && (
              <div className="h-full w-1/3 animate-progress bg-gradient-to-r from-transparent via-accent to-transparent" />
            )}
          </div>
        </div>

        <div className="flex items-center justify-between py-4 text-xs text-zinc-500">
          <span>
            Press{' '}
            <kbd className="rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[11px] text-zinc-400">
              /
            </kbd>{' '}
            to focus
          </span>
          {!showSkeleton && (
            <span className="tabular-nums" aria-live="polite">
              {filtered.length} {filtered.length === 1 ? 'result' : 'results'}
            </span>
          )}
        </div>

        {error && (
          <div
            role="alert"
            className="mb-4 flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-300"
          >
            <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0 3.75h.008M10.34 3.94l-7.6 13.16A1.5 1.5 0 004.04 19.5h15.92a1.5 1.5 0 001.3-2.4L13.66 3.94a1.5 1.5 0 00-2.6 0z" />
            </svg>
            {error}
          </div>
        )}

        {showSkeleton ? (
          <LoadingState />
        ) : filtered.length > 0 ? (
          <ItemList items={filtered} query={query} />
        ) : (
          <EmptyState query={query} />
        )}

        <p className="mt-12 text-center text-xs text-zinc-600">
          {CATEGORIES.length} categories · debounced search · built with React + TypeScript
        </p>
      </main>
    </div>
  )
}
