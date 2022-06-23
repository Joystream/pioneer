import { Meta, Story } from '@storybook/react'
import BN from 'bn.js'
import React from 'react'
import { HashRouter } from 'react-router-dom'

import { AccountsContext } from '@/accounts/providers/accounts/context'

import { alice, aliceStash, bob, bobStash } from '../../../../test/_mocks/keyring'

import { MoveFundsTransferableModal, MoveFoundsTransferableModalProps } from './MoveFundsTransferableModal'

export default {
  title: 'Accounts/MoveFundsTransferableModal',
  component: MoveFundsTransferableModal,
} as Meta

const balanceMock = () => ({
  transferable: new BN(10_000),
  total: new BN(10_000),
  locked: new BN(10_000),
  recoverable: new BN(10_000),
  locks: [],
})

const Template: Story<MoveFoundsTransferableModalProps> = (args) => {
  return (
    <AccountsContext.Provider
      value={{
        isLoading: false,
        hasAccounts: true,
        allAccounts: args.accounts?.map((address) => ({ address, name: 'Test' })) ?? [],
      }}
    >
      <HashRouter>
        <MoveFundsTransferableModal {...args} />
      </HashRouter>
    </AccountsContext.Provider>
  )
}

export const Default = Template.bind({})
Default.args = {
  accounts: [alice.address, aliceStash.address, bob.address, bobStash.address],
  balances: {
    [alice.address]: balanceMock(),
    [aliceStash.address]: balanceMock(),
    [bob.address]: balanceMock(),
    [bobStash.address]: balanceMock(),
  },
  requiredStake: new BN(1000),
  onClose: () => undefined,
  onManageAccountsClick: () => undefined,
}
