import { saveFile } from '../../helpers/saveFile'

import { generateCategories } from './generateCategories'
import { generateForumThreads } from './generateForumThreads'

export const generateForum = () => {
  const forumCategories = generateCategories(3)
  const { forumThreads, forumPosts } = generateForumThreads(forumCategories)

  const forumMocks = { forumCategories, forumThreads, forumPosts }

  Object.entries(forumMocks).forEach(([fileName, contents]) => saveFile(fileName, contents))
}

export const forumModule = {
  command: 'forum',
  describe: 'Generate forum from other mocks',
  handler: generateForum,
}
