import { Meta, Story } from '@storybook/react'
import React from 'react'

import { TopContributors } from '@/bounty/components/TopContributors/TopContributors'
import members from '@/mocks/data/raw/members.json'

export default {
  title: 'Bounty/TopContributors',
  component: TopContributors,
} as Meta

const Template: Story = (args) => <TopContributors contributors={[]} {...args} />

export const Default = Template.bind({})
Default.args = {
  contributors: members.slice(0, 20),
}

export const NoContributors = Template.bind({})
NoContributors.args = {
  contributors: undefined,
}
