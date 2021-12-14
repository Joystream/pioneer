import { Meta, Story } from '@storybook/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { BountyListItem } from '@/bounty/components/BountyListItem/BountyListItem'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'

export default {
  title: 'Bounty/BountyListItem',
  component: BountyListItem,
} as Meta

const Template: Story = (args) => {
  return (
    <MemoryRouter>
      <MockApolloProvider workingGroups members workers>
        <BountyListItem title="Title" creator="User" date={new Date()} imageUrl="url" period="funding" {...args} />
      </MockApolloProvider>
    </MemoryRouter>
  )
}

export const Default = Template.bind({})
Default.args = {
  period: 'funding',
  title: 'Title',
  creator: 'User',
  date: new Date(),
  imageUrl: 'https://picsum.photos/500/300',
}
