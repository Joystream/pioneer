import { Meta, Story } from '@storybook/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'

import { CouncilOverview } from './CouncilOverview'

export default {
  title: 'Overview/CouncilOverview',
  component: CouncilOverview,
} as Meta

export const Normal: Story = () => {
  return (
    <MemoryRouter>
      <MockApolloProvider members council>
        <CouncilOverview />
      </MockApolloProvider>
    </MemoryRouter>
  )
}
