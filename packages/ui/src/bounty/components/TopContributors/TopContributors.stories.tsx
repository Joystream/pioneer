import { Meta, Story } from '@storybook/react'
import React from 'react'

import { TopContributors } from '@/bounty/components/TopContributors/TopContributors'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'

export default {
  title: 'Bounty/TopContributors',
  component: TopContributors,
} as Meta

const Template: Story = () => (
  <MockApolloProvider members>
    <TopContributors />
  </MockApolloProvider>
)
export const Default = Template.bind({})
