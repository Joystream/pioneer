import { useMemo } from 'react'

import { ForumPostOrderByInput } from '@/common/api/queries'
import { useGetLatestForumPostsQuery } from '@/forum/queries'
import { asMember, Member } from '@/memberships/types'

export interface ForumPostWithThread {
  id: string
  createdAt: string
  updatedAt?: string
  author: Member
  text: string
  threadId: string
  thread: {
    id: string
    title: string
    categoryId: string
    categoryTitle: string
  }
}

export const useLatestForumPosts = (limit: number) => {
  // Fetch more posts than needed since we'll filter client-side
  const fetchLimit = limit * 3
  const { data, loading } = useGetLatestForumPostsQuery({
    variables: {
      orderBy: [ForumPostOrderByInput.UpdatedAtDesc],
      limit: fetchLimit,
      where: {
        status_json: {
          isTypeOf_not: 'PostStatusRemoved',
        },
      },
    },
  })

  const posts = useMemo(() => {
    if (!data?.forumPosts) return []

    // Client-side filtering: only include posts from active threads in active categories
    const filtered = data.forumPosts
      .filter((post) => {
        // Type assertion needed until GraphQL types are regenerated
        const thread = post.thread as any
        const threadStatus = thread?.status?.__typename
        const categoryStatus = thread?.category?.status?.__typename

        return threadStatus === 'ThreadStatusActive' && categoryStatus === 'CategoryStatusActive'
      })
      .slice(0, limit) // Take only the requested limit after filtering
      .map((post) => ({
        id: post.id,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        author: asMember(post.author),
        text: post.text,
        threadId: post.threadId,
        thread: {
          id: post.thread.id,
          title: post.thread.title,
          categoryId: post.thread.categoryId,
          categoryTitle: post.thread.category.title,
        },
      }))

    return filtered
  }, [data, limit])

  return { posts, isLoading: loading }
}
