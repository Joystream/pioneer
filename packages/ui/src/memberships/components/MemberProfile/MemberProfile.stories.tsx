import { Meta, Story } from '@storybook/react'
import React from 'react'
import { interpret } from 'xstate'

import { transactionMachine } from '@/common/model/machines'
import { ModalContext } from '@/common/providers/modal/context'
import { MemberProfile } from '@/memberships/components/MemberProfile/MemberProfile'
import { BindStakingAccountModal } from '@/memberships/modals/BindStakingAccountModal/BindStakingAccountModal'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'

export default {
  title: 'Member/MemberProfile',
  component: BindStakingAccountModal,
} as Meta

const Template: Story = () => {
  const service = interpret(transactionMachine)
  service.start()

  return (
    <MockApolloProvider members>
      <ModalContext.Provider
        value={{
          hideModal: () => undefined,
          modal: 'foo',
          showModal: () => undefined,
          modalData: {
            id: '0',
          },
        }}
      >
        <MemberProfile />
      </ModalContext.Provider>
    </MockApolloProvider>
  )
}

export const Default = Template.bind({})
