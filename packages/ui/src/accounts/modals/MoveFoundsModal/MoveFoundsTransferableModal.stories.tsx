import { Meta, Story } from '@storybook/react'
import BN from 'bn.js'
import React from 'react'
import { HashRouter } from 'react-router-dom'

import { AccountsContext } from '@/accounts/providers/accounts/context'

import { alice, aliceStash, bob, bobStash } from '../../../../test/_mocks/keyring'

import { MoveFoundsTransferableModal, MoveFoundsTransferableModalProps } from './MoveFoundsTransferableModal'

export default {
  title: 'Accounts/MoveFoundsTransferableModal',
  component: MoveFoundsTransferableModal,
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
        hasAccounts: true,
        allAccounts: args.accounts?.map((address) => ({ address, name: 'Test' })) ?? [],
      }}
    >
      <HashRouter>
        <MoveFoundsTransferableModal {...args} />
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
  requiredStake: 1000,
  onClose: () => undefined,
  onManageAccountsClick: () => undefined,
}
