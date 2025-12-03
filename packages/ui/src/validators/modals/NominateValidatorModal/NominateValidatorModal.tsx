import React, { useState, useEffect } from 'react'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useApi } from '@/api/hooks/useApi'
import { ButtonPrimary, ButtonSecondary } from '@/common/components/buttons'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium, TextSmall } from '@/common/components/typography'
import { useModal } from '@/common/hooks/useModal'
import { Address } from '@/common/types'
import { useStakingQueries, useStakingTransactions } from '@/validators/hooks/useStakingSDK'
import { NominateValidatorModalCall } from '@/validators/modals/NominateValidatorModal/types'

interface Props {
  validatorAddress: Address
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
  const { allAccounts } = useMyAccounts()
  const { nominate, isConnected } = useStakingTransactions()
  const { getValidators } = useStakingQueries()

  const [selectedValidators, setSelectedValidators] = useState<string[]>([validatorAddress])
  const [availableValidators, setAvailableValidators] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadValidators = async () => {
      try {
        const validators = await getValidators()
        setAvailableValidators(validators)
      } catch (err) {
        setError('Failed to load validators')
      }
    }

    loadValidators()
  }, [getValidators])

  const handleNominate = async () => {
    if (!api || !isConnected) {
      setError('API not connected')
      return
    }

    if (selectedValidators.length === 0) {
      setError('Please select at least one validator')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const nominateTx = nominate(selectedValidators)

      await nominateTx.signAndSend(allAccounts[0])

      hideModal()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Nomination failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleValidatorToggle = (validatorAddress: string) => {
    setSelectedValidators((prev) => {
      if (prev.includes(validatorAddress)) {
        return prev.filter((addr) => addr !== validatorAddress)
      } else {
        return [...prev, validatorAddress]
      }
    })
  }

  return (
    <Modal modalSize="l" onClose={hideModal}>
      <ModalHeader title="Nominate Validators" onClick={hideModal} />
      <ModalBody>
        <RowGapBlock gap={16}>
          <TextMedium>
            Nominate validators to receive rewards. You can change nominations each era without unbonding.
          </TextMedium>

          <TextMedium>
            <strong>Selected Validators:</strong> {selectedValidators.length}
          </TextMedium>

          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {availableValidators.map((validator) => (
              <div
                key={validator.account}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '8px',
                  border: '1px solid #ccc',
                  margin: '4px 0',
                  borderRadius: '4px',
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedValidators.includes(validator.account)}
                  onChange={() => handleValidatorToggle(validator.account)}
                  style={{ marginRight: '8px' }}
                />
                <div>
                  <TextMedium>{validator.account}</TextMedium>
                  <TextSmall>Commission: {validator.commission}%</TextSmall>
                </div>
              </div>
            ))}
          </div>

          {error && (
            <TextSmall style={{ color: 'red' }}>
              <strong>Error:</strong> {error}
            </TextSmall>
          )}

          <TextSmall>
            <strong>Note:</strong> You can nominate up to 16 validators. Your nominations will take effect in the next
            era.
          </TextSmall>
        </RowGapBlock>
      </ModalBody>
      <ModalFooter>
        <ButtonSecondary size="medium" onClick={hideModal}>
          Cancel
        </ButtonSecondary>
        <ButtonPrimary size="medium" onClick={handleNominate} disabled={isLoading || selectedValidators.length === 0}>
          {isLoading ? 'Nominating...' : 'Nominate Validators'}
        </ButtonPrimary>
      </ModalFooter>
    </Modal>
  )
}
