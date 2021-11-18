import { CategoryStatus as CategoryStatusSchema } from '@/common/api/queries'
import { asBlock, Block } from '@/common/types'
import {
  ForumCategoryBreadcrumbsFieldsFragment,
  ForumCategoryFieldsFragment,
  ArchivedForumCategoryFieldsFragment,
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
interface CategoryStatus extends Pick<CategoryStatusSchema, '__typename'> {
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
type ArchivedForumCategoryFields = Omit<ArchivedForumCategoryFieldsFragment, '__typename'>
export const asBaseForumCategory = (fields: ForumCategoryFields): Omit<ForumCategory, 'subcategories'> => ({
  id: fields.id,
  title: fields.title,
  description: fields.description,
  status: {
    __typename: fields.status.__typename,
    ...('categoryArchivalStatusUpdatedEvent' in fields.status && fields.status.categoryArchivalStatusUpdatedEvent
      ? { categoryArchivalStatusUpdatedEvent: asBlock(fields.status.categoryArchivalStatusUpdatedEvent) }
      : {}),
  },
  moderators: fields.moderators?.map(({ id, membership }) => ({ id, handle: membership.handle })) ?? [],
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
  subcategories:
    fields.forumcategoryparent?.map((fields) => ({ ...asSubCategory(fields), status: fields.status.__typename })) ?? [],
})

export const asArchivedForumCategory = (fields: ArchivedForumCategoryFields): ForumCategory => ({
  ...asBaseArchivedForumCategory(fields),
  subcategories:
    fields.forumcategoryparent?.map((fields) => ({ ...asSubCategory(fields), status: fields.status.__typename })) ?? [],
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
