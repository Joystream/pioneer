import {
  ForumCategoryBreadcrumbsFieldsFragment,
  ForumCategoryFieldsFragment,
  ForumSubCategoryFieldsFragment,
} from '@/forum/queries/__generated__/forum.generated'

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

export const asForumCategory = (fields: Omit<ForumCategoryFieldsFragment, '__typename'>): ForumCategory => ({
  id: fields.id,
  title: fields.title,
  description: fields.description,
  moderators: fields.moderators?.map(({ id, membership }) => ({ id, handle: membership.handle })) ?? [],
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
