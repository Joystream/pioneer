import {
  ForumCategoryBreadcrumbsFieldsFragment,
  ForumCategoryFieldsFragment,
  ForumSubCategoryFieldsFragment,
} from '@/forum/queries/__generated__/forum.generated'

export interface ForumCategory extends ForumBreadcrumb {
  description: string
  subcategories: ForumBreadcrumb[]
}

export interface ForumBreadcrumb {
  id: string
  title: string
}

export const asForumCategory = (fields: ForumCategoryFieldsFragment): ForumCategory => ({
  id: fields.id,
  title: fields.title,
  description: fields.description,
  subcategories: [],
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
