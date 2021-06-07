import { Meta, Story } from '@storybook/react'
import React from 'react'
import { HashRouter } from 'react-router-dom'

import { ModalContext } from '@/common/providers/modal/context'

import {
  MoveFoundsInsufficientBalanceModal,
  MoveFoundsInsufficientBalanceModalProps,
} from './MoveFoundsInsufficientBalanceModal'

export default {
  title: 'Accounts/MoveFoundsInsufficientBalanceModal',
  component: MoveFoundsInsufficientBalanceModal,
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
          <MoveFoundsInsufficientBalanceModal {...args} />
        </ModalContext.Provider>
      </HashRouter>
    </>
  )
}

export const Default = Template.bind({})
Default.args = {
  requiredStake: 1000,
  onClose: () => undefined,
  onManageAccountsClick: () => undefined,
}
