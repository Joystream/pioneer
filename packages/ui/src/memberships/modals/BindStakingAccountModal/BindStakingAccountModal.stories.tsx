import { Meta, Story } from '@storybook/react'
import React from 'react'
import { interpret } from 'xstate'

import { transactionMachine } from '@/common/model/machines'
import { BindStakingAccountModal } from '@/memberships/modals/BindStakingAccountModal/BindStakingAccountModal'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'

import { alice } from '../../../../test/_mocks/keyring'

export default {
  title: 'Member/Modals/BindStakingAccountModal',
  component: BindStakingAccountModal,
} as Meta

const Template: Story = () => {
  const service = interpret(transactionMachine)
  service.start()

  return (
    <MockApolloProvider>
      <BindStakingAccountModal
        service={service}
        onClose={() => undefined}
        memberId="0"
        signer={alice.address}
        transaction={undefined}
        steps={[{ title: 'Bind staking account' }, { title: 'Next transaction' }]}
      />
    </MockApolloProvider>
  )
}

export const Default = Template.bind({})
