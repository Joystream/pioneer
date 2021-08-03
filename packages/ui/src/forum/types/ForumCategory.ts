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
  const breadcrumbs: ForumBreadcrumb[] = []
  assignBreadcrumbs(fields, breadcrumbs)
  return breadcrumbs
}

type ParentCategory = ForumSubCategoryFieldsFragment & { parent?: ParentCategory | null }

const assignBreadcrumbs = (fields: ParentCategory, categories: ForumBreadcrumb[]) => {
  if (fields.parent) {
    assignBreadcrumbs(fields.parent, categories)
  }
  categories.push(asSubCategory(fields))
}
