import { Meta, Story } from '@storybook/react'
import React from 'react'

import { asMemberWithDetails } from '@/memberships/types'

import { mockMembers } from '../../../mocks/data/seedMembers'

import { MemberList } from '.'

export default {
  title: 'Member/MemberList',
  component: MemberList,
} as Meta

type Props = Parameters<typeof MemberList>[0]
const Template: Story<Props> = (args) => <MemberList {...args} />

export const Members = Template.bind({})
Members.args = { members: mockMembers.map((member) => asMemberWithDetails({ ...member } as unknown as any)) }
