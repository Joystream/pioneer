import { Meta, Story } from '@storybook/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { getMember } from '@/mocks/helpers'

import { SelectedMember, SelectedMemberProps } from './SelectedMember'

export default {
  title: 'Member/SelectedMember',
  component: SelectedMember,
} as Meta

const Template: Story<SelectedMemberProps> = (args) => (
  <MemoryRouter>
    <SelectedMember {...args} />
  </MemoryRouter>
)

export const Default = Template.bind({})
Default.args = {
  member: getMember('alice'),
}
