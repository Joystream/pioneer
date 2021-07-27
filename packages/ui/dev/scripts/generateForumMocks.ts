import * as faker from 'faker'

import { randomFromRange } from './generators/utils'
import { saveFile } from './helpers/saveFile'

let nextId = 0

export const generateForum = () => {
  const forumCategories = [...new Array(5)].map(() => {
    return {
      id: String(nextId++),
      title: faker.lorem.words(randomFromRange(3, 5)),
      description: faker.lorem.paragraph(randomFromRange(2, 3)),
    }
  })

  nextId = 0

  const forumThreads = forumCategories
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

  const forumMocks = { forumCategories, forumThreads }

  Object.entries(forumMocks).forEach(([fileName, contents]) => saveFile(fileName, contents))
}

export const forumModule = {
  command: 'forum',
  describe: 'Generate forum from other mocks',
  handler: generateForum,
}
