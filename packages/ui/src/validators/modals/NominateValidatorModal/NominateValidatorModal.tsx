import React, { useState, useEffect } from 'react'

import { useApi } from '@/api/hooks/useApi'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { ButtonPrimary, ButtonSecondary } from '@/common/components/buttons'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium, TextSmall } from '@/common/components/typography'
import { useModal } from '@/common/hooks/useModal'
import { Address } from '@/common/types'
import { CheckboxIcon } from '@/common/components/icons'
import { Colors } from '@/common/constants'
import styled from 'styled-components'

import { NominateValidatorModalCall } from '@/validators/modals/NominateValidatorModal/types'

interface BondedAccount {
  address: Address
  bondedAmount: string
  isSelected: boolean
}

interface Props {
  validatorAddresses: Address[]
}

export const NominateValidatorModal = () => {
  const { modalData } = useModal<NominateValidatorModalCall>()
  const validatorAddress = modalData?.validatorAddress
  const validatorAddresses = modalData?.validatorAddresses

  // Support both single and multiple validator addresses
  const addresses = validatorAddresses || (validatorAddress ? [validatorAddress] : [])

  if (addresses.length === 0) return null
  
  return <NominateValidatorModalInner validatorAddresses={addresses} />
}

const NominateValidatorModalInner = ({ validatorAddresses }: Props) => {
  const { hideModal } = useModal<NominateValidatorModalCall>()
  const { api } = useApi()
  const { allAccounts } = useMyAccounts()
  const [bondedAccounts, setBondedAccounts] = useState<BondedAccount[]>([])
  const [selectedBondedAccount, setSelectedBondedAccount] = useState<Address | null>(null)

  // Simulate fetching bonded accounts (in real implementation, this would query the blockchain)
  useEffect(() => {
    // Mock bonded accounts - in real implementation, query staking.ledger for each account
    const mockBondedAccounts: BondedAccount[] = allAccounts
      .filter(account => account.name?.includes('bonded') || Math.random() > 0.7) // Mock filter
      .map(account => ({
        address: account.address,
        bondedAmount: (Math.random() * 10000).toFixed(2),
        isSelected: false
      }))

    setBondedAccounts(mockBondedAccounts)
    if (mockBondedAccounts.length > 0) {
      setSelectedBondedAccount(mockBondedAccounts[0].address)
    }
  }, [allAccounts])

  const handleBondedAccountSelection = (address: Address) => {
    setSelectedBondedAccount(address)
  }

  const handleNominate = async () => {
    if (!api || !selectedBondedAccount) {
      console.error('API not available or no account selected')
      return
    }

    try {
      // TODO: Implement actual nomination transaction
      // This would typically involve:
      // 1. Creating a nomination transaction with multiple validators
      // 2. Signing it with the selected bonded account
      // 3. Submitting to the network
      
      console.log('Nominating validators:', validatorAddresses)
      console.log('Using bonded account:', selectedBondedAccount)
      
      // For now, just show the redirect modal
      hideModal()
    } catch (error) {
      console.error('Nomination failed:', error)
    }
  }

  const isMultipleValidators = validatorAddresses.length > 1

  return (
    <Modal modalSize="l" onClose={hideModal}>
      <ModalHeader 
        title={isMultipleValidators ? `Nominate ${validatorAddresses.length} Validators` : "Nominate Validator"} 
        onClick={hideModal} 
      />
      <ModalBody>
        <RowGapBlock gap={16}>
          <TextMedium>
            {isMultipleValidators 
              ? `You are about to nominate ${validatorAddresses.length} validators. Nominating validators means you want to support them in the validator set and potentially earn rewards from their validation activities.`
              : "You are about to nominate this validator. Nominating a validator means you want to support them in the validator set and potentially earn rewards from their validation activities."
            }
          </TextMedium>
          
          <ValidatorsList>
            <TextMedium><strong>Validators to nominate:</strong></TextMedium>
            {validatorAddresses.map((address, index) => (
              <ValidatorItem key={address}>
                <TextSmall>{index + 1}. {address}</TextSmall>
              </ValidatorItem>
            ))}
          </ValidatorsList>

          {bondedAccounts.length > 0 && (
            <BondedAccountsSection>
              <TextMedium><strong>Select bonded account:</strong></TextMedium>
              <BondedAccountsList>
                {bondedAccounts.map((account) => (
                  <BondedAccountItem 
                    key={account.address}
                    isSelected={selectedBondedAccount === account.address}
                    onClick={() => handleBondedAccountSelection(account.address)}
                  >
                    <CheckboxWrapper>
                      <CheckboxInput
                        type="radio"
                        name="bondedAccount"
                        checked={selectedBondedAccount === account.address}
                        onChange={() => handleBondedAccountSelection(account.address)}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <CheckboxIcon />
                    </CheckboxWrapper>
                    <AccountInfo>
                      <TextSmall><strong>{account.address}</strong></TextSmall>
                      <TextSmall>Bonded: {account.bondedAmount} JOY</TextSmall>
                    </AccountInfo>
                  </BondedAccountItem>
                ))}
              </BondedAccountsList>
            </BondedAccountsSection>
          )}

          <TextMedium>
            <strong>Note:</strong> This is a preview implementation. The actual transaction will be implemented 
            in a separate PR for testing.
          </TextMedium>
        </RowGapBlock>
      </ModalBody>
      <ModalFooter>
        <ButtonSecondary size="medium" onClick={hideModal}>
          Cancel
        </ButtonSecondary>
        <ButtonPrimary 
          size="medium" 
          onClick={handleNominate}
          disabled={!selectedBondedAccount}
        >
          {isMultipleValidators ? `Nominate ${validatorAddresses.length} Validators` : 'Nominate Validator'}
        </ButtonPrimary>
      </ModalFooter>
    </Modal>
  )
}

const ValidatorsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  background: ${Colors.Black[50]};
  border-radius: 4px;
`

const ValidatorItem = styled.div`
  padding: 4px 0;
`

const BondedAccountsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const BondedAccountsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 200px;
  overflow-y: auto;
`

const BondedAccountItem = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 1px solid ${({ isSelected }) => isSelected ? Colors.Blue[500] : Colors.Black[200]};
  border-radius: 4px;
  cursor: pointer;
  background: ${({ isSelected }) => isSelected ? Colors.Blue[50] : Colors.White};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${Colors.Blue[500]};
    background: ${Colors.Blue[50]};
  }
`

const CheckboxWrapper = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
`

const CheckboxInput = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
  
  &:checked + svg {
    color: ${Colors.Blue[500]};
  }
  
  &:not(:checked) + svg {
    color: ${Colors.Black[300]};
  }
`

const AccountInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`
