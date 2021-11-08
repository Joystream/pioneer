import { Meta, Story } from '@storybook/react'
import React from 'react'

import { MemberInfo, MemberInfoProps } from './MemberInfo'

export default {
  title: 'Member/MemberInfo',
  component: MemberInfo,
  argTypes: {
    memberSize: { table: { disable: true } },
  },
} as Meta

const Template: Story<MemberInfoProps> = (args) => (
  <>
    <MemberInfo {...args} memberSize="m" />
    <MemberInfo {...args} memberSize="l" />
  </>
)

export const Default = Template.bind({})
Default.args = {
  member: {
    id: '0',
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
}

export const WithAvatar = Template.bind({})
WithAvatar.args = {
  member: {
    id: '0',
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
    avatar: 'http://www.example.com',
    createdAt: '',
  },
}

export const Verified = Template.bind({})
Verified.args = {
  member: {
    id: '0',
    name: 'Alice member',
    rootAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
    controllerAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
    handle: 'alice',
    isVerified: true,
    isFoundingMember: true,
    isCouncilMember: false,
    roles: [],
    boundAccounts: [],
    inviteCount: 0,
    createdAt: '',
  },
}
