import { asBlock, Block } from '@/common/types'
import {
  ForumThreadBreadcrumbsFieldsFragment,
  ForumThreadDetailedFieldsFragment,
  ForumThreadFieldsFragment,
} from '@/forum/queries'
import { asMember, Member } from '@/memberships/types'

import { asCategoryBreadcrumbs, CategoryBreadcrumb } from './ForumCategory'

export type ThreadStatusType = ThreadStatus['__typename']
interface ThreadStatus extends Pick<ForumThreadFieldsFragment['status'], '__typename'> {
  threadDeletedEvent?: Block
}

export interface ForumThread {
  id: string
  title: string
  initialPostText: string
  author: Member
  createdInBlock: Block
  isSticky: boolean
  categoryId: string
  categoryTitle: string
  tags: ForumThreadTag[]
  visiblePostsCount: number
  status: ThreadStatus
}

export interface ForumThreadTag {
  id: string
  title: string
  threads: ForumThread[]
  visibleThreadsCount: number
}

export interface ForumThreadWithDetails extends ForumThread {
  createdInBlock: Block
}

export const asForumThreadStatus = (fields: ForumThreadFieldsFragment['status']): ThreadStatus => ({
  __typename: fields.__typename,
  ...('threadDeletedEvent' in fields && fields.threadDeletedEvent
    ? { threadDeletedEvent: asBlock(fields.threadDeletedEvent) }
    : {}),
})

export const asForumThread = (fields: ForumThreadFieldsFragment): ForumThread => ({
  id: fields.id,
  title: fields.title,
  createdInBlock: asBlock(fields.createdInEvent),
  author: asMember(fields.author),
  isSticky: fields.isSticky,
  categoryId: fields.categoryId,
  categoryTitle: fields.category.title,
  tags: [],
  visiblePostsCount: fields.visiblePostsCount,
  status: asForumThreadStatus(fields.status),
  initialPostText: fields.initialPost?.text ?? 'No initial post available',
})

export const asForumThreadWithDetails = (fields: ForumThreadDetailedFieldsFragment): ForumThreadWithDetails => ({
  ...asForumThread(fields),
})

export interface ThreadBreadcrumb {
  id: string
  title: string
}

interface ThreadBreadcrumbs {
  threadBreadcrumb: ThreadBreadcrumb
  categoryBreadcrumbs: CategoryBreadcrumb[]
}

export const asThreadBreadcrumbs = (fields: ForumThreadBreadcrumbsFieldsFragment): ThreadBreadcrumbs => ({
  threadBreadcrumb: {
    id: fields.id,
    title: fields.title,
  },
  categoryBreadcrumbs: asCategoryBreadcrumbs(fields.category),
})
