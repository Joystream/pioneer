import React from 'react'

import { useApi } from '@/api/hooks/useApi'
import { ButtonPrimary } from '@/common/components/buttons'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { useModal } from '@/common/hooks/useModal'
import { Address } from '@/common/types'

import { UnbondModalCall } from '@/validators/modals/UnbondModal/types'

interface Props {
  validatorAddress: Address
}

export const UnbondModal = () => {
  const { modalData } = useModal<UnbondModalCall>()
  const validatorAddress = modalData?.validatorAddress

  if (!validatorAddress) return null
  
  return <UnbondModalInner validatorAddress={validatorAddress} />
}

const UnbondModalInner = ({ validatorAddress }: Props) => {
  const { hideModal } = useModal<UnbondModalCall>()
  const { api } = useApi()

  const handleUnbond = async () => {
    if (!api) {
      console.error('API not available')
      return
    }

    try {
      // TODO: Implement actual unbonding transaction
      console.log('Unbonding from validator:', validatorAddress)
      hideModal()
    } catch (error) {
      console.error('Unbonding failed:', error)
    }
  }

  return (
    <Modal modalSize="m" onClose={hideModal}>
      <ModalHeader title="Unbond Tokens" onClick={hideModal} />
      <ModalBody>
        <RowGapBlock gap={16}>
          <TextMedium>
            You are about to unbond your tokens from this validator. Unbonding tokens means you are 
            requesting to withdraw your staked tokens, but they may be subject to an unbonding period.
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
        <ButtonPrimary size="medium" onClick={handleUnbond}>
          Unbond Tokens
        </ButtonPrimary>
      </ModalFooter>
    </Modal>
  )
}
