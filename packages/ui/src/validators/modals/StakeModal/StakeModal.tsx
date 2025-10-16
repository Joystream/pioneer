import React from 'react'

import { useApi } from '@/api/hooks/useApi'
import { ButtonPrimary } from '@/common/components/buttons'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { useModal } from '@/common/hooks/useModal'
import { Address } from '@/common/types'

import { StakeModalCall } from '@/validators/modals/StakeModal/types'

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

  const handleStake = async () => {
    if (!api) {
      console.error('API not available')
      return
    }

    try {
      // TODO: Implement actual staking transaction
      console.log('Staking with validator:', validatorAddress)
      hideModal()
    } catch (error) {
      console.error('Staking failed:', error)
    }
  }

  return (
    <Modal modalSize="m" onClose={hideModal}>
      <ModalHeader title="Stake Tokens" onClick={hideModal} />
      <ModalBody>
        <RowGapBlock gap={16}>
          <TextMedium>
            You are about to stake your tokens with this validator. Staking tokens means you are 
            locking them to support the network and potentially earn rewards.
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
        <ButtonPrimary size="medium" onClick={handleStake}>
          Stake Tokens
        </ButtonPrimary>
      </ModalFooter>
    </Modal>
  )
}
