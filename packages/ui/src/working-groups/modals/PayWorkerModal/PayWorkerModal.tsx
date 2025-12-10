import { SubmittableExtrinsic } from '@polkadot/api/types'
import BN from 'bn.js'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { SelectAccount } from '@/accounts/components/SelectAccount'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { Account } from '@/accounts/types'
import { Api } from '@/api'
import { useApi } from '@/api/hooks/useApi'
import { ButtonPrimary, ButtonSecondary } from '@/common/components/buttons'
import { FailureModal } from '@/common/components/FailureModal'
import { InputComponent, InputText, InputTextarea, TokenInput } from '@/common/components/forms'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { SuccessModal } from '@/common/components/SuccessModal'
import { TextMedium } from '@/common/components/typography'
import { useCurrentBlockNumber } from '@/common/hooks/useCurrentBlockNumber'
import { useMachine } from '@/common/hooks/useMachine'
import { useModal } from '@/common/hooks/useModal'
import { SignTransactionModal } from '@/common/modals/SignTransactionModal/SignTransactionModal'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { useRoleAccount } from '@/working-groups/hooks/useRoleAccount'
import { useWorkingGroup } from '@/working-groups/hooks/useWorkingGroup'
import { getGroup } from '@/working-groups/model/getGroup'
import { WorkerStatusToTypename } from '@/working-groups/types'

import { payWorkerMachine } from './machine'
import { PayWorkerModalCall, PaymentType } from './types'

