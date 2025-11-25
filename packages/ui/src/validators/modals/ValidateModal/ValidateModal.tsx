import React, { useState, useEffect, useRef, useMemo } from 'react'

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
import { useStakingTransactions, useStakingValidation } from '@/validators/hooks/useStakingSDK'
import { ValidateModalCall } from '@/validators/modals/ValidateModal/types'

interface Props {
  validatorAddress: Address
}

export const ValidateModal = () => {
  const { modalData } = useModal<ValidateModalCall>()
  const validatorAddress = modalData?.validatorAddress

  if (!validatorAddress) return null

  return <ValidateModalInner validatorAddress={validatorAddress} />
}

const ValidateModalInner = ({ validatorAddress }: Props) => {
  const { hideModal } = useModal<ValidateModalCall>()
  const { api } = useApi()
  const { allAccounts } = useMyAccounts()
  const { validate, isConnected } = useStakingTransactions()
  const { canValidate } = useStakingValidation()

  const [commission, setCommission] = useState('5.0')
  const [blocked, setBlocked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [canValidateAccount, setCanValidateAccount] = useState<boolean | null>(null)
  const isMountedRef = useRef(true)
  const selectedAccount = useMemo(() => {
    if (!allAccounts.length) return null
    return allAccounts.find((account) => account.address === validatorAddress) ?? allAccounts[0]
  }, [allAccounts, validatorAddress])

  useEffect(() => {
    return () => {
      isMountedRef.current = false
    }
  }, [])

  useEffect(() => {
    const checkValidation = async () => {
      if (!selectedAccount?.address) {
        setCanValidateAccount(null)
        setError('No account available to submit this transaction')
        return
      }

      try {
        const canValidateResult = await canValidate(selectedAccount.address)
        setCanValidateAccount(canValidateResult)
        setError(null)
      } catch (err) {
        setError('Failed to check validation status')
      }
    }

    checkValidation()
  }, [canValidate, selectedAccount])

  const handleValidate = async () => {
    if (!api || !isConnected) {
      setError('API not connected')
      return
    }

    if (!selectedAccount?.address) {
      setError('No account available to sign the transaction')
      return
    }

    if (!commission || parseFloat(commission) < 0 || parseFloat(commission) > 100) {
      setError('Please enter a valid commission rate (0-100%)')
      return
    }

    if (canValidateAccount === false) {
      setError('This account cannot become a validator')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const validateTx = validate(parseFloat(commission), blocked)
      await validateTx.signAndSend(selectedAccount.address)

      if (isMountedRef.current) {
        setSuccess(true)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Validation failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCommissionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === '' || (!isNaN(parseFloat(value)) && parseFloat(value) >= 0 && parseFloat(value) <= 100)) {
      setCommission(value)
      setError(null)
    }
  }

  const actionDisabled =
    isLoading ||
    !commission ||
    parseFloat(commission) < 0 ||
    parseFloat(commission) > 100 ||
    canValidateAccount === false ||
    !selectedAccount ||
    canValidateAccount === null ||
    !!error

  if (success) {
    return (
      <SuccessModal
        onClose={hideModal}
        text={`Validation transaction submitted successfully! You are now a validator with ${commission}% commission.`}
      />
    )
  }

  return (
    <Modal modalSize="m" onClose={hideModal}>
      <ModalHeader title="Become Validator" onClick={hideModal} />
      <ModalBody>
        <RowGapBlock gap={16}>
          <TextMedium>
            Become a validator by setting your commission rate. You will need to bond tokens first.
          </TextMedium>

          <TextMedium>
            <strong>Account Address:</strong> {validatorAddress}
          </TextMedium>

          {canValidateAccount !== null && (
            <TextMedium>
              <strong>Can Validate:</strong> {canValidateAccount ? 'Yes' : 'No'}
            </TextMedium>
          )}

          <InputComponent label="Commission Rate (%)" required inputSize="m" id="commission-rate">
            <InputText
              id="commission-rate"
              placeholder="Enter commission rate"
              value={commission}
              onChange={handleCommissionChange}
              type="number"
              step="0.1"
              min="0"
              max="100"
            />
          </InputComponent>

          <InputComponent label="Blocked" inputSize="s" id="blocked-checkbox">
            <input
              id="blocked-checkbox"
              type="checkbox"
              checked={blocked}
              onChange={(e) => setBlocked(e.target.checked)}
            />
          </InputComponent>

          {error && (
            <TextSmall style={{ color: 'red' }}>
              <strong>Error:</strong> {error}
            </TextSmall>
          )}

          <TextSmall>
            <strong>Important:</strong> Becoming a validator requires:
            <br />• Bonded tokens
            <br />• Valid commission rate
            <br />• Good network connection
            <br />• Understanding of validator responsibilities
          </TextSmall>
        </RowGapBlock>
      </ModalBody>
      <ModalFooter>
        <ButtonSecondary size="medium" onClick={hideModal}>
          Cancel
        </ButtonSecondary>
        <ButtonPrimary size="medium" onClick={handleValidate} disabled={actionDisabled}>
          {isLoading ? 'Validating...' : 'Become Validator'}
        </ButtonPrimary>
      </ModalFooter>
    </Modal>
  )
}
