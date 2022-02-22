import { createType } from '@joystream/types'
import { ThreadId } from '@joystream/types/common'
import { CategoryId } from '@joystream/types/forum'
import { useMemo } from 'react'

import { ForumPostParentsFragment, useGetForumPostParentsQuery } from '@/forum/queries'

export const useForumPostParents = (id: string) => {
  const { data, loading } = useGetForumPostParentsQuery({ variables: { where: { id } } })
  const { threadId, categoryId } = useMemo(() => asPostParents(data?.forumPostByUniqueInput), [data, loading])
  return { threadId, categoryId, parentsLoading: loading }
}

const asPostParents = (fields: ForumPostParentsFragment | null | undefined) =>
  fields
    ? {
        threadId: createType<ThreadId, 'ThreadId'>('ThreadId', Number(fields.thread.id)),
        categoryId: createType<CategoryId, 'CategoryId'>('CategoryId', Number(fields.thread.category.id)),
      }
    : {}
