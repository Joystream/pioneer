import { sub } from 'date-fns'
import faker from 'faker'

import { ForumModerator, ForumPost, ForumThread } from '@/forum/types'
import { getMember } from '@/mocks/helpers'
import { randomBlock } from '@/mocks/helpers/randomBlock'

export const asModerator = (hasHandle = true, hasAvatar = false) => {
  return (index: number): ForumModerator => ({
    id: String(index),
    membershipId: '0',
    handle: hasHandle ? faker.name.firstName() : undefined,
    avatar: hasAvatar ? faker.image.avatar() : undefined,
  })
}

export const asPost = (text: string): ForumPost | undefined => {
  if (text)
    return {
      id: '0',
      createdAt: sub(Date.now(), { minutes: 25 }).toISOString(),
      createdAtBlock: randomBlock(),
      author: getMember('alice'),
      text,
    }
}

export const asThread = (title: string): (ForumThread & { postCount: number }) | undefined => {
  if (title)
    return {
      id: '0',
      title,
      isSticky: false,
      categoryId: '0',
      postCount: 1201,
    }
}
