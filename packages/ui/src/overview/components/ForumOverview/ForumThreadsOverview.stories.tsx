import { Meta, Story } from '@storybook/react'
import React from 'react'

import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'

import { ForumThreadsOverview } from './ForumThreadsOverview'

export default {
  title: 'Overview/ForumThreadsOverview',
  component: ForumThreadsOverview,
} as Meta

export const Default: Story = () => {
  return (
    <MockApolloProvider members workers forum>
      <ForumThreadsOverview />
    </MockApolloProvider>
  )
}
