import { ForumPostMetadata } from '@joystream/metadata-protobuf'

import { createType } from '@/common/model/createType'
import { metadataToBytes } from '@/common/model/JoystreamNode'
import { ForumPost } from '@/forum/types'
import { ProxyApi } from '@/proxyApi'

export const transactionFactory = (
  api: ProxyApi,
  module: 'forum' | 'proposalsDiscussion',
  text: string,
  isEditable: boolean,
  replyTo: ForumPost,
  memberId: string
) => {
  if (module === 'forum') {
    return api.tx.forum.addPost(
      createType('ForumUserId', Number.parseInt(memberId)),
      replyTo.categoryId,
      replyTo.threadId,
      metadataToBytes(ForumPostMetadata, {
        text,
        repliesTo: Number(replyTo.id),
      }),
      isEditable
    )
  }

  return api.tx.proposalsDiscussion.addPost(
    createType('MemberId', Number.parseInt(memberId)),
    replyTo.threadId,
    metadataToBytes(ForumPostMetadata, { text, repliesTo: Number(replyTo.id) }),
    isEditable
  )
}
