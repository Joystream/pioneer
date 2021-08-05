import { useGetForumThreadsCountQuery } from '@/forum/queries'
import { ForumSubCategory } from '@/forum/types'

interface CategoryDetails {
  subcategories?: ForumSubCategory[]
  threadCount?: number
}
export const useForumCategoryThreadCount = (category_eq: string): CategoryDetails => {
  const { data } = useGetForumThreadsCountQuery({ variables: { where: { category_eq } } })
  return { threadCount: data?.forumThreadsConnection.totalCount }
}
