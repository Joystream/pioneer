import { BN } from '@polkadot/util'
import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'

import { SelectedAccount } from '@/accounts/components/SelectAccount'
import { useBalance } from '@/accounts/hooks/useBalance'
import { InsufficientFundsModal } from '@/accounts/modals/InsufficientFundsModal'
import { useApi } from '@/api/hooks/useApi'
import { ButtonGhost, ButtonPrimary } from '@/common/components/buttons'
import { Arrow } from '@/common/components/icons/ArrowIcon'
import { Modal, ModalHeader, ModalBody } from '@/common/components/Modal'
import { TextInlineMedium, TextMedium, TextSmall, TokenValue } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { useMachine } from '@/common/hooks/useMachine'
import { SignTransactionModal } from '@/common/modals/SignTransactionModal/SignTransactionModal'
import { defaultTransactionModalMachine } from '@/common/model/machines/defaultTransactionModalMachine'

import { useSelectedValidators } from '../context/SelectedValidatorsContext'

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
  const { api, isConnected } = useApi()

  // Create state machine for transaction flow
  const machine = useMemo(
    () =>
      defaultTransactionModalMachine(
        'There was a problem bonding and nominating validators.',
        'Your nomination has been submitted successfully.'
      ),
    []
  )
  const [state, send] = useMachine(machine, { context: { validateBeforeTransaction: true } })

  // Create transaction directly
  const transaction = useMemo(() => {
    if (!api || !isConnected || !nominatingController || !stashAccount || !valueBonded || !selectedValidators.length) {
      return undefined
    }

    try {
      const bondedValue = new BN(valueBonded)

      return api.tx.utility.batch([
        api.tx.staking.bond(nominatingController.address, bondedValue, 'Staked'),
        api.tx.staking.nominate(selectedValidators.map((validator) => validator.stashAccount)),
      ])
    } catch (err) {
      return undefined
    }
  }, [api, isConnected, nominatingController, stashAccount, valueBonded, selectedValidators])

  const [transactionFee, setTransactionFee] = useState<BN | undefined>(undefined)
  const balance = useBalance(stashAccount?.address)

  useEffect(() => {
    if (transaction && stashAccount?.address) {
      const subscription = transaction.paymentInfo(stashAccount.address).subscribe((info: any) => {
        setTransactionFee(info.partialFee.toBn())
      })

      return () => subscription.unsubscribe()
    }
  }, [transaction, stashAccount?.address])

  // Create feeInfo object
  const feeInfo = useMemo(() => {
    if (!transactionFee || !balance) return undefined

    return {
      transactionFee,
      canAfford: balance.transferable.gte(transactionFee),
    }
  }, [transactionFee, balance])

  // Verify requirements when transaction and fee info are ready
  useEffect(() => {
    if (isOpen && state.matches('requirementsVerification')) {
      if (transaction && feeInfo) {
        send('PASS')
      }
    }
  }, [isOpen, state, transaction, feeInfo, send])

  useEffect(() => {
    if (state.matches('success')) {
      onSignAndNominate()
    }
  }, [state, onSignAndNominate])

  // Don't render anything if modal is not open
  if (!isOpen) return null

  // Show insufficient funds modal if requirements failed
  // When closed, it should close all modals
  if (state.matches('requirementsFailed') && stashAccount && feeInfo) {
    return <InsufficientFundsModal onClose={onClose} address={stashAccount.address} amount={feeInfo.transactionFee} />
  }

  // Also show insufficient funds modal when user clicks button without enough funds
  if (state.matches('beforeTransaction') && feeInfo && !feeInfo.canAfford && stashAccount) {
    return <InsufficientFundsModal onClose={onClose} address={stashAccount.address} amount={feeInfo.transactionFee} />
  }

  // Show sign transaction modal when in transaction state
  if (state.matches('transaction') && transaction && stashAccount) {
    return (
      <SignTransactionModal
        buttonText="Sign and Nominate"
        transaction={transaction}
        signer={stashAccount.address}
        service={state.children.transaction}
        skipQueryNode={true}
      >
        <Content>
          <IntroText>
            <div style={{ fontSize: '14px', lineHeight: '20px' }}>
              You are about to bond{' '}
              <TextInlineMedium bold>
                <TokenValue value={new BN(valueBonded)} />
              </TextInlineMedium>{' '}
              from your stash account and nominate {selectedValidators.length} validator
              {selectedValidators.length !== 1 ? 's' : ''}.
            </div>
          </IntroText>

          <AccountSection>
            <AccountItem>
              <AccountLabel>Stash account (bonding & paying fees)</AccountLabel>
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

            <AccountItem>
              <AccountLabel>Controller account (managing nominations)</AccountLabel>
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
          </AccountSection>
        </Content>
      </SignTransactionModal>
    )
  }

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
              from your controller account. Fees{' '}
              <TextInlineMedium bold>
                <TokenValue value={feeInfo?.transactionFee || new BN('2000')} />
              </TextInlineMedium>{' '}
              will be applied to the transaction.
            </div>
          </IntroText>

          <AccountSection>
            <AccountItem>
              <AccountLabel>Staking from controller account</AccountLabel>
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

            <AccountItem>
              <AccountLabel>Fee paid from account</AccountLabel>
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
          </AccountSection>
        </Content>
      </ModalBody>
      <FooterWrapper>
        <ButtonGhost size="medium" onClick={onBack}>
          <Arrow direction="left" /> Back
        </ButtonGhost>
        <TransactionValue>
          <TransactionSummary>
            AMOUNT:{' '}
            <TextInlineMedium bold>
              <TokenValue value={new BN(valueBonded)} />
            </TextInlineMedium>
          </TransactionSummary>
          <TransactionSummary>
            TRANSACTION FEES:{' '}
            <TextInlineMedium bold>
              <TokenValue value={feeInfo?.transactionFee || new BN('2000')} />
            </TextInlineMedium>
          </TransactionSummary>
        </TransactionValue>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
          <ButtonPrimary
            size="medium"
            onClick={() => {
              // Check funds before proceeding
              if (feeInfo && !feeInfo.canAfford) {
                send('FAIL')
              } else {
                send('PASS')
              }
            }}
            disabled={!transaction || !feeInfo || !state.matches('beforeTransaction')}
          >
            {!transaction || !feeInfo
              ? 'Loading...'
              : !state.matches('beforeTransaction')
              ? 'Checking...'
              : 'Sign and Nominate'}{' '}
            <Arrow direction="right" />
          </ButtonPrimary>
        </div>
      </FooterWrapper>
    </StyledModal>
  )
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
`

const IntroText = styled.div`
  padding: 16px;
  background: ${Colors.Black[50]};
  border-radius: 4px;
  color: ${Colors.Black[400]};
`
const TransactionSummary = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
  color: ${Colors.Black[600]};
`
const TransactionValue = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
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
  padding: 4px 16px;
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

const FooterWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-top: 1px solid ${Colors.Black[200]};
`

const StyledModal = styled(Modal)`
  width: 728px;
`
