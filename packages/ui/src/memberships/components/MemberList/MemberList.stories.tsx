import { Meta, Story } from '@storybook/react'
import React from 'react'

import { mockMembers } from '../../../mocks/data/mockMembers'
import { Membership } from '../../types'

import { MemberList } from '.'

export default {
  title: 'Member/MemberList',
  component: MemberList,
} as Meta

type Props = Parameters<typeof MemberList>[0]
const Template: Story<Props> = (args) => <MemberList {...args} />

export const Memberships = Template.bind({})
Memberships.args = {
  members: mockMembers as Membership[],
}

export const Members = Template.bind({})
Members.args = {
  members: [
    {
      type: 'Members',
      id: '144',
      name: 'Alice member',
      rootAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
      controllerAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
      handle: 'alice',
      isVerified: false,
      isFoundingMember: false,
      roles: [],
      inviteCount: 0,
      isConcilMember: true,
      totalBalanced: 100000,
      totalStacked: 30000,
    },
  ],
}
