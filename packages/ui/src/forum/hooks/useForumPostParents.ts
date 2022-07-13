import { useMemo } from 'react'

import { createType } from '@/common/model/createType'
import { ForumPostParentsFragment, useGetForumPostParentsQuery } from '@/forum/queries'

export const useForumPostParents = (id: string) => {
  const { data, loading } = useGetForumPostParentsQuery({ variables: { where: { id } } })
  const { threadId, categoryId } = useMemo(() => asPostParents(data?.forumPostByUniqueInput), [data, loading])
  return { threadId, categoryId, parentsLoading: loading }
}

const asPostParents = (fields: ForumPostParentsFragment | null | undefined) =>
  fields
    ? {
        threadId: createType('ThreadId', Number(fields.thread.id)),
        categoryId: createType('CategoryId', Number(fields.thread.category.id)),
      }
    : {}
