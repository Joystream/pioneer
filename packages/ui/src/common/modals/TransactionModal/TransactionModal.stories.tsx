import { Meta, Story } from '@storybook/react'
import React, { ReactNode } from 'react'
import { interpret } from 'xstate'

import { ButtonPrimary } from '../../components/buttons'
import { ModalBody, ModalFooter } from '../../components/Modal'
import { TextMedium } from '../../components/typography'
import { transactionMachine } from '../../model/machines'

import { TransactionModal } from './TransactionModal'

export default {
  title: 'Common/Modals/TransactionModal',
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
        <ButtonPrimary size="medium">Sign and Send</ButtonPrimary>
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
