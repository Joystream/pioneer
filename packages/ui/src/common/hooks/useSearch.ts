import escapeStringRegexp from 'escape-string-regexp'
import { useEffect, useMemo } from 'react'

import { useSearchForumPostLazyQuery } from '@/forum/queries'

export type SearchKind = 'FORUM'

const MAX_RESULTS = 20

export type GroupedForumPost = {
  threadId: string
  threadTitle: string
  categoryId: string
  posts: Array<{
    id: string
    text: string
    createdAt: string
    author: { id: string; handle: string | null } | null
    thread: { id: string; title: string; categoryId: string }
  }>
}

export const useSearch = (search: string, kind: SearchKind) => {
  const [searchForum, postResult] = useSearchForumPostLazyQuery()

  useEffect(() => {
    if (search.length > 2)
      searchForum({
        variables: {
          where: {
            thread: { status_json: { isTypeOf_eq: 'ThreadStatusActive' } },
            text_contains: search,
          },
          limit: 500,
        },
      })
  }, [search, kind])

  const [forum, forumGrouped, isLoadingPosts] = useMemo(() => {
    if (!postResult.data?.forumPosts) {
      return [[], [], postResult.loading]
    }

    const allPosts = postResult.data.forumPosts
    const escapedSearch = escapeStringRegexp(search)

    const postMap = new Map<string, (typeof allPosts)[0]>()
    for (const post of allPosts) {
      if (!postMap.has(post.id)) {
        postMap.set(post.id, post)
      }
    }
    const uniquePosts = Array.from(postMap.values())

    const sortedPosts = uniquePosts.sort(byBestMatch(escapedSearch, [({ thread }) => thread.title, ({ text }) => text]))

    const threadMap = new Map<string, GroupedForumPost>()
    for (const post of sortedPosts) {
      const threadId = post.thread.id
      if (!threadMap.has(threadId)) {
        threadMap.set(threadId, {
          threadId,
          threadTitle: post.thread.title,
          categoryId: post.thread.categoryId,
          posts: [],
        })
      }
      threadMap.get(threadId)!.posts.push({
        id: post.id,
        text: post.text,
        createdAt: typeof post.createdAt === 'string' ? post.createdAt : new Date(post.createdAt).toISOString(),
        author: post.author ? { id: post.author.id, handle: post.author.handle ?? null } : null,
        thread: {
          id: post.thread.id,
          title: post.thread.title,
          categoryId: post.thread.categoryId,
        },
      })
    }

    const groupedResults = Array.from(threadMap.values()).sort((a, b) => {
      const postA = a.posts[0]
      const postB = b.posts[0]
      return byBestMatch(escapedSearch, [({ thread }) => thread.title, ({ text }) => text])(postA, postB)
    })

    const limitedGrouped = groupedResults.slice(0, MAX_RESULTS)

    const flatPosts = limitedGrouped.flatMap((group) => group.posts)

    return [flatPosts, limitedGrouped, postResult.loading]
  }, [postResult, search])

  return {
    forum,
    forumGrouped,
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
        if (matchA > matchB) {
          return -1
        } else if (matchA < matchB) {
          return 1
        }
      }
    }
    return 0
  }
}
