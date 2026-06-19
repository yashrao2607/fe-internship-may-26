import type { Item } from '../types'
import { CATEGORY_META } from '../lib/categories'
import { Highlight } from './Highlight'

export function ItemCard({ item, query = '' }: { item: Item; query?: string }) {
  const meta = CATEGORY_META[item.category]

  return (
    <div className="group relative rounded-xl border border-white/[0.07] bg-elevated p-4 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-white/[0.14] hover:bg-raised hover:shadow-card-hover">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="mb-1.5 flex items-center gap-2.5">
            <h3 className="truncate text-[15px] font-semibold text-zinc-100">
              <Highlight text={item.name} query={query} />
            </h3>
            <span className={`inline-flex flex-shrink-0 items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset ${meta.chip}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
              {item.category}
            </span>
          </div>
          <p className="line-clamp-2 text-[13px] leading-relaxed text-zinc-400">
            <Highlight text={item.description} query={query} />
          </p>
        </div>

        <div className="flex flex-shrink-0 items-center gap-1 rounded-lg bg-white/[0.04] px-2 py-1 text-xs font-medium tabular-nums text-zinc-300">
          <svg className="h-3.5 w-3.5 text-amber-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span aria-label={`${item.stars} thousand stars`}>{item.stars}k</span>
        </div>
      </div>
    </div>
  )
}
