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

  const forumMocks = { forumCategories }

  Object.entries(forumMocks).forEach(([fileName, contents]) => saveFile(fileName, contents))
}

export const forumModule = {
  command: 'forum',
  describe: 'Generate forum from other mocks',
  handler: generateForum,
}
