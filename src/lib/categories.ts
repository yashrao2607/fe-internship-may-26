import type { Category } from '../types'

/** Single source of truth for per-category accent colors (chips + dots). */
export const CATEGORY_META: Record<Category, { dot: string; chip: string }> = {
  Framework: { dot: 'bg-violet-400', chip: 'bg-violet-500/10 text-violet-300 ring-violet-400/20' },
  Library: { dot: 'bg-sky-400', chip: 'bg-sky-500/10 text-sky-300 ring-sky-400/20' },
  Language: { dot: 'bg-amber-400', chip: 'bg-amber-500/10 text-amber-300 ring-amber-400/20' },
  Tool: { dot: 'bg-emerald-400', chip: 'bg-emerald-500/10 text-emerald-300 ring-emerald-400/20' },
}
