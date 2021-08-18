import { CategoryStatus as CategoryStatusSchema } from '@/common/api/queries'
import { ForumCategoryWithDetailsFieldsFragment } from '@/forum/queries'

import { asBaseForumCategory, asForumCategory, ForumCategory } from './ForumCategory'

export type CategoryStatus = CategoryStatusSchema['__typename']

export interface ForumCategoryWithDetails extends ForumCategory {
  status: CategoryStatus
  subcategories: ForumCategory[]
}

export const asCategoryWithDetails = (fields: ForumCategoryWithDetailsFieldsFragment): ForumCategoryWithDetails => ({
  ...asBaseForumCategory(fields),
  status: fields.status.__typename,
  subcategories: fields.forumcategoryparent?.map((x) => asForumCategory(x)) ?? [],
})
