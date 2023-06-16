import { Meta } from '@storybook/react'

import { MyMemberListItem } from '.'

export default {
  title: 'Member/MyMemberListItem',
  component: MyMemberListItem,
  args: {
    member: {
      id: '144',
      name: 'Alice member',
      rootAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
      controllerAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
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
