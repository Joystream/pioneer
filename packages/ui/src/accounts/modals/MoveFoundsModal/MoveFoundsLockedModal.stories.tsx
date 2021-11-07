import { Meta, Story } from '@storybook/react'
import BN from 'bn.js'
import React from 'react'
import { HashRouter } from 'react-router-dom'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { ModalContext } from '@/common/providers/modal/context'

import { alice, aliceStash, bob, bobStash } from '../../../../test/_mocks/keyring'

import { MoveFoundsLockedModal, MoveFoundsLockedModalProps } from './MoveFoundsLockedModal'

export default {
  title: 'Accounts/MoveFoundsLockedModal',
  component: MoveFoundsLockedModal,
} as Meta

const balanceMock = () => ({
  transferable: new BN(10_000),
  total: new BN(10_000),
  locked: new BN(10_000),
  recoverable: new BN(10_000),
  locks: [],
})

const Template: Story<MoveFoundsLockedModalProps> = (args) => {
  return (
    <>
      <HashRouter>
        <AccountsContext.Provider
          value={{
            isLoading: false,
            hasAccounts: true,
            allAccounts: [alice, aliceStash, bob, bobStash],
          }}
        >
          <ModalContext.Provider
            value={{
              modalData: {
                lockedFoundsAccounts: {
                  [alice.address]: [aliceStash, bobStash, bob],
                  [bobStash.address]: [alice, bob],
                },
              },
              modal: 'Foo',
              hideModal: () => undefined,
              showModal: () => undefined,
            }}
          >
            <MoveFoundsLockedModal {...args} />
          </ModalContext.Provider>
        </AccountsContext.Provider>
      </HashRouter>
    </>
  )
}

export const Default = Template.bind({})
Default.args = {
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
