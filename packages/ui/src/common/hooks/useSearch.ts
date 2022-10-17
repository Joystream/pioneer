import escapeStringRegexp from 'escape-string-regexp'
import { useEffect, useMemo } from 'react'

import { useSearchForumPostLazyQuery } from '@/forum/queries'

import { useDebounce } from './useDebounce'

export type SearchKind = 'FORUM'

const MAX_RESULTS = 20

export const useSearch = (search: string, kind: SearchKind) => {
  const [searchForum, postResult] = useSearchForumPostLazyQuery()

  const searchDebounced = useDebounce(search, 400)

  useEffect(() => {
    if (searchDebounced.length > 2)
      searchForum({
        variables: {
          where: {
            thread: { status_json: { isTypeOf_eq: 'ThreadStatusActive' } },
            text_contains: searchDebounced,
          },
          limit: 500,
        },
      })
  }, [searchDebounced, kind])

  const [forum, isLoadingPosts] = useMemo(() => {
    const posts = [...(postResult.data?.forumPosts ?? [])]
      .sort(byBestMatch(escapeStringRegexp(searchDebounced), [({ thread }) => thread.title, ({ text }) => text]))
      .slice(0, MAX_RESULTS)
    return [posts, postResult.loading]
  }, [postResult])

  return {
    forum,
    forumPostCount: postResult.data?.forumPosts.length,
    isLoading: isLoadingPosts,
  }
}

const byBestMatch = <T extends Record<any, any>>(search: string, fields: ((x: T) => string)[]) => {
  const patterns = [RegExp(`\\b${search}\\b`, 'gi'), RegExp(search, 'gi')]

  return (a: T, b: T): number => {
    for (const field of fields) {
      const fieldA = field(a)
      const fieldB = field(b)
      if (fieldA === fieldB) continue
      for (const pattern of patterns) {
        const matchA = fieldA.match(pattern)?.length ?? 0
        const matchB = fieldB.match(pattern)?.length ?? 0

        if (matchA !== matchB) return matchB - matchA
      }
    }
    return 0
  }
}
