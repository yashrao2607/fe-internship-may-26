import { useEffect, useState } from 'react'
import type { Item } from '../types'
import { searchItems } from '../services/mockApi'
import { useDebounce } from './useDebounce'

export interface UseSearchReturn {
  query: string
  setQuery: (q: string) => void
  results: Item[]
  isLoading: boolean
  error: string | null
}

const DEBOUNCE_MS = 300

export function useSearch(initialQuery = ''): UseSearchReturn {
  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState<Item[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Only search once the user has paused typing for 300 ms.
  const debouncedQuery = useDebounce(query, DEBOUNCE_MS)

  useEffect(() => {
    // `cancelled` is the single guard for both concerns the assignment cares about:
    //   • Stale responses — when the query changes, React runs this cleanup
    //     before the next effect, flipping the in-flight request's flag so its
    //     late resolve is ignored and a newer request always wins.
    //   • Unmount — the same cleanup runs on teardown, so no state update fires
    //     after the component is gone (also keeps StrictMode's double-invoke clean).
    let cancelled = false

    setIsLoading(true)
    setError(null)

    searchItems(debouncedQuery)
      .then(items => {
        if (cancelled) return
        setResults(items)
        setIsLoading(false)
      })
      .catch(() => {
        if (cancelled) return
        setError('Something went wrong while searching. Please try again.')
        setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [debouncedQuery])

  return { query, setQuery, results, isLoading, error }
}
