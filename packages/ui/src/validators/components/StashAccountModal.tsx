import { BN } from '@polkadot/util'
import React, { useState } from 'react'
import styled from 'styled-components'

import { SelectAccount, SelectedAccount } from '@/accounts/components/SelectAccount'
import { Account } from '@/accounts/types'
import { ButtonPrimary, ButtonGhost } from '@/common/components/buttons'
import { InputComponent, InputText, TokenInput } from '@/common/components/forms'
import { Arrow } from '@/common/components/icons/ArrowIcon'
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'

interface StashAccountModalProps {
  isOpen: boolean
  onClose: () => void
  onContinue: (data: { nominatingController: any; stashAccount: any; valueBonded: BN }) => void
  onBack: () => void
}

export const StashAccountModal = ({ isOpen, onClose, onContinue, onBack }: StashAccountModalProps) => {
  const [nominatingController, setNominatingController] = useState<Account | undefined>(undefined)
  const [stashAccount, setStashAccount] = useState<Account | undefined>(undefined)
  const [valueBonded, setValueBonded] = useState(new BN(0))
  const [paymentDestination, setPaymentDestination] = useState<Account | undefined>(undefined)

  // Minimum bonding threshold: 1.6666 kJOY = 1,666,600,000,000,000 (in smallest unit)
  const MIN_BONDING_THRESHOLD = new BN('166660000')
  // const MIN_BONDING_THRESHOLD = new BN('16666000000000')

  // Validation function
  const isFormValid = () => {
    return nominatingController && stashAccount && valueBonded && valueBonded.gte(MIN_BONDING_THRESHOLD)
  }

  const getValidationError = () => {
    if (valueBonded.gt(new BN(0)) && valueBonded.lt(MIN_BONDING_THRESHOLD)) {
      return 'The bonded amount must be at least 1.6666 kJOY smallest units'
    }
    return null
  }

  const handleStashAccountChange = (account: Account | undefined) => {
    setStashAccount(account)
    if (account) {
      if (!paymentDestination) {
        setPaymentDestination(account)
      }

      const previousBondedValue = getPreviousBondedValue(account.address)
      if (previousBondedValue && previousBondedValue.gt(new BN(0))) {
        setValueBonded(previousBondedValue)
      }
    }
  }

  const getPreviousBondedValue = (accountAddress: string): BN => {
    const storedData = localStorage.getItem(`staking_${accountAddress}`)
    if (storedData) {
      const data = JSON.parse(storedData)
      return data.bondedValue || new BN(0)
    }
    return new BN(0)
  }

  if (!isOpen) return null

  return (
    <StyledModal onClose={onClose} modalSize="l">
      <ModalHeader onClick={onClose} title="Select stash account" />
      <ModalBody>
        <RowGapBlock gap={24}>
          <InputComponent
            label="Add nominating controller account"
            tooltipText="The controller account manages the nomination process"
            required
            inputSize="l"
          >
            {nominatingController ? (
              <SelectedAccount
                account={nominatingController}
                onDoubleClick={() => setNominatingController(undefined)}
              />
            ) : (
              <SelectAccount
                onChange={setNominatingController}
                selected={nominatingController}
                placeholder="Choose your nominating controller account or paste the account address"
              />
            )}
          </InputComponent>

          <InputComponent
            label="Add stash account"
            tooltipText="The stash account holds the bonded tokens"
            required
            inputSize="l"
          >
            {stashAccount ? (
              <SelectedAccount account={stashAccount} onDoubleClick={() => setStashAccount(undefined)} />
            ) : (
              <SelectAccount
                onChange={handleStashAccountChange}
                selected={stashAccount}
                placeholder="Choose your stash account or paste the account address"
              />
            )}
          </InputComponent>

          <InputComponent
            label="Value bonded"
            tooltipText="Amount of JOY tokens to bond for staking (minimum: 1.6666 kJOY)"
            required
            units="JOY"
            validation={getValidationError() ? 'invalid' : undefined}
            message={getValidationError() || undefined}
          >
            <TokenInput value={valueBonded} onChange={(_, value) => setValueBonded(value)} />
          </InputComponent>

          <InputComponent
            label="On-chain bonding duration"
            tooltipText="Duration for which tokens will be bonded (read-only)"
            required
          >
            <InputText value="28 days" disabled readOnly />
          </InputComponent>

          <InputComponent
            label="Add payment destination account"
            tooltipText="Account where staking rewards will be sent"
            inputSize="l"
          >
            {paymentDestination ? (
              <SelectedAccount account={paymentDestination} onDoubleClick={() => setPaymentDestination(undefined)} />
            ) : (
              <SelectAccount
                onChange={setPaymentDestination}
                selected={paymentDestination}
                placeholder="Choose your payment destination account"
              />
            )}
          </InputComponent>
        </RowGapBlock>
      </ModalBody>
      <ModalFooter>
        <ButtonsGroup>
          <ButtonGhost size="medium" onClick={onBack}>
            <Arrow direction="left" /> Back
          </ButtonGhost>
          <ButtonPrimary
            size="medium"
            onClick={() => onContinue({ nominatingController, stashAccount, valueBonded })}
            disabled={!isFormValid()}
          >
            Continue <Arrow direction="right" />
          </ButtonPrimary>
        </ButtonsGroup>
      </ModalFooter>
    </StyledModal>
  )
}

const ButtonsGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 8px;
`

const StyledModal = styled(Modal)`
  width: 728px;
`
