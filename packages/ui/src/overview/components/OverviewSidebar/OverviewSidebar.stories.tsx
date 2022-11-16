import { Meta, Story } from '@storybook/react'
import React from 'react'

import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'
import { OverviewSidebar } from '@/overview/components/OverviewSidebar/OverviewSidebar'

export default {
  title: 'Overview/OverviewSidebar',
  component: OverviewSidebar,
} as Meta

export const Normal: Story = () => {
  return (
    <MockApolloProvider members council forum workers workingGroups proposals blocks>
      <OverviewSidebar />
    </MockApolloProvider>
  )
}
