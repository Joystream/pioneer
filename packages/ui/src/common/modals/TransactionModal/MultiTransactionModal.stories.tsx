import { Meta, Story } from '@storybook/react'
import React, { ReactNode } from 'react'
import { interpret } from 'xstate'

import { ButtonPrimary } from '../../components/buttons'
import { ModalBody, ModalFooter } from '../../components/Modal'
import { TextMedium } from '../../components/typography'
import { transactionMachine } from '../../model/machines'

import { TransactionModal } from './TransactionModal'

export default {
  title: 'Common/Modals/MultiTransactionModal',
  component: TransactionModal,
} as Meta

const Template: Story<{ children: ReactNode; state: string; steps: { title: string }[]; active: number }> = ({
  children,
  state,
  steps,
  active,
}) => {
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
    <TransactionModal service={service} onClose={() => undefined} useMultiTransaction={{ steps, active }}>
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

const steps = [
  {
    title: 'Bind account for staking',
  },
  {
    title: 'Send a proposal',
  },
]
const active = 0

export const Default = Template.bind({})
Default.args = {
  children: <StubBody />,
  state: 'start',
  steps,
  active,
}

export const Extension = Template.bind({})
Extension.args = {
  state: 'extension',
  steps,
  active,
}

export const Pending = Template.bind({})
Pending.args = {
  state: 'pending',
  steps,
  active,
}
