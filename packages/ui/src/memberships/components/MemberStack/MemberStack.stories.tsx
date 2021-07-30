import { Meta, Story } from '@storybook/react'
import faker from 'faker'
import React, { useEffect, useState } from 'react'

import { repeat } from '@/common/utils'

import { MemberStack, MemberSummary } from './MemberStack'

const MAX = 20

export default {
  title: 'Member/MemberStack',
  component: MemberStack,
  argTypes: {
    memberCount: { control: { type: 'range', max: MAX } },
    max: { control: { type: 'range', max: MAX } },
  },
  parameters: { controls: { exclude: ['members'] } },
} as Meta

interface Props {
  memberCount: number
  max: number
  useAvatars: boolean
}
const Template: Story<Props> = ({ memberCount, max, useAvatars }) => {
  const [members, setMembers] = useState(repeat((): MemberSummary => ({}), MAX))

  useEffect(() => {
    const updateUntil = max > 0 && memberCount > max ? max - 1 : memberCount
    setMembers(members.map((member, index) => (index < updateUntil ? fakeMember(member, index, useAvatars) : member)))
  }, [memberCount, max, useAvatars])

  return <MemberStack members={members.slice(0, memberCount)} max={max > 0 ? max : undefined} />
}

export const Default = Template.bind({})
Default.args = {
  memberCount: 13,
  max: 4,
  useAvatars: false,
}

const fakeMember = (member: MemberSummary, id: number, useAvatars: boolean): MemberSummary => ({
  handle: member.handle ?? faker.name.firstName(),
  description: member.description ?? `Worker ID: ${id}`,
  avatar: member.avatar ?? (useAvatars ? faker.image.avatar() : undefined),
})
