import React from 'react'

import { useApi } from '@/api/hooks/useApi'
import { ButtonPrimary, ButtonSecondary } from '@/common/components/buttons'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { useModal } from '@/common/hooks/useModal'
import { Address } from '@/common/types'

import { StopValidatingModalCall } from './types'

interface Props {
  validatorAddress?: Address
}

export const StopValidatingModal = () => {
  const { modalData } = useModal<StopValidatingModalCall>()
  const validatorAddress = modalData?.validatorAddress
  
  return <StopValidatingModalInner validatorAddress={validatorAddress} />
}

const StopValidatingModalInner = ({ validatorAddress }: Props) => {
  const { hideModal } = useModal<StopValidatingModalCall>()
  const { api } = useApi()

  const handleStopValidating = async () => {
    if (!api) {
      console.error('API not available')
      return
    }

    try {
      // TODO: Implement actual stop validating transaction
      // This would use: api.tx.staking.chill()
      console.log('Stopping validation for:', validatorAddress)
      hideModal()
    } catch (error) {
      console.error('Stop validating failed:', error)
    }
  }

  return (
    <Modal modalSize="m" onClose={hideModal}>
      <ModalHeader title="Stop Validating" onClick={hideModal} />
      <ModalBody>
        <RowGapBlock gap={16}>
          <TextMedium>
            <strong>Warning:</strong> You are about to stop validating. This will remove your validator
            from the active validator set in the next era.
          </TextMedium>
          {validatorAddress && (
            <TextMedium>
              <strong>Validator Address:</strong> {validatorAddress}
            </TextMedium>
          )}
          <TextMedium>
            Your bonded tokens will remain locked, but you won't participate in block production
            or earn validation rewards until you re-enable validation.
          </TextMedium>
          <TextMedium>
            <strong>Note:</strong> This is a preview implementation. The actual transaction will be implemented 
            in a separate PR for testing.
          </TextMedium>
        </RowGapBlock>
      </ModalBody>
      <ModalFooter>
        <ButtonSecondary size="medium" onClick={hideModal}>
          Cancel
        </ButtonSecondary>
        <ButtonPrimary size="medium" onClick={handleStopValidating}>
          Stop Validating
        </ButtonPrimary>
      </ModalFooter>
    </Modal>
  )
}

