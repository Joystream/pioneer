import { Story } from '@storybook/react'
import { useMachine } from '@xstate/react'
import React, { useMemo } from 'react'
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

interface SignTransactionModalStoryProps extends SignTransactionModalProps {
  transactionFee: number
}

const Template: Story<SignTransactionModalStoryProps> = ({ transactionFee, ...args }) => {
  const transaction = useMemo(
    () => ({
      paymentInfo: () => of(createRuntimeDispatchInfo(transactionFee)) as any,
    }),
    [transactionFee]
  )

  const [state, send] = useMachine(defaultTransactionModalMachine())

  if (state.matches('requirementsVerification')) {
    send('PASS')
  }

  return (
    <MockApolloProvider>
      <SignTransactionModal {...args} transaction={transaction as any} service={state.children['transaction']}>
        {args.children}
      </SignTransactionModal>
    </MockApolloProvider>
  )
}

export const Default = Template.bind({})
Default.args = {
  signer: getMember('alice').controllerAccount,
  buttonText: 'Sign Transaction',
  title: 'Generic sign transaction modal',
  transactionFee: 25,
  children: 'Text content of sign transaction modal',
}
