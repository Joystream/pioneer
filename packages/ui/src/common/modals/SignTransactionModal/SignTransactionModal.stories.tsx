import { Story } from '@storybook/react'
import { useMachine } from '@xstate/react'
import React from 'react'

import {
  SignTransactionModal,
  SignTransactionModalProps,
} from '@/common/modals/SignTransactionModal/SignTransactionModal'
import { defaultTransactionModalMachine } from '@/common/model/machines/defaultTransactionModalMachine'
import { getMember } from '@/mocks/helpers'

import { stubTransaction } from '../../../../test/_mocks/transactions'

export default {
  title: 'Common/SignTransactionModal',
  component: SignTransactionModal,
}

const Template: Story<SignTransactionModalProps> = (args) => {
  const [state, send] = useMachine(defaultTransactionModalMachine())

  if (state.matches('requirementsVerification')) {
    send('PASS')
  }

  return <SignTransactionModal {...args} service={state.children['transaction']} />
}

export const Default = Template.bind({})
Default.args = {
  signer: getMember('alice').controllerAccount,
  transaction: stubTransaction({} as any, 'fakeTransaction') as any,
  buttonText: 'Sign Transaction',
  title: 'Generic sign transaction modal',
  onClose: () => undefined,
  textContent: <>Text content of sign transaction modal</>,
}
