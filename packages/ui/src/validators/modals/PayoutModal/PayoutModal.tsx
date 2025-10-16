import React from 'react'

import { useApi } from '@/api/hooks/useApi'
import { ButtonPrimary } from '@/common/components/buttons'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { useModal } from '@/common/hooks/useModal'
import { Address } from '@/common/types'

import { PayoutModalCall } from '@/validators/modals/PayoutModal/types'

interface Props {
  validatorAddress: Address
}

export const PayoutModal = () => {
  const { modalData } = useModal<PayoutModalCall>()
  const validatorAddress = modalData?.validatorAddress

  if (!validatorAddress) return null
  
  return <PayoutModalInner validatorAddress={validatorAddress} />
}

const PayoutModalInner = ({ validatorAddress }: Props) => {
  const { hideModal } = useModal<PayoutModalCall>()
  const { api } = useApi()

  const handlePayout = async () => {
    if (!api) {
      console.error('API not available')
      return
    }

    try {
      // TODO: Implement actual payout transaction
      console.log('Claiming payout from validator:', validatorAddress)
      hideModal()
    } catch (error) {
      console.error('Payout failed:', error)
    }
  }

  return (
    <Modal modalSize="m" onClose={hideModal}>
      <ModalHeader title="Claim Payout" onClick={hideModal} />
      <ModalBody>
        <RowGapBlock gap={16}>
          <TextMedium>
            You are about to claim your payout from this validator. This will transfer any earned 
            rewards to your account.
          </TextMedium>
          <TextMedium>
            <strong>Validator Address:</strong> {validatorAddress}
          </TextMedium>
          <TextMedium>
            <strong>Note:</strong> This is a preview implementation. The actual transaction will be implemented 
            in a separate PR for testing.
          </TextMedium>
        </RowGapBlock>
      </ModalBody>
      <ModalFooter>
        <ButtonPrimary size="medium" onClick={handlePayout}>
          Claim Payout
        </ButtonPrimary>
      </ModalFooter>
    </Modal>
  )
}
