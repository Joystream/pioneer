import { u64 } from '@polkadot/types'

import { createType } from '@/common/model/createType'

export const postsToDeleteMap = (postId: u64, threadId: u64, categoryId: u64) => {
  const extendedPostId = createType('PalletForumExtendedPostIdObject', {
    postId: postId,
    threadId: threadId,
    categoryId: categoryId,
  })
  return createType('BTreeMap<PalletForumExtendedPostIdObject, bool>', new Map([[extendedPostId, true]]))
}
