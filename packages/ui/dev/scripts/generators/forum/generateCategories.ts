import faker from 'faker'

import { RawForumCategoryMock } from '@/mocks/data/seedForum'

import { randomFromRange } from '../utils'

let nextId = 0

export const generateCategories = (depth: number, mocks?: RawForumCategoryMock[], parentCategory?: string): RawForumCategoryMock[] => {
  const mocksArray: RawForumCategoryMock[] = mocks ?? []
  const numberOfCategories = mocks ? randomFromRange(0, 2) : 3;

  [...new Array(numberOfCategories)].forEach(() => generateCategory(depth -1, mocksArray, parentCategory))
  return mocksArray
}

const generateCategory = (depth: number, mocks: RawForumCategoryMock[], parentId?: string) => {
  const id = (nextId++).toString()
  const category = {
    id,
    title: faker.lorem.words(randomFromRange(3, 5)),
    description: faker.lorem.paragraph(randomFromRange(2, 3)),
    parentId: parentId ? parentId : null,
  }
  mocks.push(category)
  if (depth) {
    generateCategories(depth, mocks, id)
  }
}
