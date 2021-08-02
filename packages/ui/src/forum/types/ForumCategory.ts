import {
  ForumCategoryBreadcrumbsFieldsFragment,
  ForumCategoryFieldsFragment,
  ForumSubCategoryFieldsFragment,
} from '@/forum/queries/__generated__/forum.generated'

export interface ForumCategory extends ForumSubCategory {
  description: string
  subcategories: ForumSubCategory[]
}

interface ForumSubCategory {
  id: string
  title: string
}

export const asForumCategory = (fields: ForumCategoryFieldsFragment): ForumCategory => ({
  id: fields.id,
  title: fields.title,
  description: fields.description,
  subcategories: [],
})

const asSubCategory = (fields: ForumSubCategoryFieldsFragment): ForumSubCategory => ({
  id: fields.id,
  title: fields.title,
})

export const asForumBreadcrumbs = (fields: ForumCategoryBreadcrumbsFieldsFragment): ForumSubCategory[] => {
  const breadcrumbs: ForumSubCategory[] = []
  assignBreadcrumbs(fields, breadcrumbs)
  return breadcrumbs
}

type ParentCategory = ForumSubCategoryFieldsFragment & { parent?: ParentCategory | null }

const assignBreadcrumbs = (fields: ParentCategory, categories: ForumSubCategory[]) => {
  if (fields.parent) {
    assignBreadcrumbs(fields.parent, categories)
  }
  categories.push(asSubCategory(fields))
}
