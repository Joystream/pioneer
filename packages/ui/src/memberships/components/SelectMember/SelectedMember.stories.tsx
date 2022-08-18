import { Meta, Story } from '@storybook/react'
import React from 'react'

import { getMember } from '@/mocks/helpers'

import { SelectedMember, SelectedMemberProps } from './SelectedMember'

export default {
  title: 'Member/SelectedMember',
  component: SelectedMember,
} as Meta

const Template: Story<SelectedMemberProps> = (args) => <SelectedMember {...args} />

export const Default = Template.bind({})
Default.args = {
  member: getMember('alice'),
}
