import { Meta } from '@storybook/react'
import React from 'react'

import { ClaimVestingModal } from '@/accounts/modals/ClaimVestingModal/ClaimVestingModal'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'

export default {
  title: 'Accounts/ClaimVestingModal',
  component: ClaimVestingModal,
} as Meta

export const Default = () => {
  return (
    <MockApolloProvider>
      <ClaimVestingModal />
    </MockApolloProvider>
  )
}
