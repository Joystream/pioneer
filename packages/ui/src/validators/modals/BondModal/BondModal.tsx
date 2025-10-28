import React, { useState, useEffect, useRef } from 'react'

import { SelectAccount } from '@/accounts/components/SelectAccount'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useApi } from '@/api/hooks/useApi'
import { ButtonPrimary, ButtonSecondary } from '@/common/components/buttons'
import { InputComponent, InputText } from '@/common/components/forms'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { SuccessModal } from '@/common/components/SuccessModal'
import { TextMedium, TextSmall } from '@/common/components/typography'
import { useModal } from '@/common/hooks/useModal'
import { useStakingTransactions } from '@/validators/hooks/useStakingSDK'
import { BondModalCall } from '@/validators/modals/BondModal/types'

export const BondModal = () => {
  const { hideModal } = useModal<BondModalCall>()
  const { api } = useApi()
  const { allAccounts } = useMyAccounts()
  const { bond, isConnected } = useStakingTransactions()

  const [amount, setAmount] = useState('')
  const [controller, setController] = useState('')
  const [payee, setPayee] = useState('Stash')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const isMountedRef = useRef(true)

  useEffect(() => {
    return () => {
      isMountedRef.current = false
    }
  }, [])

  const joyToBalance = (joy: string): bigint => BigInt(parseFloat(joy) * 1_000_000_000_000)

  const handleBond = async () => {
    if (!api || !isConnected) {
      setError('API not connected')

      return
    }

    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount')
      return
    }

    if (!controller) {
      setError('Please select a controller account')
      return
    }

    if (!allAccounts || allAccounts.length === 0) {
      setError('No accounts available')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const bondTx = bond(controller, joyToBalance(amount), payee)
      await bondTx.signAndSend(allAccounts[0])

      if (isMountedRef.current) {
        setSuccess(true)
      }
    } catch (err) {
      if (isMountedRef.current) {
        setError(err instanceof Error ? err.message : 'Bonding failed')
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

  if (success) {
    return (
      <SuccessModal
        onClose={hideModal}
        text={`Bond transaction submitted successfully! You have bonded ${amount} JOY tokens.`}
      />
    )
  }

  return (
    <Modal modalSize="m" onClose={hideModal}>
      <ModalHeader title="Bond Tokens" onClick={hideModal} />
      <ModalBody>
        <RowGapBlock gap={16}>
          <TextMedium>Bond your tokens for staking. Bonded tokens are locked and can earn rewards.</TextMedium>

          <InputComponent label="Amount to Bond (JOY)" required inputSize="m" id="bond-amount">
            <InputText
              id="bond-amount"
              placeholder="Enter amount to bond"
              value={amount}
              onChange={handleAmountChange}
              type="number"
              step="0.1"
              min="0"
            />
          </InputComponent>

          <InputComponent label="Controller Account" required inputSize="l" id="controller-account">
            <SelectAccount
              onChange={(account) => setController(account?.address || '')}
              selected={allAccounts.find((acc) => acc.address === controller)}
              placeholder="Select controller account"
            />
          </InputComponent>

          <InputComponent label="Payee" inputSize="m" id="payee">
            <InputText
              id="payee"
              placeholder="Select payee"
              value={payee}
              onChange={(e) => setPayee(e.target.value)}
              list="payee-options"
            />
            <datalist id="payee-options">
              <option value="Stash">Stash (same as controller)</option>
              <option value="Controller">Controller</option>
              <option value="Account">Specific account</option>
            </datalist>
          </InputComponent>

          {error && (
            <TextSmall style={{ color: 'red' }}>
              <strong>Error:</strong> {error}
            </TextSmall>
          )}

          <TextSmall>
            <strong>Note:</strong> This transaction will bond your tokens to the staking system. Bonded tokens are
            locked and cannot be transferred until unbonded.
          </TextSmall>
        </RowGapBlock>
      </ModalBody>
      <ModalFooter>
        <ButtonSecondary size="medium" onClick={hideModal}>
          Cancel
        </ButtonSecondary>
        <ButtonPrimary size="medium" onClick={handleBond} disabled={isLoading || !amount || !controller}>
          {isLoading ? 'Bonding...' : 'Bond Tokens'}
        </ButtonPrimary>
      </ModalFooter>
    </Modal>
  )
}
