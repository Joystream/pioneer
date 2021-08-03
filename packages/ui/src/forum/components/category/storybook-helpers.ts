import { sub } from 'date-fns'
import faker from 'faker'

import { ForumModerator, ForumPost, ForumThread } from '@/forum/types'
import { getMember } from '@/mocks/helpers'
import { randomBlock } from '@/mocks/helpers/randomBlock'

export const asStorybookModerator = (hasAvatar = false) => {
  return (index: number): ForumModerator => ({
    id: String(index),
    handle: faker.name.firstName(),
    avatar: hasAvatar ? faker.image.avatar() : undefined,
  })
}

export const asStorybookPost = (text: string): ForumPost | undefined => {
  if (text)
    return {
      id: '0',
      createdAt: sub(Date.now(), { minutes: 25 }).toISOString(),
      createdAtBlock: randomBlock(),
      author: getMember('alice'),
      text,
    }
}

export const asStorybookThread = (title: string): (ForumThread & { postCount: number }) | undefined => {
  if (title)
    return {
      id: '0',
      title,
      isSticky: false,
      categoryId: '0',
      postCount: 1201,
    }
}
