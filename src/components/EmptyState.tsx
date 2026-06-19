export function EmptyState({ query }: { query: string }) {
  const q = query.trim()

  return (
    <div className="flex animate-fade-in flex-col items-center justify-center py-20 text-center">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-elevated text-zinc-500">
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.2-5.2m1.7-4.3a6 6 0 11-12 0 6 6 0 0112 0z" />
        </svg>
      </div>
      {q ? (
        <>
          <p className="mb-1 text-sm font-medium text-zinc-200">
            No results for &ldquo;{q}&rdquo;
          </p>
          <p className="text-sm text-zinc-500">Try a different term or category.</p>
        </>
      ) : (
        <>
          <p className="mb-1 text-sm font-medium text-zinc-200">Start typing to search</p>
          <p className="text-sm text-zinc-500">
            Find frameworks, libraries, languages and tools.
          </p>
        </>
      )}
    </div>
  )
}
