import { Meta, Story } from '@storybook/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'
import { OverviewSidebar } from '@/overview/components/OverviewSidebar/OverviewSidebar'

export default {
  title: 'Overview/OverviewSidebar',
  component: OverviewSidebar,
} as Meta

export const Normal: Story = () => {
  return (
    <MemoryRouter>
      <MockApolloProvider members council forum workers workingGroups proposals blocks>
        <OverviewSidebar />
      </MockApolloProvider>
    </MemoryRouter>
  )
}
