import { useGetForumPostEditsQuery } from '@/forum/queries/__generated__/forum.generated'

import { PostEdit } from '../types'

interface ForumPostEdits {
  isLoading: boolean
  edits: PostEdit[] | undefined
}

export const useForumPostEdits = (postId: string): ForumPostEdits => {
  const { loading, data } = useGetForumPostEditsQuery({ variables: { id: postId } })

  return {
    isLoading: loading,
    edits: data ? data.edits : [],
  }
}
