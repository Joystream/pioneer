import React, { useMemo } from 'react'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { encodeAddress } from '@/accounts/model/encodeAddress'
import { useApi } from '@/api/hooks/useApi'
import { ButtonSecondary } from '@/common/components/buttons'
import { FailureModal } from '@/common/components/FailureModal'
import { Modal, ModalBody, ModalHeader, ModalTransactionFooter } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { SuccessModal } from '@/common/components/SuccessModal'
import { TextMedium } from '@/common/components/typography'
import { useMachine } from '@/common/hooks/useMachine'
import { useModal } from '@/common/hooks/useModal'
import { useSignAndSendTransaction } from '@/common/hooks/useSignAndSendTransaction'
import { transactionMachine } from '@/common/model/machines'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { useStakingTransactions } from '@/validators/hooks/useStakingSDK'

import { StopStakingModalCall } from '.'

export const StopStakingModal = () => {
  const { hideModal, modalData } = useModal<StopStakingModalCall>()

  if (!modalData) {
    return null
  }

  // If already inactive, show a message that there's nothing to stop
  if (modalData.role === 'inactive') {
    return (
      <Modal modalSize="m" modalHeight="m" onClose={hideModal}>
        <ModalHeader title="Stop Staking" onClick={hideModal} />
        <ModalBody>
          <RowGapBlock gap={16}>
            <TextMedium>
              This stash <strong>{encodeAddress(modalData.stash)}</strong> is already inactive and not participating in
              staking.
            </TextMedium>
            <TextMedium>There is nothing to stop.</TextMedium>
          </RowGapBlock>
        </ModalBody>
        <ModalTransactionFooter next={{ onClick: hideModal, label: 'Close' }} />
      </Modal>
    )
  }

  return <StopStakingModalInner stash={modalData.stash} role={modalData.role} />
}

interface StopStakingModalInnerProps {
  stash: string
  role: 'validator' | 'nominator'
}

const StopStakingModalInner = ({ stash, role }: StopStakingModalInnerProps) => {
  const { hideModal } = useModal<StopStakingModalCall>()
  const { api } = useApi()
  const { allAccounts } = useMyAccounts()
  const { active: activeMembership } = useMyMemberships()
  const { chill, nominate } = useStakingTransactions()
  const [state, , service] = useMachine(transactionMachine)

  // For validators: use chill() to stop validating
  // For nominators: use nominate([]) to clear nominations
  const transaction = useMemo(() => {
    if (!api) return undefined
    if (role === 'validator') {
      return chill()
    } else {
      // Clear nominations by nominating an empty array
      return nominate([])
    }
  }, [api, role, chill, nominate])

  // Use active membership controller account, or fallback to stash account
  const signerAccount = useMemo(() => {
    if (activeMembership?.controllerAccount) {
      return allAccounts.find((acc) => acc.address === activeMembership.controllerAccount) || allAccounts[0]
    }
    return allAccounts.find((acc) => acc.address === stash) || allAccounts[0]
  }, [activeMembership, allAccounts, stash])

  const { isReady, sign, paymentInfo, canAfford } = useSignAndSendTransaction({
    transaction,
    signer: signerAccount?.address ?? '',
    service: service as any,
    skipQueryNode: true,
  })

  const roleLabel = role === 'validator' ? 'validator' : 'nominator'
  const actionLabel = role === 'validator' ? 'stop validating' : 'stop nominating'

  if (state.matches('canceled')) {
    return (
      <Modal onClose={hideModal} modalSize="s" modalHeight="s">
        <ModalHeader title="Transaction Canceled" onClick={hideModal} />
        <ModalBody>
          <TextMedium>The transaction was canceled. Please try again if you want to {actionLabel}.</TextMedium>
        </ModalBody>
        <ModalTransactionFooter next={{ onClick: hideModal, label: 'Close' }} />
      </Modal>
    )
  }

  if (state.matches('error')) {
    return (
      <FailureModal onClose={hideModal} events={state.context.events}>
        There was a problem with stopping staking
      </FailureModal>
    )
  }

  if (state.matches('success')) {
    return (
      <SuccessModal
        onClose={hideModal}
        text={`You have successfully stopped participating as a ${roleLabel}. The change will take effect in the next era.`}
      />
    )
  }

  const signDisabled = !isReady || !canAfford

  return (
    <Modal modalSize="m" modalHeight="m" onClose={hideModal}>
      <ModalHeader title={`Stop ${role === 'validator' ? 'Validating' : 'Nominating'}`} onClick={hideModal} />
      <ModalBody>
        <RowGapBlock gap={16}>
          <TextMedium>
            You are about to stop participating as a {roleLabel} for stash <strong>{encodeAddress(stash)}</strong>.
          </TextMedium>

          {role === 'validator' ? (
            <TextMedium>
              This will chill your validator, stopping it from participating in the validator set. You will stop earning
              validator rewards, but your bonded tokens will remain bonded.
            </TextMedium>
          ) : (
            <TextMedium>
              This will clear all your nominations. You will stop earning nominator rewards, but your bonded tokens will
              remain bonded.
            </TextMedium>
          )}

          <TextMedium>
            <strong>Note:</strong> The change will take effect in the next era. You can start{' '}
            {role === 'validator' ? 'validating' : 'nominating'} again at any time.
          </TextMedium>

          {!canAfford && paymentInfo?.partialFee && (
            <TextMedium style={{ color: 'red' }}>
              <strong>Error:</strong> Insufficient funds to cover transaction costs
            </TextMedium>
          )}
        </RowGapBlock>
      </ModalBody>
      <ModalTransactionFooter
        transactionFee={paymentInfo?.partialFee?.toBn()}
        next={{
          disabled: signDisabled,
          label: `Stop ${role === 'validator' ? 'Validating' : 'Nominating'}`,
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
