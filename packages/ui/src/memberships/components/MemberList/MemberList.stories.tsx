import { Meta, Story } from '@storybook/react'
import React from 'react'

import { mockMembers } from '../../../mocks/data/mockMembers'
import { Member, OtherMember } from '../../types'

import { MemberList } from '.'

export default {
  title: 'Member/MemberList',
  component: MemberList,
} as Meta

type Props = Parameters<typeof MemberList>[0]
const Template: Story<Props> = (args) => <MemberList {...args} />

export const Members = Template.bind({})
Members.args = {
  members: mockMembers.map(
    (member: Member): OtherMember => ({
      ...member,
      kind: 'Member',
      isConcilMember: false,
      totalBalance: 100000,
      totalStacked: 30000,
    })
  ),
}
