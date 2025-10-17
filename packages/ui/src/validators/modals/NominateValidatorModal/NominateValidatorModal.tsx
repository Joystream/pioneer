import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import BN from 'bn.js'

import { useApi } from '@/api/hooks/useApi'
import { ButtonPrimary } from '@/common/components/buttons'
import { Checkbox } from '@/common/components/forms'
import { InputComponent, InputText, Label } from '@/common/components/forms'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { useMachine } from '@/common/hooks/useMachine'
import { useModal } from '@/common/hooks/useModal'
import { SignTransactionModal } from '@/common/modals/SignTransactionModal/SignTransactionModal'
import { Address } from '@/common/types'
import { useBondedAccounts } from '@/validators/hooks/useBondedAccounts'

import { NominateValidatorModalCall } from '@/validators/modals/NominateValidatorModal/types'

import { nominateMachine } from './machine'

interface Props {
  validatorAddresses: Address[]
}

export const NominateValidatorModal = () => {
  const { modalData } = useModal<NominateValidatorModalCall>()
  const validatorAddress = modalData?.validatorAddress
  const validatorAddresses = modalData?.validatorAddresses || (validatorAddress ? [validatorAddress] : [])

  if (!validatorAddresses.length) return null
  
  return <NominateValidatorModalInner validatorAddresses={validatorAddresses} />
}

const NominateValidatorModalInner = ({ validatorAddresses }: Props) => {
  const { hideModal } = useModal<NominateValidatorModalCall>()
  const { api } = useApi()
  const { bondedAccounts, isLoading } = useBondedAccounts()
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([])
  const [state, send, service] = useMachine(nominateMachine)

  const handleToggleAccount = (address: string) => {
    if (selectedAccounts.includes(address)) {
      setSelectedAccounts(selectedAccounts.filter((addr) => addr !== address))
    } else {
      setSelectedAccounts([...selectedAccounts, address])
    }
  }

  const handleNominate = () => {
    if (selectedAccounts.length === 0) {
      return
    }
    send('NEXT')
  }

  // Create batch transactions for each selected account
  // In Substrate staking, each controller can only nominate for one stash account
  // So we create one transaction per selected bonded account
  const transactions = useMemo(() => {
    if (!api || selectedAccounts.length === 0) {
      return []
    }
    return selectedAccounts.map((accountAddress) => {
      // api.tx.staking.nominate takes an array of validator addresses
      return {
        address: accountAddress,
        tx: api.tx.staking.nominate(validatorAddresses)
      }
    })
  }, [api, selectedAccounts, validatorAddresses])

  // For simplicity, we'll process the first selected account
  // In a more complete implementation, you'd want to handle multiple transactions
  const currentTransaction = transactions[0]

  if (state.matches('transaction') && currentTransaction) {
    return (
      <SignTransactionModal
        transaction={currentTransaction.tx}
        signer={currentTransaction.address}
        service={service}
        buttonText="Sign and Nominate"
      >
        <RowGapBlock gap={16}>
          <TextMedium>
            You are nominating {validatorAddresses.length} validator{validatorAddresses.length > 1 ? 's' : ''}. 
            Your bonded tokens will be used to support these validators.
          </TextMedium>
          <TextMedium>
            <strong>Bonded Account:</strong> {currentTransaction.address}
          </TextMedium>
          <RowGapBlock gap={4}>
            <TextMedium><strong>Validators ({validatorAddresses.length}):</strong></TextMedium>
            {validatorAddresses.slice(0, 3).map((address) => (
              <TextMedium key={address} lighter style={{ fontSize: '12px', wordBreak: 'break-all' }}>
                {address}
              </TextMedium>
            ))}
            {validatorAddresses.length > 3 && (
              <TextMedium lighter>...and {validatorAddresses.length - 3} more</TextMedium>
            )}
          </RowGapBlock>
          {transactions.length > 1 && (
            <TextMedium lighter>
              Note: Nominating with {transactions.length} bonded accounts. This transaction is for the first account.
            </TextMedium>
          )}
        </RowGapBlock>
      </SignTransactionModal>
    )
  }

  return (
    <Modal modalSize="m" onClose={hideModal}>
      <ModalHeader title="Nominate Validator" onClick={hideModal} />
      <ModalBody>
        <RowGapBlock gap={16}>
          <TextMedium>
            You are about to nominate {validatorAddresses.length} validator{validatorAddresses.length > 1 ? 's' : ''}. 
            Nominating validators means you want to support them in the validator set and potentially earn rewards 
            from their validation activities.
          </TextMedium>
          
          <RowGapBlock gap={8}>
            <TextMedium><strong>Selected Validators ({validatorAddresses.length}):</strong></TextMedium>
            <ValidatorAddressList>
              {validatorAddresses.map((address) => (
                <AddressItem key={address}>{address}</AddressItem>
              ))}
            </ValidatorAddressList>
          </RowGapBlock>

          <RowGapBlock gap={8}>
            <TextMedium><strong>Select Bonded Accounts to Nominate With:</strong></TextMedium>
            {isLoading ? (
              <TextMedium>Loading bonded accounts...</TextMedium>
            ) : bondedAccounts.length === 0 ? (
              <TextMedium>No bonded accounts found. You need to bond tokens first.</TextMedium>
            ) : (
              <AccountsList>
                {bondedAccounts.map((account) => (
                  <AccountItem key={account.address} onClick={() => handleToggleAccount(account.address)}>
                    <Checkbox
                      id={`account-${account.address}`}
                      isChecked={selectedAccounts.includes(account.address)}
                      onChange={() => handleToggleAccount(account.address)}
                    />
                    <AccountInfo>
                      <TextMedium>{account.address}</TextMedium>
                      <TokenValue size="xs" value={new BN(account.bondedAmount)} />
                    </AccountInfo>
                  </AccountItem>
                ))}
              </AccountsList>
            )}
          </RowGapBlock>
        </RowGapBlock>
      </ModalBody>
      <ModalFooter>
        <ButtonPrimary 
          size="medium" 
          onClick={handleNominate}
          disabled={selectedAccounts.length === 0 || bondedAccounts.length === 0}
        >
          Next: Sign Transaction
        </ButtonPrimary>
      </ModalFooter>
    </Modal>
  )
}

const ValidatorAddressList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-height: 150px;
  overflow-y: auto;
  padding: 8px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
`

const AddressItem = styled(TextMedium)`
  font-size: 12px;
  word-break: break-all;
`

const AccountsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const AccountItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.15);
  }
`

const AccountInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 0;

  ${TextMedium} {
    font-size: 12px;
    word-break: break-all;
  }
`

