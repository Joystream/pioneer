import faker from 'faker'

import { randomFromRange } from '../utils'

export const generateForumThreads = (forumCategories: { id: string }[]) => {
  let nextId = 0

  return forumCategories
    .map(({ id }) => {
      return [...new Array(randomFromRange(3, 10))].map(() => {
        return {
          id: String(nextId++),
          categoryId: id,
          isSticky: !(nextId % 5),
          title: faker.lorem.words(randomFromRange(4, 8)),
        }
      })
    })
    .flatMap((a) => a)
}
