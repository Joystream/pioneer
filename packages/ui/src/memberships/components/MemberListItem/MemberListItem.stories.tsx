import { Meta, Story } from '@storybook/react'
import React from 'react'

import { MemberListItem } from './MemberListItem'

export default {
  title: 'Member/MemberListItem',
  component: MemberListItem,
} as Meta

type Props = Parameters<typeof MemberListItem>[0]
const Template: Story<Props> = (args) => <MemberListItem {...args} />

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
    roles: [],
    inviteCount: 0,
  },
}
