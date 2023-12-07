import { Meta, Story } from '@storybook/react'
import React from 'react'

import { ModalContext } from '@/common/providers/modal/context'
import { EmailSubscriptionModal } from '@/memberships/modals/EmailSubscriptionModal/EmailSubscriptionModal'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'

export default {
  title: 'Member/Modals/EmailSubscriptionModal',
  component: EmailSubscriptionModal,
  member: {},
} as Meta

const Template: Story = () => {
  return (
    <MockApolloProvider members>
      <ModalContext.Provider
        value={{
          hideModal: () => undefined,
          modal: 'foo',
          showModal: () => undefined,
          modalData: {
            member: {
              id: '0',
              name: 'Alice member',
              controllerAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
            },
          },
        }}
      >
        <EmailSubscriptionModal />
      </ModalContext.Provider>
    </MockApolloProvider>
  )
}

export const Default = Template.bind({})
