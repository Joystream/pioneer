import { Meta } from '@storybook/react'

import { MyMemberListItem } from '.'

export default {
  title: 'Member/MyMemberListItem',
  component: MyMemberListItem,
  args: {
    member: {
      id: '144',
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
  },
} as Meta

export const Default = {}
