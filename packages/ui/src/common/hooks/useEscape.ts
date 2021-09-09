import { useEffect } from 'react'

export function useEscape(onEscape: () => void) {
  useEffect(() => {
    const escapeEvent = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onEscape()
      }
    }
    document.addEventListener('keydown', escapeEvent)

    return () => document.removeEventListener('keydown', escapeEvent)
  }, [])
}
