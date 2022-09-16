import { Meta, Story } from '@storybook/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'

import { BuyMembershipModal } from '@/memberships/modals/BuyMembershipModal/BuyMembershipModal'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'

export default {
  title: 'Member/Modals/BuyMembershipModal',
  component: BuyMembershipModal,
} as Meta

const Template: Story = () => {
  return (
    <MemoryRouter>
      <MockApolloProvider members>
        <BuyMembershipModal />
      </MockApolloProvider>
    </MemoryRouter>
  )
}

export const Default = Template.bind({})
