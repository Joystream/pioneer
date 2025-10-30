import { Meta, Story } from '@storybook/react'
import React from 'react'

import { MockApolloProvider } from '../../mocks/components/storybook/MockApolloProvider'

import { BountiesHeader } from './BountiesHeader'

export default {
  title: 'Bounty/BountiesPageHeader',
  component: BountiesHeader,
} as Meta

const Template: Story = () => (
  <MockApolloProvider>
    <BountiesHeader />
  </MockApolloProvider>
)

export const Default = Template.bind({})
