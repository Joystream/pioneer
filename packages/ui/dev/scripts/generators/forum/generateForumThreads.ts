import faker from 'faker'

import { RawForumCategoryMock, RawForumThreadMock } from '@/mocks/data/seedForum'

import members from '../../../../src/mocks/data/raw/members.json'
import { randomFromRange } from '../utils'

const randomMember = () => members[randomFromRange(0, members.length - 1)].id

export const generateForumThreads = (forumCategories: Pick<RawForumCategoryMock, 'id'>[]): RawForumThreadMock[] => {
  let nextId = 0

  return forumCategories
    .map(({ id }) => {
      return [...new Array(randomFromRange(3, 10))].map(() => {
        return {
          id: String(nextId++),
          categoryId: id,
          isSticky: !(nextId % 5),
          title: faker.lorem.words(randomFromRange(4, 8)),
          authorId: randomMember(),
        }
      })
    })
    .flatMap((a) => a)
}
