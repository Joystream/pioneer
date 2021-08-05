import { useMemo } from 'react'

import { ForumPostParentsFragment, useGetForumPostParentsQuery } from '@/forum/queries'

export const usePostParents = (id: string) => {
  const { data, loading } = useGetForumPostParentsQuery({ variables: { where: { id } } })
  const { threadId, categoryId } = useMemo(() => asPostParents(data?.forumPostByUniqueInput), [data, loading])
  return { threadId, categoryId, parentsLoading: loading }
}

const asPostParents = (fields: ForumPostParentsFragment | null | undefined) =>
  fields
    ? {
        threadId: fields.thread.id,
        categoryId: fields.thread.category.id,
      }
    : {}
