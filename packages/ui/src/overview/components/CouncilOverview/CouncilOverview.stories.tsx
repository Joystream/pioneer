import { Meta, Story } from '@storybook/react'
import React from 'react'

import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'

import { CouncilOverview } from './CouncilOverview'

export default {
  title: 'Overview/CouncilOverview',
  component: CouncilOverview,
} as Meta

export const Normal: Story = () => {
  return (
    <MockApolloProvider members council>
      <CouncilOverview />
    </MockApolloProvider>
  )
}
