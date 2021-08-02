import {
  ForumCategoryDetailedFieldsFragment,
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

export interface ForumCategoryWithDetails extends ForumCategory {
  parentCategories: ForumSubCategory[]
}

export const asForumCategoryWithDetails = (fields: ForumCategoryDetailedFieldsFragment): ForumCategoryWithDetails => {
  const parentCategories: ForumSubCategory[] = []
  if (fields.parent) {
    assignParentCategories(fields.parent, parentCategories)
  }
  return {
    ...asForumCategory(fields),
    parentCategories,
    subcategories: fields.forumcategoryparent?.map(asSubCategory) ?? [],
  }
}

type ParentCategory = ForumSubCategoryFieldsFragment & { parent?: ParentCategory | null }

const assignParentCategories = (fields: ParentCategory, categories: ForumSubCategory[]) => {
  if (fields.parent) {
    assignParentCategories(fields.parent, categories)
  }
  categories.push(asSubCategory(fields))
}
