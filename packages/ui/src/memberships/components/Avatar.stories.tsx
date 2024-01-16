import { Meta, Story } from '@storybook/react'
import React from 'react'

import { MemberInfoAvatar, MemberInfoAvatarProps } from './Avatar'

export default {
  title: 'Member/MemberAvatar',
  component: MemberInfoAvatar,
} as Meta

const Template: Story<MemberInfoAvatarProps> = (args) => <MemberInfoAvatar small noArea member={args.member} />

export const Default = Template.bind({})
Default.args = {
  member: {
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
}
