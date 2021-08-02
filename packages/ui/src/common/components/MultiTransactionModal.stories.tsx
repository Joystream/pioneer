import { Meta, Story } from '@storybook/react'
import { useActor } from '@xstate/react'
import React, { ReactNode, useState } from 'react'
import { ActorRef, interpret } from 'xstate'

import { useBalance } from '@/accounts/hooks/useBalance'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { useApi } from '@/common/hooks/useApi'
import { useSignAndSendTransaction } from '@/common/hooks/useSignAndSendTransaction'
import { multiTransaction } from '@/common/model/machines/multiTransaction'
import { ApiContext } from '@/common/providers/api/context'

import { stubApi } from '../../../test/_mocks/transactions'
import { transactionMachine } from '../model/machines'

import { ButtonPrimary } from './buttons'
import { ModalBody, ModalFooter } from './Modal'
import { TransactionModal } from './TransactionModal'
import { TextMedium } from './typography'

export default {
  title: 'Common/Modals/MultiTransactionModal',
  component: TransactionModal,
} as Meta

interface Props {
  children: ReactNode
  service: ActorRef<any>
}

const MultiTransactionModal = ({ children, service }: Props) => {
  const [state] = useActor(service)

  const { type, transaction, signer } = state.context.transactions[0]
  const { paymentInfo, sign, isReady } = useSignAndSendTransaction({ transaction, signer, service })

  if (state.matches('transactions')) {
    return (
      <TransactionModal service={service} onClose={() => undefined}>
        {children}
      </TransactionModal>
    )
  }

  return null
}

const api = stubApi()

const Template: Story<{ children: ReactNode; state: string }> = ({ children }) => {
  const { api } = useApi()

  const service = interpret(multiTransaction, {
    context: {
      transactions: [
        {
          type: 'stake',
          transaction: api?.tx.members.addStakingAccountCandidate('0'),
          signer: 'ALICE', // TODO
        },
        {
          type: 'addProposal',
          transaction: api?.tx.proposalsCodex.createProposal({}, { Signal: 'Choo, choo!' }),
          signer: 'BOB', // TODO
        },
      ],
    },
  })

  service.start()

  return (
    <div>
      <h3>Modal:</h3>
      <MultiTransactionModal service={service}>{children}</MultiTransactionModal>
      <h3>Actions:?</h3>
    </div>
  )
}

const StubBody = () => {
  return (
    <ApiContext.Provider value={api}>
      <ModalBody>
        <TextMedium>Transaction preview here.</TextMedium>
      </ModalBody>
      <ModalFooter>
        <ButtonPrimary size="medium">Sign and send</ButtonPrimary>
      </ModalFooter>
    </ApiContext.Provider>
  )
}

export const Default = Template.bind({})
Default.args = {
  children: <StubBody />,
}
