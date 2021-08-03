import {
  ForumCategoryBreadcrumbsFieldsFragment,
  ForumCategoryFieldsFragment,
  ForumSubCategoryFieldsFragment,
} from '@/forum/queries/__generated__/forum.generated'

export interface ForumCategory extends ForumBreadcrumb {
  description: string
  subcategories: ForumSubCategory[]
  moderators: ForumModerator[]
}

export interface ForumModerator {
  id: string
  membershipId: string
  handle?: string
  avatar?: string
}

export interface ForumSubCategory {
  id: string
  title: string
}

export type ForumBreadcrumb = ForumSubCategory

export const asForumCategory = (fields: Omit<ForumCategoryFieldsFragment, '__typename'>): ForumCategory => ({
  id: fields.id,
  title: fields.title,
  description: fields.description,
  subcategories: [],
  moderators: [],
})

const asSubCategory = (fields: ForumSubCategoryFieldsFragment): ForumBreadcrumb => ({
  id: fields.id,
  title: fields.title,
})

export const asForumBreadcrumbs = (fields: ForumCategoryBreadcrumbsFieldsFragment): ForumBreadcrumb[] => {
  return getBreadcrumbs(fields)
}

type ParentCategory = ForumSubCategoryFieldsFragment & { parent?: ParentCategory | null }

const getBreadcrumbs = (fields: ParentCategory): ForumBreadcrumb[] => {
  if (fields.parent) {
    return [...getBreadcrumbs(fields.parent), asSubCategory(fields)]
  }
  return [asSubCategory(fields)]
}
