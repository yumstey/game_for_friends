import { useEffect } from 'react'

/** `key` oʻzgarganda sahifani tepaga qaytaradi (masalan, oʻyin fazasi almashganda). */
export function useScrollToTop(key: unknown): void {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [key])
}
