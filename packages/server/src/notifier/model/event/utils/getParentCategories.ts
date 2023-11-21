import { request } from 'graphql-request'

import { QUERY_NODE_ENDPOINT } from '@/common/config'
import { GetForumCategoryDocument } from '@/common/queries'

export const getParentCategories = async (id: string, acc: string[] = []): Promise<string[]> => {
  const ids = [...acc, id]
  const data = await request(QUERY_NODE_ENDPOINT, GetForumCategoryDocument, { id })
  const parentId = data.forumCategoryByUniqueInput?.parentId

  return parentId ? getParentCategories(parentId, ids) : ids
}
