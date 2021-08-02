import { ApiRx } from '@polkadot/api'
import { Balance, RuntimeDispatchInfo } from '@polkadot/types/interfaces'
import { Meta, Story } from '@storybook/react'
import { useActor, useMachine } from '@xstate/react'
import BN from 'bn.js'
import React, { ReactNode } from 'react'
import { ActorRef } from 'xstate'

import { TransactionInfo } from '@/common/components/TransactionInfo'
import { useApi } from '@/common/hooks/useApi'
import { useSignAndSendTransaction } from '@/common/hooks/useSignAndSendTransaction'
import { multiTransactionMachine } from '@/common/model/machines/multiTransactionMachine'
import { ApiContext } from '@/common/providers/api/context'

import { alice, bob } from '../../../test/_mocks/keyring'
import { stubApi } from '../../../test/_mocks/transactions'

import { ButtonPrimary } from './buttons'
import { ModalBody, ModalFooter } from './Modal'
import { TransactionModal } from './TransactionModal'
import { TextMedium } from './typography'

export default {
  title: 'Common/Modals/MultiTransactionModal',
  component: TransactionModal,
} as Meta

interface Props {
  children: (step: TransactionStep, paymentInfo?: RuntimeDispatchInfo) => ReactNode
  service: ActorRef<any>
}

const MultiTransactionModal = ({ children, service }: Props) => {
  const [state] = useActor(service)

  const transactionStep = state.context.transactions[0]
  const { type, transaction, signer } = transactionStep
  const { paymentInfo, sign, isReady } = useSignAndSendTransaction({ transaction, signer, service })

  const transactionService = state.children.transactions

  if (state.matches('transactions') && transactionService) {
    return (
      <TransactionModal service={transactionService} onClose={() => undefined}>
        {children(transactionStep, paymentInfo)}
      </TransactionModal>
    )
  }

  return null
}

interface TransactionStep {
  type: string
  transaction: ApiRx
  signer: string
}

const apiStub = stubApi()

const Template: Story<{ children: ReactNode; state: string }> = () => {
  const { api } = useApi()

  const [state, send, service] = useMachine(multiTransactionMachine, {
    context: {
      transactions: [
        {
          type: 'stake',
          transaction: api?.tx.members.addStakingAccountCandidate('0'),
          signer: alice.address,
        },
        {
          type: 'addProposal',
          transaction: api?.tx.proposalsCodex.createProposal({}, { Signal: 'Choo, choo!' }),
          signer: bob.address,
        },
      ],
    },
  })

  return (
    <ApiContext.Provider value={apiStub}>
      <div>
        <h3>Modal:</h3>
        <MultiTransactionModal service={service}>
          {({ type }, paymentInfo) => {
            if (type === 'stake') {
              return <StakeStep fee={paymentInfo?.partialFee} />
            }
            if (type === 'addProposal') {
              return <ProposalStep />
            }
            return null
          }}
        </MultiTransactionModal>
        <h3>Actions:?</h3>
      </div>
    </ApiContext.Provider>
  )
}

interface StakeStepProps {
  fee?: Balance
}

const StakeStep = ({ fee }: StakeStepProps) => {
  return (
    <>
      <ModalBody>
        <TextMedium>Transaction preview here.</TextMedium>
      </ModalBody>
      <ModalFooter>
        <TransactionInfo
          title="Stake:"
          value={new BN(100)}
          tooltipText={'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'}
        />
        <TransactionInfo
          title="Transaction fee:"
          value={fee?.toBn()}
          tooltipText={'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'}
        />
        <ButtonPrimary size="medium">Sign and send</ButtonPrimary>
      </ModalFooter>
    </>
  )
}

const ProposalStep = () => <div>Proposal step</div>

export const Default = Template.bind({})
Default.args = {
  children: <StakeStep />,
}
