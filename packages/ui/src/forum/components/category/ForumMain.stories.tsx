import { Meta, Story } from '@storybook/react'
import React from 'react'

import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'

import { ForumMain } from './ForumMain'

export default {
  title: 'Forum/ForumMain',
  component: ForumMain,
} as Meta

const Template: Story = (args) => {
  return (
    <MockApolloProvider members workers forum>
      <ForumMain {...args} />
    </MockApolloProvider>
  )
}

export const Default = Template.bind({})
Default.args = {
  isArchive: false,
}
