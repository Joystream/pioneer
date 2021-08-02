import { Meta, Story } from '@storybook/react'
import React, { ReactNode } from 'react'
import { interpret } from 'xstate'

import { transactionMachine } from '../model/machines'

import { ButtonPrimary } from './buttons'
import { ModalBody, ModalFooter } from './Modal'
import { TransactionModal } from './TransactionModal'
import { TextMedium } from './typography'

export default {
  title: 'Common/Modals/MultiTransactionModal',
  component: TransactionModal,
} as Meta

const Template: Story<{ children: ReactNode; state: string }> = ({ children, state }) => {
  const service = interpret(transactionMachine)

  service.start()

  if (state === 'extension') {
    service.send('SIGN')
    service.send('SIGN_EXTERNAL')
  }

  if (state === 'pending') {
    service.send('SIGN')
    service.send('SIGN_EXTERNAL')
    service.send('SIGNED')
  }

  return (
    <TransactionModal service={service} onClose={() => undefined}>
      {children}
    </TransactionModal>
  )
}

const StubBody = () => {
  return (
    <>
      <ModalBody>
        <TextMedium>Transaction preview here.</TextMedium>
      </ModalBody>
      <ModalFooter>
        <ButtonPrimary size="medium">Sign and send</ButtonPrimary>
      </ModalFooter>
    </>
  )
}

export const Default = Template.bind({})
Default.args = {
  children: <StubBody />,
  state: 'start',
}

export const Extension = Template.bind({})
Extension.args = {
  state: 'extension',
}

export const Pending = Template.bind({})
Pending.args = {
  state: 'pending',
}
