import { CategoryStatus as CategoryStatusSchema } from '@/common/api/queries'
import { asBlock, Block } from '@/common/types'
import {
  ArchivedForumCategoryFieldsFragment,
  ForumBaseCategoryFieldsFragment,
  ForumCategoryBreadcrumbsFieldsFragment,
  ForumCategoryFieldsFragment,
  ForumSubCategoryFieldsFragment,
} from '@/forum/queries'

export interface ForumCategory {
  id: string
  title: string
  description: string
  status: CategoryStatus
  moderators: ForumModerator[]
  subcategories: (ForumSubCategory & { status: CategoryStatusType })[]
}

export type CategoryStatusType = CategoryStatusSchema['__typename']
export interface CategoryStatus extends Pick<CategoryStatusSchema, '__typename'> {
  categoryArchivalStatusUpdatedEvent?: Block
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

export type CategoryBreadcrumb = ForumSubCategory

type ForumCategoryFields = Omit<ForumCategoryFieldsFragment, '__typename'>
type ForumBaseCategoryFields = Omit<ForumBaseCategoryFieldsFragment, '__typename'>
type ArchivedForumCategoryFields = Omit<ArchivedForumCategoryFieldsFragment, '__typename'>
export const asBaseForumCategory = (fields: ForumBaseCategoryFields): Omit<ForumCategory, 'subcategories'> => ({
  id: fields.id,
  title: fields.title,
  description: fields.description,
  status: {
    __typename: fields.status.__typename,
    ...('categoryArchivalStatusUpdatedEvent' in fields.status && fields.status.categoryArchivalStatusUpdatedEvent
      ? { categoryArchivalStatusUpdatedEvent: asBlock(fields.status.categoryArchivalStatusUpdatedEvent) }
      : {}),
  },
  moderators: [],
})

export const asBaseArchivedForumCategory = (
  fields: ArchivedForumCategoryFields
): Omit<ForumCategory, 'subcategories'> => ({
  id: fields.id,
  title: fields.title,
  description: fields.description,
  status: {
    __typename: fields.status.__typename,
    ...('categoryArchivalStatusUpdatedEvent' in fields.status && fields.status.categoryArchivalStatusUpdatedEvent
      ? { categoryArchivalStatusUpdatedEvent: asBlock(fields.status.categoryArchivalStatusUpdatedEvent) }
      : {}),
  },
  moderators: [],
})

export const asForumCategory = (fields: ForumCategoryFields): ForumCategory => ({
  ...asBaseForumCategory(fields),
  moderators: fields.moderators?.map(({ id, membership }) => ({ id, handle: membership.handle })) ?? [],
  subcategories:
    fields.forumcategoryparent
      ?.filter((fields) => fields.status.__typename !== 'CategoryStatusRemoved')
      .map((fields) => ({ ...asSubCategory(fields), status: fields.status.__typename })) ?? [],
})

export const asArchivedForumCategory = (fields: ArchivedForumCategoryFields): ForumCategory => ({
  ...asBaseArchivedForumCategory(fields),
  subcategories:
    fields.forumcategoryparent
      ?.filter((subcategory) => subcategory.status.__typename !== 'CategoryStatusRemoved')
      .map((fields) => ({ ...asSubCategory(fields), status: fields.status.__typename })) ?? [],
})

export const asSubCategory = (fields: ForumSubCategoryFieldsFragment): ForumSubCategory => ({
  id: fields.id,
  title: fields.title,
})

export const asCategoryBreadcrumbs = (fields: ForumCategoryBreadcrumbsFieldsFragment): CategoryBreadcrumb[] => {
  if (fields.parent) {
    return [...asCategoryBreadcrumbs(fields.parent), asSubCategory(fields)]
  }
  return [asSubCategory(fields)]
}
