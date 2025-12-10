import BN from 'bn.js'
import React, { useMemo, useState } from 'react'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { encodeAddress } from '@/accounts/model/encodeAddress'
import { useApi } from '@/api/hooks/useApi'
import { ButtonSecondary } from '@/common/components/buttons'
import { FailureModal } from '@/common/components/FailureModal'
import { InputComponent, InputText } from '@/common/components/forms'
import { Modal, ModalBody, ModalHeader, ModalTransactionFooter } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { SuccessModal } from '@/common/components/SuccessModal'
import { TextMedium, TextSmall, TokenValue } from '@/common/components/typography'
import { useMachine } from '@/common/hooks/useMachine'
import { useModal } from '@/common/hooks/useModal'
import { useSignAndSendTransaction } from '@/common/hooks/useSignAndSendTransaction'
import { joyStringToPlanckBigInt, planckToJoyString } from '@/common/model/joyValueFromString'
import { transactionMachine } from '@/common/model/machines'
import { useStakingTransactions } from '@/validators/hooks/useStakingSDK'

import { UnbondStakingModalCall } from '.'

export const UnbondStakingModal = () => {
  const { modalData } = useModal<UnbondStakingModalCall>()

  if (!modalData) {
    return null
  }

  return <UnbondStakingModalInner stash={modalData.stash} controller={modalData.controller} bonded={modalData.bonded} />
}

interface UnbondStakingModalInnerProps {
  stash: string
  controller?: string
  bonded: BN
}

const UnbondStakingModalInner = ({ stash, controller, bonded }: UnbondStakingModalInnerProps) => {
  const { hideModal } = useModal<UnbondStakingModalCall>()
  const { api } = useApi()
  const { allAccounts } = useMyAccounts()
  const { unbond } = useStakingTransactions()
  const [state, , service] = useMachine(transactionMachine)

  const [amount, setAmount] = useState('')

  const bondedBigInt = BigInt(bonded.toString())

  const transaction = useMemo(() => {
    if (!api || !amount || parseFloat(amount) <= 0) return undefined
    const unbondAmount = joyStringToPlanckBigInt(amount)
    if (unbondAmount > bondedBigInt) return undefined
    return unbond(unbondAmount)
  }, [api, amount, unbond, bondedBigInt])

  const signerAccount = useMemo(() => {
    if (controller) {
      return allAccounts.find((acc) => acc.address === controller) || allAccounts[0]
    }
    return allAccounts.find((acc) => acc.address === stash) || allAccounts[0]
  }, [allAccounts, controller, stash])

  const { isReady, sign, paymentInfo, canAfford } = useSignAndSendTransaction({
    transaction,
    signer: signerAccount?.address ?? '',
    service: service as any,
    skipQueryNode: true,
  })

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === '' || (!isNaN(parseFloat(value)) && parseFloat(value) >= 0)) {
      setAmount(value)
    }
  }

  const handleMaxAmount = () => {
    setAmount(planckToJoyString(bondedBigInt))
  }

  if (state.matches('canceled')) {
    return (
      <Modal onClose={hideModal} modalSize="s" modalHeight="s">
        <ModalHeader title="Transaction Canceled" onClick={hideModal} />
        <ModalBody>
          <TextMedium>The transaction was canceled. Please try again if you want to unbond your stake.</TextMedium>
        </ModalBody>
        <ModalTransactionFooter next={{ onClick: hideModal, label: 'Close' }} />
      </Modal>
    )
  }

  if (state.matches('error')) {
    return (
      <FailureModal onClose={hideModal} events={state.context.events}>
        There was a problem with unbonding your stake
      </FailureModal>
    )
  }

  if (state.matches('success')) {
    return (
      <SuccessModal
        onClose={hideModal}
        text={`You have successfully unbonded ${amount} JOY tokens. They will be available for withdrawal after the 28-day unbonding period.`}
      />
    )
  }

  const signDisabled =
    !isReady ||
    !canAfford ||
    !amount ||
    parseFloat(amount) <= 0 ||
    (parseFloat(amount) > 0 && joyStringToPlanckBigInt(amount) > bondedBigInt)

  return (
    <Modal modalSize="m" modalHeight="m" onClose={hideModal}>
      <ModalHeader title="Unbond Stake" onClick={hideModal} />
      <ModalBody>
        <RowGapBlock gap={16}>
          <TextMedium>
            Unbond your tokens from stash <strong>{encodeAddress(stash)}</strong>. Unbonded tokens will be locked for 28
            days before you can withdraw them.
          </TextMedium>

          <TextSmall>
            <strong>Bonded Balance:</strong> <TokenValue value={bonded} />
          </TextSmall>

          <InputComponent label="Amount to Unbond (JOY)" required inputSize="m" id="unbond-amount">
            <InputText
              id="unbond-amount"
              placeholder="Enter amount to unbond"
              value={amount}
              onChange={handleAmountChange}
              type="number"
              step="0.1"
              min="0"
              max={planckToJoyString(bondedBigInt)}
            />
          </InputComponent>

          <ButtonSecondary size="small" onClick={handleMaxAmount}>
            Use Max Amount
          </ButtonSecondary>

          {amount && parseFloat(amount) > 0 && joyStringToPlanckBigInt(amount) > bondedBigInt && (
            <TextSmall style={{ color: 'red' }}>
              <strong>Error:</strong> Amount exceeds bonded balance
            </TextSmall>
          )}

          {!canAfford && paymentInfo?.partialFee && (
            <TextSmall style={{ color: 'red' }}>
              <strong>Error:</strong> Insufficient funds to cover transaction costs
            </TextSmall>
          )}

          <TextSmall>
            <strong>Important:</strong> Unbonded tokens will be locked for 28 days before you can withdraw them. During{' '}
            this period, they will not earn rewards.
          </TextSmall>
        </RowGapBlock>
      </ModalBody>
      <ModalTransactionFooter
        transactionFee={paymentInfo?.partialFee?.toBn()}
        next={{
          disabled: signDisabled,
          label: 'Unbond Stake',
          onClick: sign,
        }}
      >
        <ButtonSecondary size="medium" onClick={hideModal}>
          Cancel
        </ButtonSecondary>
      </ModalTransactionFooter>
    </Modal>
  )
}
