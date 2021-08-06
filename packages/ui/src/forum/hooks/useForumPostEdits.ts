import { useGetForumPostEditsQuery } from '@/forum/queries/__generated__/forum.generated'

export const useForumPostEdits = (postId: string) => {
  const { loading, data } = useGetForumPostEditsQuery({ variables: { id: postId } })

  return {
    isLoading: loading,
    edits: data ? data.edits : [],
  }
}
