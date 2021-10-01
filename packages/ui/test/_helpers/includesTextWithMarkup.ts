import { MatcherFunction } from '@testing-library/react'

type Query = (f: MatcherFunction) => HTMLElement | null

export const includesTextWithMarkup = (query: Query, text: string) => {
  return query(
    (content, node) =>
      content !== '' && !!node?.textContent && node?.textContent.toLowerCase().includes(text.toLowerCase())
  )
}
