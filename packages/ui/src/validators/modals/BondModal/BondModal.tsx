import React from 'react'

import { useApi } from '@/api/hooks/useApi'
import { ButtonPrimary } from '@/common/components/buttons'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { useModal } from '@/common/hooks/useModal'
import { Address } from '@/common/types'

import { BondModalCall } from '@/validators/modals/BondModal/types'

interface Props {
  validatorAddress: Address
}

export const BondModal = () => {
  const { modalData } = useModal<BondModalCall>()
  const validatorAddress = modalData?.validatorAddress

  if (!validatorAddress) return null
  
  return <BondModalInner validatorAddress={validatorAddress} />
}

const BondModalInner = ({ validatorAddress }: Props) => {
  const { hideModal } = useModal<BondModalCall>()
  const { api } = useApi()

  const handleBond = async () => {
    if (!api) {
      console.error('API not available')
      return
    }

    try {
      // TODO: Implement actual bonding transaction
      console.log('Bonding with validator:', validatorAddress)
      hideModal()
    } catch (error) {
      console.error('Bonding failed:', error)
    }
  }

  return (
    <Modal modalSize="m" onClose={hideModal}>
      <ModalHeader title="Bond Tokens" onClick={hideModal} />
      <ModalBody>
        <RowGapBlock gap={16}>
          <TextMedium>
            You are about to bond your tokens with this validator. Bonding tokens means you are 
            committing them to support the validator's operations and potentially become a validator yourself.
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
        <ButtonPrimary size="medium" onClick={handleBond}>
          Bond Tokens
        </ButtonPrimary>
      </ModalFooter>
    </Modal>
  )
}
