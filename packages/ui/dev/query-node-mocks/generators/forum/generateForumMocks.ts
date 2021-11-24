import { saveFile } from '../../helpers/saveFile'
import { MemberMock } from '../generateMembers'
import { WorkerMock } from '../generateWorkers'

import { generateCategories } from './generateCategories'
import { generateForumThreads } from './generateForumThreads'


export interface MocksForForum {
  members: MemberMock[]
  workers: WorkerMock[]
}

export const generateForum = (mocks?: MocksForForum) => {
  if (!mocks) {
    mocks = {
      members: require('../../../../src/mocks/data/raw/members.json'),
      workers: require('../../../../src/mocks/data/raw/workers.json')
    }
  }

  const forumCategories = generateCategories(3)(mocks)
  const { forumThreads, forumPosts } = generateForumThreads(forumCategories)(mocks)

  return { forumCategories, forumThreads, forumPosts }
}

export const forumModule = {
  command: 'forum',
  describe: 'Generate forum from other mocks',
  handler: () => Object.entries(generateForum()).forEach(([fileName, contents]) => saveFile(fileName, contents))
}
