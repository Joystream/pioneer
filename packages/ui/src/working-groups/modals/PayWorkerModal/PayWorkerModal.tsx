import { SubmittableExtrinsic } from '@polkadot/api/types'
import BN from 'bn.js'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { SelectAccount } from '@/accounts/components/SelectAccount'
import { Account } from '@/accounts/types'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { Api } from '@/api'
import { useApi } from '@/api/hooks/useApi'
import { ButtonPrimary, ButtonSecondary } from '@/common/components/buttons'
import { FailureModal } from '@/common/components/FailureModal'
import { InputComponent, InputNumber, InputTextarea, TokenInput } from '@/common/components/forms'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { SuccessModal } from '@/common/components/SuccessModal'
import { TextMedium } from '@/common/components/typography'
import { useCurrentBlockNumber } from '@/common/hooks/useCurrentBlockNumber'
import { useMachine } from '@/common/hooks/useMachine'
import { useModal } from '@/common/hooks/useModal'
import { SignTransactionModal } from '@/common/modals/SignTransactionModal/SignTransactionModal'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { useRoleAccount } from '@/working-groups/hooks/useRoleAccount'
import { getGroup } from '@/working-groups/model/getGroup'
import { WorkerStatusToTypename } from '@/working-groups/types'

import { payWorkerMachine } from './machine'
import { PayWorkerModalCall, PaymentType } from './types'

const getTransaction = (
  api: Api,
  groupId: string,
  paymentType: PaymentType,
  accountId: string,
  amount: BN,
  rationale: string,
  perBlock?: BN,
  startingBlock?: number
): SubmittableExtrinsic<'rxjs'> | undefined => {
  const group = getGroup(api, groupId as any)
  if (!group) return undefined

  if (paymentType === 'discretionary') {
    return group.spendFromBudget(accountId, amount, rationale)
  } else {
    if (!perBlock || startingBlock === undefined) return undefined
    return group.vestedSpendFromBudget(accountId, { locked: amount, perBlock, startingBlock }, rationale)
  }
}

