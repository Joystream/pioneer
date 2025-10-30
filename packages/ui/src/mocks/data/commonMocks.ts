import { ForumPost } from '@/forum/types'

export const forumPostMock: ForumPost = {
  id: '0',
  createdAt: new Date().toISOString(),
  createdAtBlock: {
    number: 1000,
    network: 'OLYMPIA',
    timestamp: '2012-01-26T13:51:50.417-07:00',
  },
  author: {
    id: '0',
    name: 'Alice member',
    rootAccount: 'j4W7rVcUCxi2crhhjRq46fNDRbVHTjJrz6bKxZwehEMQxZeSf',
    controllerAccount: 'j4W7rVcUCxi2crhhjRq46fNDRbVHTjJrz6bKxZwehEMQxZeSf',
    handle: 'alice',
    isVerified: false,
    isFoundingMember: false,
    isCouncilMember: false,
    roles: [],
    boundAccounts: [],
    inviteCount: 0,
    createdAt: '',
  },
  text: 'Forum post common mock',
  status: 'PostStatusActive',
  threadId: '1',
  categoryId: '1',
}
