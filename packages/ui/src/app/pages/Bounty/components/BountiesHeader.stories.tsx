import { Meta, Story } from '@storybook/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'

import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'

import { BountiesHeader } from './BountiesHeader'

export default {
  title: 'Bounty/BountiesPageHeader',
  component: BountiesHeader,
} as Meta

const Template: Story = () => (
  <MemoryRouter>
    <MockApolloProvider>
      <BountiesHeader />
    </MockApolloProvider>
  </MemoryRouter>
)

export const Default = Template.bind({})
