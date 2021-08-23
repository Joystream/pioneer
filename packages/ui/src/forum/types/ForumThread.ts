import { asBlock, Block } from '@/common/types'
import { ForumThreadDetailedFieldsFragment, ForumThreadFieldsFragment } from '@/forum/queries'

export type ThreadStatusType = ThreadStatus['__typename']
interface ThreadStatus extends Pick<ForumThreadFieldsFragment['status'], '__typename'> {
  threadDeletedEvent?: Block
}

export interface ForumThread {
  id: string
  title: string
  authorId: string
  createdInBlock: Block
  isSticky: boolean
  categoryId: string
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
  authorId: fields.authorId,
  isSticky: fields.isSticky,
  categoryId: fields.categoryId,
  tags: [],
  visiblePostsCount: 10,
  status: asForumThreadStatus(fields.status),
})

export const asForumThreadWithDetails = (fields: ForumThreadDetailedFieldsFragment): ForumThreadWithDetails => ({
  ...asForumThread(fields),
})
