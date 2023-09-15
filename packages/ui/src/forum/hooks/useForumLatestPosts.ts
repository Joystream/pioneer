import * as Apollo from '@apollo/client'
import { useEffect, useState } from 'react'

import { ForumPostOrderByInput } from '@/common/api/queries'
import { useLocalStorage } from '@/common/hooks/useLocalStorage'
import { GetForumPostsDocument } from '@/forum/queries'

const orderBy = [ForumPostOrderByInput.UpdatedAtDesc]

const useCacheWithExpiration = (key: string): Apollo.WatchQueryFetchPolicy => {
  const [lastCacheTime, setLastCacheTime] = useLocalStorage<string>(key)
  const [fetchPolicy, setFetchPolicy] = useState<Apollo.WatchQueryFetchPolicy>('cache-first')

  useEffect(() => {
    const currentDate = new Date()

    try {
      if (lastCacheTime != undefined) {
        const lastCacheDate = new Date(lastCacheTime)
        const timeDiff = Math.abs(currentDate.getTime() - lastCacheDate.getTime())

        if (timeDiff < 1000 * 3600 * 24) {
          setFetchPolicy('cache-first')
          return
        }
      }
    } catch (err) {
      // ignore issue
    }

    setFetchPolicy('cache-and-network')
    setLastCacheTime(currentDate.toDateString())
  }, [lastCacheTime])

  return fetchPolicy
}

export const useForumLatestPosts = () => {
  const fetchPolicy = useCacheWithExpiration('last_LatestPosts')

  const where = {}
  const { data } = Apollo.useQuery(GetForumPostsDocument, {
    variables: { where, orderBy, limit: 500 },
    fetchPolicy: fetchPolicy,
  })

  return { posts: data?.forumPosts }
}
