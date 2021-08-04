import { sub } from 'date-fns'
import faker from 'faker'

import { ForumModerator } from '@/forum/types'
import { RawForumCategoryMock, RawForumPostMock, RawForumThreadMock } from '@/mocks/data/seedForum'
import { randomRawBlock } from '@/mocks/helpers/randomBlock'

export const asStorybookModerator = (hasAvatar = false) => {
  return (index: number): ForumModerator => ({
    id: String(index),
    handle: faker.name.firstName(),
    avatar: hasAvatar ? faker.image.avatar() : undefined,
  })
}

export const asStorybookPost = (text: string, threadId?: string): RawForumPostMock | undefined => {
  if (text && threadId)
    return {
      id: `${threadId}:0`,
      threadId,
      createdAt: sub(Date.now(), { minutes: 25 }).toISOString(),
      authorId: '0',
      text,
    }
}

export const asStorybookThread = (title: string, categoryId?: string): RawForumThreadMock | undefined => {
  if (title && categoryId)
    return {
      id: `${categoryId}:0`,
      categoryId,
      isSticky: false,
      title,
      authorId: '0',
      createdInEvent: randomRawBlock(),
    }
}

export const asStorybookSubCategories = (parentId: string) => {
  return (title: string, index = 0): RawForumCategoryMock => ({
    id: `${parentId}-${index}`,
    title,
    description: '',
    parentId,
    moderators: [],
  })
}
