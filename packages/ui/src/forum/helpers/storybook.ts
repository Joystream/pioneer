import faker from 'faker'

import { ForumModerator } from '@/forum/types'
import { RawForumPostMock, RawForumThreadMock } from '@/mocks/data/seedForum'
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
      authorId: '0',
      text,
      edits: [],
      postAddedEvent: {
        inBlock: 1440099,
        network: 'OLYMPIA',
        createdAt: '2021-05-28T15:50:35.148Z',
        text,
      },
      status: 'PostStatusActive',
      deletedInEvent: null,
      postModeratedEvent: null,
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
      status: { __typename: 'ThreadStatusActive' },
      visiblePostsCount: 11,
    }
}
