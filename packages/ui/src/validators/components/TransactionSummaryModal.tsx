import { BN } from '@polkadot/util'
import React from 'react'
import styled from 'styled-components'

import { SelectedAccount } from '@/accounts/components/SelectAccount'
import { ButtonGhost, ButtonPrimary } from '@/common/components/buttons'
import { Arrow } from '@/common/components/icons/ArrowIcon'
import { Modal, ModalHeader, ModalBody } from '@/common/components/Modal'
import { TextInlineMedium, TextMedium, TextSmall, TokenValue } from '@/common/components/typography'
import { Colors } from '@/common/constants'

import { useSelectedValidators } from '../context/SelectedValidatorsContext'
import { useStakingTransactions } from '../hooks/useStakingSDK'

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
  const { bondAndNominate, isConnected } = useStakingTransactions()

  if (!isOpen) return null

  const handleBondAndNominate = async () => {
    if (!isConnected || !nominatingController || !stashAccount || !valueBonded || !selectedValidators.length) {
      return
    }

    try {
      const amount = BigInt(valueBonded)
      const targets = selectedValidators.map((validator) => validator.stashAccount)
      await bondAndNominate(nominatingController.address, amount, targets, 'Staked')
      onSignAndNominate()
    } catch (error) {
      onClose()
    }
  }

  return (
    <StyledModal onClose={onClose} modalSize="l">
      <ModalHeader onClick={onClose} title="Nominating validators" />
      <ModalBody>
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
        </TransactionValue>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
          <ButtonPrimary
            size="medium"
            onClick={handleBondAndNominate}
            disabled={!isConnected || !stashAccount || !nominatingController || !selectedValidators.length}
          >
            Sign and Nominate <Arrow direction="right" />
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
