import React, { useState, useEffect, useRef } from 'react'

import { SelectAccount } from '@/accounts/components/SelectAccount'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { Account } from '@/accounts/types'
import { useApi } from '@/api/hooks/useApi'
import { ButtonPrimary, ButtonSecondary } from '@/common/components/buttons'
import { InputComponent, InputText } from '@/common/components/forms'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { SuccessModal } from '@/common/components/SuccessModal'
import { TextMedium, TextSmall } from '@/common/components/typography'
import { useModal } from '@/common/hooks/useModal'
import { Address } from '@/common/types'
import { useStakingQueries, useStakingTransactions } from '@/validators/hooks/useStakingSDK'
import { PayoutModalCall } from '@/validators/modals/PayoutModal/types'

interface Props {
  validatorAddress?: Address
}

export const PayoutModal = () => {
  const { modalData } = useModal<PayoutModalCall>()
  const validatorAddress = (modalData as { validatorAddress?: string })?.validatorAddress

  return <PayoutModalInner validatorAddress={validatorAddress} />
}

const PayoutModalInner = ({ validatorAddress: initialValidatorAddress }: Props) => {
  const { hideModal } = useModal<PayoutModalCall>()
  const { api } = useApi()
  const { allAccounts } = useMyAccounts()
  const { payoutStakers, isConnected } = useStakingTransactions()
  const { getStakingRewards } = useStakingQueries()

  const [validatorAccount, setValidatorAccount] = useState<Account | undefined>(
    initialValidatorAddress ? ({ address: initialValidatorAddress } as Account) : undefined
  )
  const [era, setEra] = useState('1')
  const [availableRewards, setAvailableRewards] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const isMountedRef = useRef(true)

  useEffect(() => {
    return () => {
      isMountedRef.current = false
    }
  }, [])

  useEffect(() => {
    const loadRewards = async () => {
      if (!allAccounts[0]?.address) return

      try {
        const rewards = await getStakingRewards(allAccounts[0].address)
        if (isMountedRef.current) {
          setAvailableRewards(rewards)
        }
      } catch (err) {
        if (isMountedRef.current) {
          setError('Failed to load rewards')
        }
      }
    }

    loadRewards()
  }, [allAccounts])

  const handlePayout = async () => {
    if (!api || !isConnected) {
      setError('API not connected')
      return
    }

    if (!allAccounts[0]?.address) {
      setError('No account selected')
      return
    }

    if (!validatorAccount?.address) {
      setError('Please select a validator address')
      return
    }

    const eraNumber = parseInt(era)
    if (!era || isNaN(eraNumber) || eraNumber <= 0) {
      setError('Please enter a valid era number')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Validate payoutStakers function exists
      if (typeof payoutStakers !== 'function') {
        throw new Error('Payout function not available')
      }

      const payoutTx = payoutStakers(validatorAccount.address, eraNumber)

      if (!payoutTx || typeof payoutTx.signAndSend !== 'function') {
        throw new Error('Invalid transaction object')
      }

      await payoutTx.signAndSend(allAccounts[0])

      if (isMountedRef.current) {
        setSuccess(true)
      }
    } catch (err) {
      if (isMountedRef.current) {
        setError(err instanceof Error ? err.message : 'Payout failed')
      }
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false)
      }
    }
  }

  const handleEraChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === '' || (!isNaN(parseInt(value)) && parseInt(value) > 0)) {
      setEra(value)
    }
  }

  if (success) {
    return (
      <SuccessModal
        onClose={hideModal}
        text={`Payout transaction submitted successfully! Rewards for era ${era} will be processed.`}
      />
    )
  }

  return (
    <Modal modalSize="m" onClose={hideModal}>
      <ModalHeader title="Payout Rewards" onClick={hideModal} />
      <ModalBody>
        <RowGapBlock gap={16}>
          <TextMedium>Claim earned rewards from a validator for previous eras.</TextMedium>

          <InputComponent label="Validator Address" required inputSize="l" id="validator-address">
            <SelectAccount
              onChange={setValidatorAccount}
              selected={validatorAccount}
              placeholder="Select or paste validator address"
            />
          </InputComponent>

          <InputComponent label="Era to Payout" required inputSize="m" id="payout-era">
            <InputText
              id="payout-era"
              placeholder="Enter era number"
              value={era}
              onChange={handleEraChange}
              type="number"
              min="1"
            />
          </InputComponent>

          {availableRewards.length > 0 && (
            <div>
              <TextMedium>
                <strong>Available Rewards:</strong>
              </TextMedium>
              <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {availableRewards.map((reward, index) => (
                  <div
                    key={index}
                    style={{
                      padding: '8px',
                      border: '1px solid #ccc',
                      margin: '4px 0',
                      borderRadius: '4px',
                    }}
                  >
                    <TextSmall>Era: {reward.era}</TextSmall>
                    <TextSmall>Amount: {reward.amount} JOY</TextSmall>
                  </div>
                ))}
              </div>
            </div>
          )}

          {error && (
            <TextSmall style={{ color: 'red' }}>
              <strong>Error:</strong> {error}
            </TextSmall>
          )}

          <TextSmall>
            <strong>Note:</strong> You can only payout rewards for eras that have ended. Rewards are calculated based on
            your nominations and the validator's performance.
          </TextSmall>
        </RowGapBlock>
      </ModalBody>
      <ModalFooter>
        <ButtonSecondary size="medium" onClick={hideModal}>
          Cancel
        </ButtonSecondary>
        <ButtonPrimary
          size="medium"
          onClick={handlePayout}
          disabled={
            isLoading ||
            !validatorAccount?.address ||
            !era ||
            isNaN(parseInt(era)) ||
            parseInt(era) <= 0 ||
            !allAccounts[0]?.address
          }
        >
          {isLoading ? 'Paying out...' : 'Payout Rewards'}
        </ButtonPrimary>
      </ModalFooter>
    </Modal>
  )
}
