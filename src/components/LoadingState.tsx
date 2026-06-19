export function LoadingState() {
  return (
    <div className="flex flex-col gap-2.5" aria-busy="true" aria-label="Loading results">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="relative overflow-hidden rounded-xl border border-white/[0.07] bg-elevated p-4"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="mb-2.5 flex items-center gap-2.5">
                <div className="h-4 w-28 rounded bg-white/[0.06]" />
                <div className="h-4 w-16 rounded-full bg-white/[0.06]" />
              </div>
              <div className="mb-1.5 h-3 w-full rounded bg-white/[0.05]" />
              <div className="h-3 w-3/5 rounded bg-white/[0.05]" />
            </div>
            <div className="h-6 w-12 rounded-lg bg-white/[0.06]" />
          </div>

          {/* Light sweep across the skeleton. */}
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        </div>
      ))}
    </div>
  )
}
