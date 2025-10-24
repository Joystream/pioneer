import React, { useState, useEffect, useRef } from 'react'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useApi } from '@/api/hooks/useApi'
import { ButtonPrimary, ButtonSecondary } from '@/common/components/buttons'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { SuccessModal } from '@/common/components/SuccessModal'
import { TextMedium, TextSmall } from '@/common/components/typography'
import { useModal } from '@/common/hooks/useModal'
import { Address } from '@/common/types'
import { useStakingQueries, useStakingTransactions } from '@/validators/hooks/useStakingSDK'
import { RebagModalCall } from '@/validators/modals/RebagModal/types'

interface Props {
  validatorAddress: Address
}

export const RebagModal = () => {
  const { modalData } = useModal<RebagModalCall>()
  const validatorAddress = modalData?.validatorAddress

  if (!validatorAddress) return null

  return <RebagModalInner validatorAddress={validatorAddress} />
}

const RebagModalInner = ({ validatorAddress }: Props) => {
  const { hideModal } = useModal<RebagModalCall>()
  const { api } = useApi()
  const { allAccounts } = useMyAccounts()
  const { rebag, isConnected } = useStakingTransactions()
  const { getStakingInfo } = useStakingQueries()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [stakingInfo, setStakingInfo] = useState<any>(null)
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
        const info = await getStakingInfo(allAccounts[0].address)
        setStakingInfo(info)
      } catch (err) {
        setError('Failed to load staking info')
      }
    }

    loadStakingInfo()
  }, [allAccounts])

  const handleRebag = async () => {
    if (!api || !isConnected) {
      setError('API not connected')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const rebagTx = rebag(validatorAddress)
      await rebagTx.signAndSend(allAccounts[0])

      if (isMountedRef.current) {
        setSuccess(true)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Rebagging failed')
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <SuccessModal
        onClose={hideModal}
        text="Rebag transaction submitted successfully! Your account has been rebagged in the validator system."
      />
    )
  }

  return (
    <Modal modalSize="m" onClose={hideModal}>
      <ModalHeader title="Rebag Account" onClick={hideModal} />
      <ModalBody>
        <RowGapBlock gap={16}>
          <TextMedium>Rebag your account in the validator bag system for better performance.</TextMedium>

          <TextMedium>
            <strong>Account Address:</strong> {validatorAddress}
          </TextMedium>

          {stakingInfo && (
            <div>
              <TextMedium>
                <strong>Current Staking Info:</strong>
              </TextMedium>
              <TextSmall>Total Bonded: {stakingInfo.totalBonded} JOY</TextSmall>
              <TextSmall>Active Bonded: {stakingInfo.activeBonded} JOY</TextSmall>
              <TextSmall>Unbonding: {stakingInfo.unbonding} JOY</TextSmall>
            </div>
          )}

          {error && (
            <TextSmall style={{ color: 'red' }}>
              <strong>Error:</strong> {error}
            </TextSmall>
          )}

          <TextSmall>
            <strong>Note:</strong> Rebagging optimizes your account's position in the validator bag system. This can
            improve performance but may require additional fees.
          </TextSmall>
        </RowGapBlock>
      </ModalBody>
      <ModalFooter>
        <ButtonSecondary size="medium" onClick={hideModal}>
          Cancel
        </ButtonSecondary>
        <ButtonPrimary size="medium" onClick={handleRebag} disabled={isLoading}>
          {isLoading ? 'Rebagging...' : 'Rebag Account'}
        </ButtonPrimary>
      </ModalFooter>
    </Modal>
  )
}
