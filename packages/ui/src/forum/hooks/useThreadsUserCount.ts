import { whenDefined } from '@/common/utils'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

import { useGetForumThreadsUserCountQuery } from '../queries/__generated__/forum.generated'

export const useThreadsUserCount = () => {
  const { members, active } = useMyMemberships()
  const { data, loading } = useGetForumThreadsUserCountQuery({
    variables: {
      where: { author: { id_in: whenDefined(active?.id, (id) => [id]) ?? members.map((m) => m.id) } },
    },
  })

  return {
    myThreadsCount: data?.forumThreads.length,
    isLoading: loading,
  }
}