export const PayWorkerModal = () => {
  const { api } = useApi()
  const { hideModal, modalData } = useModal<PayWorkerModalCall>()
  const { worker } = modalData
  const { active } = useMyMemberships()
  const { allAccounts } = useMyAccounts()
  const currentBlock = useCurrentBlockNumber()
  const [state, send] = useMachine(payWorkerMachine)
  const [paymentType, setPaymentType] = useState<PaymentType | null>(null)
  const [selectedAccount, setSelectedAccount] = useState<Account | undefined>(() =>
    accountOrNamed(allAccounts, worker.rewardAccount, 'Worker reward account')
  )

  // Update selected account when accounts load or worker changes
  useEffect(() => {
    if (allAccounts.length > 0 && !selectedAccount) {
      setSelectedAccount(accountOrNamed(allAccounts, worker.rewardAccount, 'Worker reward account'))
    }
  }, [allAccounts, worker.rewardAccount, selectedAccount])
  const [amount, setAmount] = useState<BN | undefined>()
  const [rationale, setRationale] = useState<string>('')
  const [perBlock, setPerBlock] = useState<BN | undefined>()
  const [startingBlock, setStartingBlock] = useState<number | undefined>(
    currentBlock ? currentBlock.toNumber() : undefined
  )

  const { roleAccount } = useRoleAccount({
    membership: { id_eq: active?.id },
    group: { id_eq: worker.group.id },
    isLead_eq: true,
    status_json: { isTypeOf_eq: WorkerStatusToTypename.active },
  })

  if (!api || !roleAccount) {
    return null
  }

  if (state.matches('selectPaymentType')) {
    return (
      <Modal onClose={hideModal} modalSize="m">
        <ModalHeader onClick={hideModal} title="Pay Worker" />
        <ModalBody>
          <TextMedium>Select payment type:</TextMedium>
          <PaymentTypeButtons>
            <ButtonPrimary
              size="medium"
              onClick={() => {
                setPaymentType('discretionary')
                send('SELECT_TYPE', { paymentType: 'discretionary' })
              }}
            >
              Discretionary Spending (spendFromBudget)
            </ButtonPrimary>
            <ButtonSecondary
              size="medium"
              onClick={() => {
                setPaymentType('vested')
                send('SELECT_TYPE', { paymentType: 'vested' })
              }}
            >
              Vested Spending (vestedSpendFromBudget)
            </ButtonSecondary>
          </PaymentTypeButtons>
        </ModalBody>
      </Modal>
    )
  }

  if (state.matches('prepare')) {
    const isVested = paymentType === 'vested'
    const accountId = selectedAccount?.address
    const canSubmit =
      accountId &&
      amount &&
      !amount.isZero() &&
      rationale &&
      (!isVested || (perBlock && !perBlock.isZero() && startingBlock !== undefined))

    return (
      <Modal onClose={hideModal} modalSize="m">
        <ModalHeader onClick={hideModal} title={`Pay Worker - ${isVested ? 'Vested' : 'Discretionary'}`} />
        <ModalBody>
          <InputComponent label="Worker Reward Account" id="account-input" required inputSize="l">
            <SelectAccount selected={selectedAccount} onChange={setSelectedAccount} />
          </InputComponent>

          <InputComponent label="Amount (JOY)" id="amount-input" required>
            <TokenInput id="amount-input" value={amount} onChange={(_, value) => setAmount(value)} placeholder="0" />
          </InputComponent>

          {isVested && (
            <>
              <InputComponent label="Per Block (HAPI)" id="perblock-input" required>
                <TokenInput
                  id="perblock-input"
                  value={perBlock}
                  onChange={(_, value) => setPerBlock(value)}
                  placeholder="0"
                />
              </InputComponent>

              <InputComponent label="Starting Block" id="startingblock-input" required>
                <InputNumber
                  id="startingblock-input"
                  value={startingBlock !== undefined ? startingBlock.toString() : ''}
                  onChange={(_, value) => setStartingBlock(value ? Math.floor(value) : undefined)}
                  placeholder={currentBlock?.toString()}
                />
              </InputComponent>
            </>
          )}

          <InputComponent label="Rationale" id="rationale-input" required inputSize="auto">
            <InputTextarea
              id="rationale-input"
              value={rationale}
              onChange={(e) => setRationale(e.target.value)}
              placeholder="Reason for payment"
            />
          </InputComponent>
        </ModalBody>
        <ModalFooter>
          <ButtonPrimary
            size="medium"
            onClick={() => {
              if (canSubmit && accountId && amount && rationale) {
                send('DONE', {
                  paymentType: paymentType!,
                  accountId,
                  amount,
                  rationale,
                  perBlock,
                  startingBlock,
                })
              }
            }}
            disabled={!canSubmit}
          >
            Continue
          </ButtonPrimary>
        </ModalFooter>
      </Modal>
    )
  }

  if (state.matches('transaction') && state.context.accountId && state.context.amount && state.context.rationale) {
    const transaction = getTransaction(
      api,
      worker.group.id,
      state.context.paymentType!,
      state.context.accountId,
      state.context.amount,
      state.context.rationale,
      state.context.perBlock,
      state.context.startingBlock
    )

    if (!transaction) {
      return <FailureModal onClose={hideModal}>Failed to create transaction. Please try again.</FailureModal>
    }

    return (
      <SignTransactionModal
        buttonText="Sign and pay worker"
        transaction={transaction}
        signer={roleAccount}
        service={state.children.transaction}
      >
        <TextMedium>
          You are about to pay {state.context.amount.toString()} JOY to worker {worker.id} using{' '}
          {state.context.paymentType === 'discretionary' ? 'discretionary spending' : 'vested spending'}.
        </TextMedium>
      </SignTransactionModal>
    )
  }

  if (state.matches('success')) {
    return <SuccessModal onClose={hideModal} text="Worker payment transaction submitted successfully" />
  }

  if (state.matches('error')) {
    return (
      <FailureModal onClose={hideModal} events={state.context.transactionEvents}>
        There was a problem paying the worker.
      </FailureModal>
    )
  }

  return null
}

const PaymentTypeButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
`

