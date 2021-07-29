import { Meta, Story } from '@storybook/react'
import React from 'react'

import { repeat } from '@/common/utils'

import { getMember } from '../../../../test/_mocks/members'

import { MemberStack } from './MemberStack'

export default {
  title: 'Member/MemberStack',
  component: MemberStack,
  argTypes: {
    memberCount: { control: { type: 'range', min: 0, max: 20 } },
    max: { control: { type: 'range', min: -1, max: 20 } },
  },
} as Meta

const alice = getMember('alice')

interface Props {
  memberCount: number
  max: number
}
const Template: Story<Props> = ({ memberCount, max }) => (
  <MemberStack members={repeat((id) => ({ ...alice, id: String(id) }), memberCount)} max={max > 0 ? max : undefined} />
)

export const Default = Template.bind({})
Default.args = {
  memberCount: 14,
  max: 4,
}
