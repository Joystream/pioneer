import { sub } from 'date-fns'
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

export const asStorybookPost = (text: string): RawForumPostMock | undefined => {
  if (text)
    return {
      id: '0',
      threadId: '0',
      createdAt: sub(Date.now(), { minutes: 25 }).toISOString(),
      authorId: '0',
      text,
    }
}

export const asStorybookThread = (title: string): RawForumThreadMock | undefined => {
  if (title)
    return {
      id: '0',
      categoryId: '0',
      isSticky: false,
      title,
      authorId: '0',
      createdInEvent: randomRawBlock(),
    }
}
