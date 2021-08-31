import { useGetForumThreadsCountQuery } from '@/forum/queries'
import { ForumSubCategory } from '@/forum/types'

interface CategoryDetails {
  subcategories?: ForumSubCategory[]
  threadCount?: number
}
export const useForumCategoryThreadCount = (category_eq: string, isArchive?: boolean): CategoryDetails => {
  const status_json = {
    isTypeOf_eq: isArchive ? 'ThreadStatusLocked' : 'ThreadStatusActive',
  }
  const { data } = useGetForumThreadsCountQuery({
    variables: { where: { category: { id_eq: category_eq }, status_json } },
  })
  return { threadCount: data?.forumThreadsConnection.totalCount }
}
