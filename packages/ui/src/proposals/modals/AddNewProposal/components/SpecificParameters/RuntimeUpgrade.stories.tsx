import { Meta, Story } from '@storybook/react'
import React from 'react'

import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'

import { RuntimeUpgrade } from './RuntimeUpgrade'

export default {
  title: 'Proposals/AddNewProposalModal/RuntimeUpgrade',
  component: RuntimeUpgrade,
} as Meta

const Template: Story = () => {
  return (
    <MockApolloProvider members workingGroups>
      <RuntimeUpgrade />
    </MockApolloProvider>
  )
}

export const Default = Template.bind({})
