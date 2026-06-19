import type { Category } from '../types'
import { CATEGORY_META } from '../lib/categories'

export type FilterValue = 'All' | Category

const ORDER: FilterValue[] = ['All', 'Framework', 'Library', 'Language', 'Tool']

interface CategoryFilterProps {
  active: FilterValue
  onChange: (value: FilterValue) => void
  counts: Record<FilterValue, number>
}

export function CategoryFilter({ active, onChange, counts }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Filter by category">
      {ORDER.map(value => {
        const isActive = value === active
        const dot = value === 'All' ? null : CATEGORY_META[value].dot
        return (
          <button
            key={value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(value)}
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
              isActive
                ? 'border-accent/50 bg-accent/15 text-accent-light shadow-glow'
                : 'border-white/10 bg-elevated text-zinc-400 hover:border-white/20 hover:text-zinc-200'
            }`}
          >
            {dot && <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />}
            {value}
            <span className={`tabular-nums ${isActive ? 'text-accent-light/70' : 'text-zinc-600'}`}>
              {counts[value] ?? 0}
            </span>
          </button>
        )
      })}
    </div>
  )
}
