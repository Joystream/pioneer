import { u64 } from '@polkadot/types-codec'

import { createType } from '@/common/model/createType'

export const postsToDeleteMap = (postId: u64, threadId: u64, categoryId: u64) => {
  const extendedPostId = createType('PalletForumExtendedPostIdObject', {
    post_id: postId,
    thread_id: threadId,
    category_id: categoryId,
  })
  return createType('BTreeMap<PalletForumExtendedPostIdObject, bool>', new Map([[extendedPostId, true]]))
}
