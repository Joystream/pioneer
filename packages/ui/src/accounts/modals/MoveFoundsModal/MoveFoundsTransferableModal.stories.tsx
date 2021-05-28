import { Meta, Story } from '@storybook/react'
import BN from 'bn.js'
import React from 'react'
import { HashRouter } from 'react-router-dom'

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
    <>
      <HashRouter>
        <MoveFoundsTransferableModal {...args} />
      </HashRouter>
    </>
  )
}

export const Default = Template.bind({})
Default.args = {
  accounts: [alice, aliceStash, bob, bobStash],
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
