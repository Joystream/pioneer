import { Meta, Story } from '@storybook/react'
import React from 'react'

import { MemberInfo, MemberInfoProps } from './MemberInfo'

export default {
  title: 'Member/MemberInfo',
  component: MemberInfo,
} as Meta

const Template: Story<MemberInfoProps> = (args) => <MemberInfo {...args} />

export const Default = Template.bind({})
Default.args = {
  member: {
    id: '0',
    name: 'Alice member',
    rootAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
    controllerAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
    handle: 'alice',
    isVerified: false,
    inviteCount: 0,
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
    inviteCount: 0,
    avatarUri: 'http://www.example.com',
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
    inviteCount: 0,
  },
}
