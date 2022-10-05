import { Story } from '@storybook/react'
import { useMachine } from '@xstate/react'
import React from 'react'
import { of } from 'rxjs'

import {
  SignTransactionModal,
  SignTransactionModalProps,
} from '@/common/modals/SignTransactionModal/SignTransactionModal'
import { defaultTransactionModalMachine } from '@/common/model/machines/defaultTransactionModalMachine'
import { MockApolloProvider } from '@/mocks/components/storybook/MockApolloProvider'
import { getMember } from '@/mocks/helpers'

import { createRuntimeDispatchInfo } from '../../../../test/_mocks/chainTypes'

export default {
  title: 'Common/SignTransactionModal',
  component: SignTransactionModal,
}

const Template: Story<SignTransactionModalProps> = (args) => {
  const [state, send] = useMachine(defaultTransactionModalMachine())

  if (state.matches('requirementsVerification')) {
    send('PASS')
  }

  return (
    <MockApolloProvider>
      <SignTransactionModal {...args} service={state.children['transaction']}>
        {args.children}
      </SignTransactionModal>
    </MockApolloProvider>
  )
}

export const Default = Template.bind({})
Default.args = {
  signer: getMember('alice').controllerAccount,
  transaction: {
    paymentInfo: () => of(createRuntimeDispatchInfo(25)) as any,
  } as any,
  buttonText: 'Sign Transaction',
  title: 'Generic sign transaction modal',
  children: <>Text content of sign transaction modal</>,
}
