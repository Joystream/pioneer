import { Meta, Story } from '@storybook/react'
import React from 'react'

import { asMember } from '@/memberships/types'

import { mockMembers } from '../../../mocks/data/mockMembers'

import { MemberList } from '.'

export default {
  title: 'Member/MemberList',
  component: MemberList,
} as Meta

type Props = Parameters<typeof MemberList>[0]
const Template: Story<Props> = (args) => <MemberList {...args} />

export const Members = Template.bind({})
Members.args = { members: mockMembers.map((member) => asMember({ ...member } as unknown as any)) }
