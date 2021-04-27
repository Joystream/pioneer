import { Meta, Story } from '@storybook/react'
import React from 'react'

import { MemberListItem } from './MemberListItem'

export default {
  title: 'Member/MemberListItem',
  component: MemberListItem,
} as Meta

type Props = Parameters<typeof MemberListItem>[0]
const Template: Story<Props> = (args) => <MemberListItem {...args} />

export const Membership = Template.bind({})
Membership.args = {
  member: {
    type: 'Membership',
    id: '144',
    name: 'Alice member',
    rootAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
    controllerAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
    handle: 'alice',
    isVerified: false,
    isFoundingMember: false,
    roles: [],
    inviteCount: 0,
  },
}

export const Members = Template.bind({})
Members.args = {
  member: {
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
}
