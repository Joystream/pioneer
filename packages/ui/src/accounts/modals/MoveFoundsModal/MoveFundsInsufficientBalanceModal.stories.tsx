import { Meta, Story } from '@storybook/react'
import BN from 'bn.js'
import React from 'react'
import { HashRouter } from 'react-router-dom'

import { ModalContext } from '@/common/providers/modal/context'

import {
  MoveFundsInsufficientBalanceModal,
  MoveFoundsInsufficientBalanceModalProps,
} from './MoveFundsInsufficientBalanceModal'

export default {
  title: 'Accounts/MoveFundsInsufficientBalanceModal',
  component: MoveFundsInsufficientBalanceModal,
} as Meta

const Template: Story<MoveFoundsInsufficientBalanceModalProps> = (args) => {
  return (
    <>
      <HashRouter>
        <ModalContext.Provider
          value={{
            modalData: {},
            modal: 'Foo',
            hideModal: () => undefined,
            showModal: () => undefined,
          }}
        >
          <MoveFundsInsufficientBalanceModal {...args} />
        </ModalContext.Provider>
      </HashRouter>
    </>
  )
}

export const Default = Template.bind({})
Default.args = {
  requiredStake: new BN(1000),
  onClose: () => undefined,
  onManageAccountsClick: () => undefined,
}
