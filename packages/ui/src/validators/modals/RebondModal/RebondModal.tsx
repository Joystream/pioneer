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
import { Address } from '@/common/types'
import { useStakingQueries, useStakingTransactions } from '@/validators/hooks/useStakingSDK'
import { RebondModalCall } from '@/validators/modals/RebondModal/types'

interface Props {
  validatorAddress: Address
}

export const RebondModal = () => {
  const { modalData } = useModal<RebondModalCall>()
  const validatorAddress = modalData?.validatorAddress

  if (!validatorAddress) return null

  return <RebondModalInner validatorAddress={validatorAddress} />
}

const RebondModalInner = ({ validatorAddress }: Props) => {
  const { hideModal } = useModal<RebondModalCall>()
  const { api } = useApi()
  const { allAccounts } = useMyAccounts()
  const { rebond, isConnected } = useStakingTransactions()
  const { getUnbondingInfo } = useStakingQueries()

  const [amount, setAmount] = useState('')
  const [unbondingInfo, setUnbondingInfo] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const isMountedRef = useRef(true)

  useEffect(() => {
    return () => {
      isMountedRef.current = false
    }
  }, [])

  // Real SDK utility functions
  const joyToBalance = (joy: string): bigint => {
    const joyAmount = parseFloat(joy)
    return BigInt(Math.floor(joyAmount * 1_000_000_000_000))
  }

  const balanceToJoy = (balance: bigint): string => {
    const joyAmount = Number(balance) / 1_000_000_000_000
    return joyAmount.toFixed(4)
  }

  useEffect(() => {
    const loadUnbondingInfo = async () => {
      if (!allAccounts[0]?.address) return

      try {
        const info = await getUnbondingInfo(allAccounts[0].address)
        setUnbondingInfo(info)
      } catch (err) {
        setError('Failed to load unbonding info')
      }
    }

    loadUnbondingInfo()
  }, [allAccounts])

  const handleRebond = async () => {
    if (!api || !isConnected) {
      setError('API not connected')
      return
    }

    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount')
      return
    }

    const rebondAmount = joyToBalance(amount)
    if (unbondingInfo && rebondAmount > unbondingInfo.totalUnbonding) {
      setError('Amount exceeds unbonding balance')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const rebondTx = rebond(rebondAmount)
      await rebondTx.signAndSend(allAccounts[0])

      if (isMountedRef.current) {
        setSuccess(true)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Rebonding failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === '' || (!isNaN(parseFloat(value)) && parseFloat(value) >= 0)) {
      setAmount(value)
    }
  }

  const handleMaxAmount = () => {
    if (unbondingInfo) {
      setAmount(balanceToJoy(unbondingInfo.totalUnbonding))
    }
  }

  if (success) {
    return (
      <SuccessModal
        onClose={hideModal}
        text={`Rebond transaction submitted successfully! You have rebonded ${amount} JOY tokens to active staking.`}
      />
    )
  }

  return (
    <Modal modalSize="m" onClose={hideModal}>
      <ModalHeader title="Rebond Tokens" onClick={hideModal} />
      <ModalBody>
        <RowGapBlock gap={16}>
          <TextMedium>Rebond your unbonding tokens to active staking.</TextMedium>

          <TextMedium>
            <strong>Account Address:</strong> {validatorAddress}
          </TextMedium>

          {unbondingInfo && (
            <div>
              <TextMedium>
                <strong>Unbonding Info:</strong>
              </TextMedium>
              <TextSmall>Total Unbonding: {balanceToJoy(unbondingInfo.totalUnbonding)} JOY</TextSmall>
              <TextSmall>Unbonding Chunks: {unbondingInfo.chunks.length}</TextSmall>
            </div>
          )}

          <InputComponent label="Amount to Rebond (JOY)" required inputSize="m" id="rebond-amount">
            <InputText
              id="rebond-amount"
              placeholder="Enter amount to rebond"
              value={amount}
              onChange={handleAmountChange}
              type="number"
              step="0.001"
              min="0"
              // max={unbondingInfo ? balanceToJoy(unbondingInfo.totalUnbonding) : undefined}
            />
          </InputComponent>

          {unbondingInfo && (
            <ButtonSecondary size="small" onClick={handleMaxAmount}>
              Use Max Amount
            </ButtonSecondary>
          )}

          {error && (
            <TextSmall style={{ color: 'red' }}>
              <strong>Error:</strong> {error}
            </TextSmall>
          )}

          <TextSmall>
            <strong>Note:</strong> Rebonding converts your unbonding tokens back to active staking. This will restart
            the unbonding period if you decide to unbond again.
          </TextSmall>
        </RowGapBlock>
      </ModalBody>
      <ModalFooter>
        <ButtonSecondary size="medium" onClick={hideModal}>
          Cancel
        </ButtonSecondary>
        <ButtonPrimary size="medium" onClick={handleRebond} disabled={isLoading || !amount || parseFloat(amount) <= 0}>
          {isLoading ? 'Rebonding...' : 'Rebond Tokens'}
        </ButtonPrimary>
      </ModalFooter>
    </Modal>
  )
}
