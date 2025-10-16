import React from 'react'

import { useApi } from '@/api/hooks/useApi'
import { ButtonPrimary } from '@/common/components/buttons'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { useModal } from '@/common/hooks/useModal'
import { SubmittableExtrinsic } from '@polkadot/api/types'
import { Address } from '@/common/types'

import { StakingTransactionModalCall } from '@/validators/modals/StakingTransactionModal/types'

interface Props {
  title: string
  description: string
  transaction: SubmittableExtrinsic<'rxjs'> | null
  signer: Address
  validatorAddress: Address
}

export const StakingTransactionModal = ({ title, description, transaction, signer, validatorAddress }: Props) => {
  const { hideModal } = useModal<StakingTransactionModalCall>()
  const { api } = useApi()

  const handleTransaction = async () => {
    if (!transaction || !api) {
      console.error('Transaction or API not available')
      return
    }

    try {
      // TODO: Implement proper transaction signing and submission
      console.log(`Executing ${title} transaction for validator:`, validatorAddress)
      console.log('Transaction:', transaction)
      console.log('Signer:', signer)
      
      // For now, just show success message
      // In the actual implementation, this would:
      // 1. Sign the transaction
      // 2. Submit it to the network
      // 3. Wait for confirmation
      // 4. Show success/error states
      
      hideModal()
    } catch (error) {
      console.error('Transaction failed:', error)
    }
  }

  return (
    <Modal modalSize="m" onClose={hideModal}>
      <ModalHeader title={title} onClick={hideModal} />
      <ModalBody>
        <RowGapBlock gap={16}>
          <TextMedium>{description}</TextMedium>
          <TextMedium>
            <strong>Validator:</strong> {validatorAddress}
          </TextMedium>
          <TextMedium>
            <strong>Signer:</strong> {signer}
          </TextMedium>
          {transaction && (
            <TextMedium>
              <strong>Transaction:</strong> {transaction.method.section}.{transaction.method.method}
            </TextMedium>
          )}
        </RowGapBlock>
      </ModalBody>
      <ModalFooter>
        <ButtonPrimary size="medium" onClick={handleTransaction} disabled={!transaction}>
          Execute Transaction
        </ButtonPrimary>
      </ModalFooter>
    </Modal>
  )
}
