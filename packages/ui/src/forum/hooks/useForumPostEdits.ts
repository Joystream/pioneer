import { useMemo } from 'react'

import { useGetForumPostEditsQuery } from '@/forum/queries/__generated__/forum.generated'

import { PostEdit } from '../types'

interface ForumPostEdits {
  isLoading: boolean
  edits: PostEdit[] | undefined
}

export const useForumPostEdits = (postId: string): ForumPostEdits => {
  const { loading, data } = useGetForumPostEditsQuery({ variables: { id: postId } })

  const edits = useMemo(
    () => data && [...data.initial.map((event) => ({ ...event, newText: event.text })), ...data.edits],
    [data, loading]
  )

  return {
    isLoading: loading,
    edits,
  }
}
