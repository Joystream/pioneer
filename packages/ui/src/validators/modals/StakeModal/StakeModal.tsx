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
import { Address } from '@/common/types'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { useStakingTransactions } from '@/validators/hooks/useStakingSDK'

import { StakeModalCall } from './types'

interface Props {
  validatorAddress: Address
}

export const StakeModal = () => {
  const { modalData } = useModal<StakeModalCall>()
  const validatorAddress = modalData?.validatorAddress

  if (!validatorAddress) return null

  return <StakeModalInner validatorAddress={validatorAddress} />
}

const StakeModalInner = ({ validatorAddress }: Props) => {
  const { hideModal } = useModal<StakeModalCall>()
  const { api } = useApi()
  const { allAccounts } = useMyAccounts()
  const { active: activeMembership } = useMyMemberships()
  const { nominate } = useStakingTransactions()
  const [state, , service] = useMachine(transactionMachine)

  const transaction = useMemo(() => {
    if (!api) return undefined
    // Nominate this single validator
    return nominate([validatorAddress])
  }, [api, nominate, validatorAddress])

  // Use active membership controller account, or fallback to first account
  const signerAccount = useMemo(() => {
    if (activeMembership?.controllerAccount) {
      return allAccounts.find((acc) => acc.address === activeMembership.controllerAccount) || allAccounts[0]
    }
    return allAccounts[0]
  }, [activeMembership, allAccounts])

  const { isReady, sign, paymentInfo, canAfford } = useSignAndSendTransaction({
    transaction,
    signer: signerAccount?.address ?? '',
    service: service as any,
    skipQueryNode: true,
  })

  if (state.matches('canceled')) {
    return (
      <Modal onClose={hideModal} modalSize="m" modalHeight="m">
        <ModalHeader title="Transaction Canceled" onClick={hideModal} />
        <ModalBody>
          <TextMedium>
            The transaction was canceled. Please try again if you want to nominate this validator.
          </TextMedium>
        </ModalBody>
        <ModalTransactionFooter next={{ onClick: hideModal, label: 'Close' }} />
      </Modal>
    )
  }

  if (state.matches('error')) {
    return (
      <FailureModal onClose={hideModal} events={state.context.events}>
        There was a problem with nominating the validator
      </FailureModal>
    )
  }

  if (state.matches('success')) {
    return (
      <SuccessModal
        onClose={hideModal}
        text={`You have successfully nominated ${encodeAddress(
          validatorAddress
        )}. Your nomination will take effect in the next era.`}
      />
    )
  }

  const signDisabled = !isReady || !canAfford

  return (
    <Modal modalSize="m" modalHeight="m" onClose={hideModal}>
      <ModalHeader title="Nominate Validator" onClick={hideModal} />
      <ModalBody>
        <RowGapBlock gap={16}>
          <TextMedium>
            You are about to nominate <strong>{encodeAddress(validatorAddress)}</strong> to receive staking rewards.
          </TextMedium>

          <TextMedium>
            Nominating a validator means you are delegating your staked tokens to support this validator. You will earn{' '}
            rewards based on the validator's performance and commission rate.
          </TextMedium>

          <TextMedium>
            <strong>Note:</strong> You must have bonded tokens before you can nominate. If you haven't bonded yet,
            please use the "Bond" action first. Your nomination will take effect in the next era.
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
          label: 'Nominate Validator',
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