const MIN_STARTING_BLOCK_OFFSET = 10

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
  const [startingBlockInput, setStartingBlockInput] = useState<string>('')

  const { roleAccount, isLoading: isLoadingRoleAccount } = useRoleAccount({
    membership: { id_eq: active?.id },
    group: { id_eq: worker.group.id },
    isLead_eq: true,
    status_json: { isTypeOf_eq: WorkerStatusToTypename.active },
  })
  const { group: workingGroup, isLoading: isLoadingWorkingGroup } = useWorkingGroup({ name: worker.group.id })

  if (!api) {
    return null
  }

  // Show error if user is not a lead (only check in initial state)
  if (state.matches('selectPaymentType') && !isLoadingRoleAccount && !roleAccount) {
    return <FailureModal onClose={hideModal}>You must be a lead for this working group to pay workers.</FailureModal>
  }

  // Show loading state while checking role account (only in initial state)
  if (state.matches('selectPaymentType') && isLoadingRoleAccount) {
    return (
      <Modal onClose={hideModal} modalSize="m">
        <ModalHeader onClick={hideModal} title="Pay Worker" />
        <ModalBody>
          <TextMedium>Loading...</TextMedium>
        </ModalBody>
      </Modal>
    )
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
    // Use paymentType from machine context if available, otherwise use local state
    const currentPaymentType = state.context.paymentType || paymentType
    const isVested = currentPaymentType === 'vested'
    const accountId = selectedAccount?.address
    const minStartingBlockBn = currentBlock ? currentBlock.addn(MIN_STARTING_BLOCK_OFFSET) : undefined
    const trimmedStartingBlockInput = startingBlockInput.trim()
    const availableBudget = workingGroup?.budget
    const hasInsufficientBudget = Boolean(amount && availableBudget && amount.gt(availableBudget))
    const amountMessage = (() => {
      if (isLoadingWorkingGroup) {
        return 'Checking available budget...'
      }
      if (!availableBudget) {
        return 'Could not fetch group budget. Try again in a moment.'
      }
      if (!amount || amount.isZero()) {
        return `Available budget: ${availableBudget.div(new BN(10000000000)).toString()} JOY`
      }
      if (hasInsufficientBudget) {
        return `Amount exceeds available budget (${availableBudget.div(new BN(10000000000)).toString()} JOY).`
      }
      return `Available budget: ${availableBudget.div(new BN(10000000000)).toString()} JOY`
    })()
    const startingBlockEvaluation = (() => {
      if (!isVested) {
        return { resolved: undefined, error: undefined, info: undefined }
      }
      const baseBlock = currentBlock
      const minBlock = minStartingBlockBn

      if (!trimmedStartingBlockInput) {
        if (!minBlock) {
          return {
            resolved: undefined,
            error: 'Waiting for latest block number...',
            info: undefined,
          }
        }
        return {
          resolved: minBlock,
          error: undefined,
          info: `Will use block ${minBlock.toString()} (current block + ${MIN_STARTING_BLOCK_OFFSET}).`,
        }
      }

      const isRelative = trimmedStartingBlockInput.startsWith('+')
      const numericPart = isRelative ? trimmedStartingBlockInput.slice(1) : trimmedStartingBlockInput

      if (!/^\d+$/.test(numericPart)) {
        return {
          resolved: undefined,
          error: 'Enter a positive number or +offset',
          info: undefined,
        }
      }

      const numericBn = new BN(numericPart)
      let targetBn: BN | undefined

      if (isRelative) {
        if (!baseBlock) {
          return {
            resolved: undefined,
            error: 'Waiting for current block to handle relative value',
            info: undefined,
          }
        }
        targetBn = baseBlock.add(numericBn)
      } else {
        targetBn = numericBn
      }

      if (minBlock && targetBn.lt(minBlock)) {
        return {
          resolved: undefined,
          error: `Block must be at least ${minBlock.toString()}`,
          info: undefined,
        }
      }

      return {
        resolved: targetBn,
        error: undefined,
        info: `Will use block ${targetBn.toString()}${
          isRelative && baseBlock ? ` (current block ${baseBlock.toString()} + ${numericPart})` : ''
        }.`,
      }
    })()

    const resolvedStartingBlock = startingBlockEvaluation.resolved?.toNumber()
    const perBlockMessage = perBlock
      ? `Converted to ${perBlock.toString()} HAPI for the transaction.`
      : 'Enter the amount in JOY; it will be converted to HAPI automatically.'
    const canSubmit =
      accountId &&
      amount &&
      !amount.isZero() &&
      rationale &&
      !hasInsufficientBudget &&
      (!isVested ||
        (perBlock && !perBlock.isZero() && resolvedStartingBlock !== undefined && !startingBlockEvaluation.error))

    return (
      <Modal onClose={hideModal} modalSize="m">
        <ModalHeader onClick={hideModal} title={`Pay Worker - ${isVested ? 'Vested' : 'Discretionary'}`} />
        <ModalBody>
          <InputComponent label="Worker Reward Account" id="account-input" required inputSize="l">
            <SelectAccount selected={selectedAccount} onChange={setSelectedAccount} />
          </InputComponent>

          <InputComponent
            label="Amount (JOY)"
            id="amount-input"
            required
            message={amountMessage}
            validation={hasInsufficientBudget ? 'invalid' : undefined}
          >
            <TokenInput id="amount-input" value={amount} onChange={(_, value) => setAmount(value)} placeholder="0" />
          </InputComponent>

          {isVested && (
            <>
              <InputComponent label="Per Block" id="perblock-input" required units="JOY" message={perBlockMessage}>
                <TokenInput
                  id="perblock-input"
                  value={perBlock}
                  onChange={(_, value) => setPerBlock(value)}
                  placeholder="0"
                />
              </InputComponent>

              <InputComponent
                label="Starting Block"
                id="startingblock-input"
                required
                message={startingBlockEvaluation.error ?? startingBlockEvaluation.info}
                validation={startingBlockEvaluation.error ? 'invalid' : undefined}
              >
                <InputText
                  id="startingblock-input"
                  value={startingBlockInput}
                  onChange={(event) => setStartingBlockInput(event.target.value)}
                  placeholder={minStartingBlockBn?.toString()}
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
                send({
                  type: 'DONE',
                  form: {
                    paymentType: currentPaymentType!,
                    accountId,
                    amount,
                    rationale,
                    perBlock,
                    startingBlock: resolvedStartingBlock,
                  },
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
    // Ensure we have roleAccount before proceeding with transaction
    if (!roleAccount) {
      return (
        <FailureModal onClose={hideModal}>Unable to proceed: role account not found. Please try again.</FailureModal>
      )
    }

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
