import React, { useState, useEffect, useRef } from 'react'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useApi } from '@/api/hooks/useApi'
import { ButtonPrimary, ButtonSecondary } from '@/common/components/buttons'
import { InputComponent, InputText } from '@/common/components/forms'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { SuccessModal } from '@/common/components/SuccessModal'
import { TextMedium, TextSmall } from '@/common/components/typography'
import { useModal } from '@/common/hooks/useModal'
import { joyStringToPlanckBigInt, planckToJoyString } from '@/common/model/joyValueFromString'
import { Address } from '@/common/types'
import { useStakingQueries, useStakingTransactions } from '@/validators/hooks/useStakingSDK'
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
  const { allAccounts } = useMyAccounts()
  const { unbond, isConnected } = useStakingTransactions()
  const { getStakingInfo } = useStakingQueries()

  const [amount, setAmount] = useState('')
  const [maxBonded, setMaxBonded] = useState<bigint>(BigInt(0))
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
    const loadStakingInfo = async () => {
      if (!allAccounts[0]?.address) return

      try {
        const stakingInfo = await getStakingInfo(allAccounts[0].address)
        if (isMountedRef.current) {
          setMaxBonded(stakingInfo.activeBonded)
        }
      } catch (err) {
        setError('Failed to load staking info')
      }
    }

    loadStakingInfo()
  }, [allAccounts])

  const handleUnbond = async () => {
    if (!api || !isConnected) {
      setError('API not connected')
      return
    }

    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount')
      return
    }

    const unbondAmount = joyStringToPlanckBigInt(amount)
    if (unbondAmount > maxBonded) {
      setError('Amount exceeds bonded balance')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const unbondTx = unbond(unbondAmount)
      await unbondTx.signAndSend(allAccounts[0])

      if (isMountedRef.current) {
        setSuccess(true)
      }
    } catch (err) {
      if (isMountedRef.current) {
        setError(err instanceof Error ? err.message : 'Unbonding failed')
      }
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false)
      }
    }
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === '' || (!isNaN(parseFloat(value)) && parseFloat(value) >= 0)) {
      setAmount(value)
    }
  }

  const handleMaxAmount = () => {
    setAmount(planckToJoyString(maxBonded))
  }

  if (success) {
    return (
      <SuccessModal
        onClose={hideModal}
        text={`Unbond transaction submitted successfully! You have unbonded ${amount} JOY tokens. They will be available for withdrawal after 28 days.`}
      />
    )
  }

  return (
    <Modal modalSize="m" onClose={hideModal}>
      <ModalHeader title="Unbond Tokens" onClick={hideModal} />
      <ModalBody>
        <RowGapBlock gap={16}>
          <TextMedium>
            Unbond your tokens. They will be subject to a 28-day unbonding period before withdrawal.
          </TextMedium>

          <TextMedium>
            <strong>Validator Address:</strong> {validatorAddress}
          </TextMedium>

          <TextMedium>
            <strong>Bonded Balance:</strong> {planckToJoyString(maxBonded)} JOY
          </TextMedium>

          <InputComponent label="Amount to Unbond (JOY)" required inputSize="m" id="unbond-amount">
            <InputText
              id="unbond-amount"
              placeholder="Enter amount to unbond"
              value={amount}
              onChange={handleAmountChange}
              type="number"
              step="0.1"
              min="0"
              max={planckToJoyString(maxBonded)}
            />
          </InputComponent>

          <ButtonSecondary size="small" onClick={handleMaxAmount}>
            Use Max Amount
          </ButtonSecondary>

          {error && (
            <TextSmall style={{ color: 'red' }}>
              <strong>Error:</strong> {error}
            </TextSmall>
          )}

          <TextSmall>
            <strong>Important:</strong> Unbonded tokens will be locked for 28 days before you can withdraw them. During{' '}
            this period, they will not earn rewards.
          </TextSmall>
        </RowGapBlock>
      </ModalBody>
      <ModalFooter>
        <ButtonSecondary size="medium" onClick={hideModal}>
          Cancel
        </ButtonSecondary>
        <ButtonPrimary size="medium" onClick={handleUnbond} disabled={isLoading || !amount || parseFloat(amount) <= 0}>
          {isLoading ? 'Unbonding...' : 'Unbond Tokens'}
        </ButtonPrimary>
      </ModalFooter>
    </Modal>
  )
}
