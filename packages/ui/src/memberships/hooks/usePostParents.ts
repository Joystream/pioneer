import { ApiRx } from '@polkadot/api'
import { useMemo } from 'react'

import { useApi } from '@/common/hooks/useApi'
import { ForumPostParentsFragment, useGetForumPostParentsQuery } from '@/forum/queries'

export const usePostParents = (id: string) => {
  const { data, loading } = useGetForumPostParentsQuery({ variables: { where: { id } } })
  const { api } = useApi()
  const { threadId, categoryId } = useMemo(() => asPostParents(data?.forumPostByUniqueInput, api), [data, loading])
  return { threadId, categoryId, parentsLoading: loading }
}

const asPostParents = (fields: ForumPostParentsFragment | null | undefined, api: ApiRx | undefined) =>
  fields && api
    ? {
        threadId: api.createType('ThreadId', fields.thread.id),
        categoryId: api.createType('CategoryId', fields.thread.category.id),
      }
    : {}
