import React from 'react'

import { useApi } from '@/api/hooks/useApi'
import { ButtonPrimary } from '@/common/components/buttons'
import { InputComponent, InputText } from '@/common/components/forms'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { useModal } from '@/common/hooks/useModal'
import { Address } from '@/common/types'

import { ChangeSessionKeysModalCall } from './types'

interface Props {
  validatorAddress?: Address
}

export const ChangeSessionKeysModal = () => {
  const { modalData } = useModal<ChangeSessionKeysModalCall>()
  const validatorAddress = modalData?.validatorAddress
  
  return <ChangeSessionKeysModalInner validatorAddress={validatorAddress} />
}

const ChangeSessionKeysModalInner = ({ validatorAddress }: Props) => {
  const { hideModal } = useModal<ChangeSessionKeysModalCall>()
  const { api } = useApi()

  const handleChangeKeys = async () => {
    if (!api) {
      console.error('API not available')
      return
    }

    try {
      // TODO: Implement actual session keys change transaction
      // This would use: api.tx.session.setKeys(keys, proof)
      console.log('Changing session keys for:', validatorAddress)
      hideModal()
    } catch (error) {
      console.error('Session keys change failed:', error)
    }
  }

  return (
    <Modal modalSize="m" onClose={hideModal}>
      <ModalHeader title="Change Session Keys" onClick={hideModal} />
      <ModalBody>
        <RowGapBlock gap={16}>
          <TextMedium>
            Change your validator's session keys. Session keys are used by your validator node
            to sign blocks and participate in consensus.
          </TextMedium>
          {validatorAddress && (
            <TextMedium>
              <strong>Validator Address:</strong> {validatorAddress}
            </TextMedium>
          )}
          <InputComponent label="New Session Keys" required>
            <InputText
              id="session-keys"
              placeholder="0x..."
            />
          </InputComponent>
          <TextMedium>
            <strong>Note:</strong> This is a preview implementation. The actual transaction will be implemented 
            in a separate PR for testing.
          </TextMedium>
        </RowGapBlock>
      </ModalBody>
      <ModalFooter>
        <ButtonPrimary size="medium" onClick={handleChangeKeys}>
          Change Session Keys
        </ButtonPrimary>
      </ModalFooter>
    </Modal>
  )
}

