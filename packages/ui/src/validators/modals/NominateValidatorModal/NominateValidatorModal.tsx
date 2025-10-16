import React from 'react'

import { useApi } from '@/api/hooks/useApi'
import { ButtonPrimary } from '@/common/components/buttons'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { useModal } from '@/common/hooks/useModal'
import { Address } from '@/common/types'

import { NominateValidatorModalCall } from '@/validators/modals/NominateValidatorModal/types'

interface Props {
  validatorAddress: Address
}

interface NominateValidatorModalProps {
  validatorAddress?: Address
}

export const NominateValidatorModal = () => {
  const { modalData } = useModal<NominateValidatorModalCall>()
  const validatorAddress = modalData?.validatorAddress

  if (!validatorAddress) return null
  
  return <NominateValidatorModalInner validatorAddress={validatorAddress} />
}

const NominateValidatorModalInner = ({ validatorAddress }: Props) => {
  const { hideModal } = useModal<NominateValidatorModalCall>()
  const { api } = useApi()

  const handleNominate = async () => {
    if (!api) {
      console.error('API not available')
      return
    }

    try {
      // TODO: Implement actual nomination transaction
      // This would typically involve:
      // 1. Creating a nomination transaction
      // 2. Signing it with the user's account
      // 3. Submitting to the network
      
      console.log('Nominating validator:', validatorAddress)
      
      // For now, just show the redirect modal
      hideModal()
    } catch (error) {
      console.error('Nomination failed:', error)
    }
  }

  return (
    <Modal modalSize="m" onClose={hideModal}>
      <ModalHeader title="Nominate Validator" onClick={hideModal} />
      <ModalBody>
        <RowGapBlock gap={16}>
          <TextMedium>
            You are about to nominate this validator. Nominating a validator means you want to support them 
            in the validator set and potentially earn rewards from their validation activities.
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
        <ButtonPrimary size="medium" onClick={handleNominate}>
          Nominate Validator
        </ButtonPrimary>
      </ModalFooter>
    </Modal>
  )
}
