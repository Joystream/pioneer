import { CategoryStatus as CategoryStatusSchema } from '@/common/api/queries'
import {
  ForumCategoryBreadcrumbsFieldsFragment,
  ForumCategoryFieldsFragment,
  ForumSubCategoryFieldsFragment,
} from '@/forum/queries'

export type CategoryStatus = CategoryStatusSchema['__typename']

export interface ForumCategory extends ForumBreadcrumb {
  description: string
  moderators: ForumModerator[]
  subcategories: ForumSubCategory[]
}

export interface ForumModerator {
  id: string
  handle: string
  avatar?: string
}

export interface ForumSubCategory {
  id: string
  title: string
}

export type ForumBreadcrumb = ForumSubCategory

type ForumCategoryFields = Omit<ForumCategoryFieldsFragment, '__typename'>
export const asBaseForumCategory = (fields: ForumCategoryFields): Omit<ForumCategory, 'subcategories'> => ({
  id: fields.id,
  title: fields.title,
  description: fields.description,
  moderators: fields.moderators?.map(({ id, membership }) => ({ id, handle: membership.handle })) ?? [],
})

export const asForumCategory = (fields: ForumCategoryFields): ForumCategory => ({
  ...asBaseForumCategory(fields),
  subcategories: fields.forumcategoryparent?.map(asSubCategory) ?? [],
})

export const asSubCategory = (fields: ForumSubCategoryFieldsFragment): ForumBreadcrumb => ({
  id: fields.id,
  title: fields.title,
})

export const asForumBreadcrumbs = (fields: ForumCategoryBreadcrumbsFieldsFragment): ForumBreadcrumb[] => {
  if (fields.parent) {
    return [...asForumBreadcrumbs(fields.parent), asSubCategory(fields)]
  }
  return [asSubCategory(fields)]
}
