import { BN } from '@polkadot/util'
import React, { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'

import { SelectedAccount } from '@/accounts/components/SelectAccount'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useTransactionFee } from '@/accounts/hooks/useTransactionFee'
import { encodeAddress } from '@/accounts/model/encodeAddress'
import { useApi } from '@/api/hooks/useApi'
import { ButtonPrimary, ButtonGhost } from '@/common/components/buttons'
import { Arrow } from '@/common/components/icons/ArrowIcon'
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@/common/components/Modal'
import { TextInlineMedium, TextMedium, TextSmall, TokenValue } from '@/common/components/typography'
import { Colors } from '@/common/constants'

import { useSelectedValidators } from '../context/SelectedValidatorsContext'

import { ValidatorInfo } from './ValidatorInfo'

interface TransactionSummaryModalProps {
  isOpen: boolean
  onClose: () => void
  onBack: () => void
  onSignAndNominate: () => void
  nominatingController: any
  stashAccount: any
  valueBonded: string
}

export const TransactionSummaryModal = ({
  isOpen,
  onClose,
  onBack,
  onSignAndNominate,
  nominatingController,
  stashAccount,
  valueBonded,
}: TransactionSummaryModalProps) => {
  const { selectedValidators } = useSelectedValidators()
  const { api } = useApi()
  const { wallet } = useMyAccounts()
  const [isSigning, setIsSigning] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  // Create the staking transaction
  const transaction = useMemo(() => {
    if (!api || !nominatingController || !stashAccount || !selectedValidators.length) {
      return undefined
    }

    const validatorAddresses = selectedValidators.map((validator) => validator.stashAccount)

    try {
      // For now, let's try just the nominate operation to see if that works
      // We can add the bond operation later if needed
      const tx = api.tx.staking.nominate(validatorAddresses)

      return tx
    } catch (error) {
      return undefined
    }
  }, [api, nominatingController, stashAccount, selectedValidators, valueBonded])

  // Get transaction fee information
  const { feeInfo } = useTransactionFee(nominatingController?.address, () => transaction, [transaction])

  const handleSignAndNominate = useCallback(async () => {
    if (!transaction || !nominatingController || !api || !wallet) {
      return
    }

    try {
      setIsSigning(true)
      setIsProcessing(true)

      // Try using the transaction with proper error handling
      const unsubscribe = transaction.signAndSend(nominatingController.address, wallet.signer, (result: any) => {
        if (result.status.isInBlock) {
          setIsSigning(false)
          setIsProcessing(false)

          // Check for errors in events
          const hasError = result.events.some((eventRecord: any) => {
            return eventRecord.event.section === 'system' && eventRecord.event.method === 'ExtrinsicFailed'
          })

          if (!hasError) {
            // Transaction successful
            onSignAndNominate()
          } else {
            // Transaction failed
            setIsSigning(false)
            setIsProcessing(false)
          }
        } else if (result.status.isFinalized) {
          // Transaction finalized - no action needed
        }
      })

      // Store unsubscribe function for cleanup
      if (unsubscribe) {
        // You might want to store this for cleanup later
      }
    } catch (error) {
      setIsSigning(false)
      setIsProcessing(false)
    }
  }, [transaction, nominatingController, api, wallet, onSignAndNominate])

  // Check if we have all required data for the transaction
  const isTransactionReady = transaction && nominatingController && stashAccount && selectedValidators.length > 0

  if (!isOpen) return null

  return (
    <StyledModal onClose={onClose} modalSize="l">
      <ModalHeader onClick={onClose} title="Nominating validators" />
      <ModalBody>
        <Content>
          <IntroText>
            <div style={{ fontSize: '14px', lineHeight: '20px' }}>
              You are intend to delegate your tokens and stake{' '}
              <TextInlineMedium bold>
                <TokenValue value={new BN(valueBonded)} />
              </TextInlineMedium>{' '}
              from your controller account. Fees of{' '}
              <TextInlineMedium bold>
                <TokenValue value={feeInfo?.transactionFee ? feeInfo.transactionFee : new BN('2000')} />
              </TextInlineMedium>{' '}
              will be applied to the transaction.
            </div>
          </IntroText>

          <AccountSection>
            <AccountItem>
              <AccountLabel>Staking from controller account</AccountLabel>
              {nominatingController ? (
                <AccountDisplay>
                  <AccountInfo>
                    <SelectedAccount account={nominatingController} />
                  </AccountInfo>
                </AccountDisplay>
              ) : (
                <TextSmall>Not selected</TextSmall>
              )}
            </AccountItem>

            <AccountItem>
              <AccountLabel>Fee paid from account</AccountLabel>
              {stashAccount ? (
                <AccountDisplay>
                  <AccountInfo>
                    <SelectedAccount account={stashAccount} />
                  </AccountInfo>
                </AccountDisplay>
              ) : (
                <TextSmall>Not selected</TextSmall>
              )}
            </AccountItem>
          </AccountSection>

          <ValidatorsSection>
            <ValidatorsHeader>
              <TextMedium bold>Nominated validators ({selectedValidators.length})</TextMedium>
            </ValidatorsHeader>
            <ValidatorsList>
              {selectedValidators.map((validator) => (
                <ValidatorItem key={validator.stashAccount}>
                  <ValidatorInfo member={validator.membership} address={encodeAddress(validator.stashAccount)} />
                </ValidatorItem>
              ))}
            </ValidatorsList>
          </ValidatorsSection>
        </Content>
      </ModalBody>
      <ModalFooter>
        <FooterContent>
          <ButtonGhost size="medium" onClick={onBack}>
            <Arrow direction="left" /> Back
          </ButtonGhost>
          <TransactionSummary>
            <SummaryItem>
              <TextSmall>AMOUNT:</TextSmall>
              <TextInlineMedium bold>
                <TokenValue value={new BN(valueBonded)} />
              </TextInlineMedium>
            </SummaryItem>
            <SummaryItem>
              <TextSmall>TRANSACTION FEE:</TextSmall>
              <TextInlineMedium bold>
                {feeInfo?.transactionFee ? (
                  <TokenValue value={feeInfo.transactionFee} />
                ) : (
                  <TokenValue value={new BN('2000')} />
                )}
              </TextInlineMedium>
            </SummaryItem>
          </TransactionSummary>
          <ButtonPrimary
            size="medium"
            onClick={handleSignAndNominate}
            disabled={!isTransactionReady || isSigning || isProcessing}
          >
            {isSigning || isProcessing ? 'Processing...' : 'Sign and Nominate'} <Arrow direction="right" />
          </ButtonPrimary>
        </FooterContent>
      </ModalFooter>
    </StyledModal>
  )
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const IntroText = styled.div`
  padding: 16px;
  background: ${Colors.Black[50]};
  border-radius: 4px;
  color: ${Colors.Black[400]};
`

const AccountSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const AccountItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const AccountLabel = styled(TextMedium)`
  font-weight: 600;
  color: ${Colors.Black[600]};
`

const AccountDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  background: ${Colors.Black[50]};
  border: 1px solid ${Colors.Black[200]};
  border-radius: 4px;
`

const AccountInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const ValidatorsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const ValidatorsHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const ValidatorsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 200px;
  overflow-y: auto;
`

const ValidatorItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  background: ${Colors.White};
  border: 1px solid ${Colors.Black[200]};
  border-radius: 4px;
`

const FooterContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`

const TransactionSummary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: ${Colors.Black[400]};
`

const SummaryItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`

const StyledModal = styled(Modal)`
  width: 728px;
`
