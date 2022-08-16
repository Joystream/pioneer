import { Meta, Story } from '@storybook/react'
import React from 'react'

import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'

import { WorkingGroupsOverview } from './WorkingGroupsOverview'

export default {
  title: 'Overview/WorkingGroupsOverview',
  component: WorkingGroupsOverview,
} as Meta

export const Default: Story = () => {
  return (
    <MockApolloProvider members workers workingGroups>
      <WorkingGroupsOverview />
    </MockApolloProvider>
  )
}
