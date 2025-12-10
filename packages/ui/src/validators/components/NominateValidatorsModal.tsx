import { BN } from '@polkadot/util'
import React from 'react'
import styled from 'styled-components'

import { SelectedAccount } from '@/accounts/components/SelectAccount'
import { encodeAddress } from '@/accounts/model/encodeAddress'
import { ButtonPrimary, ButtonGhost } from '@/common/components/buttons'
import { Arrow } from '@/common/components/icons/ArrowIcon'
import { WarningIcon } from '@/common/components/icons/WarningIcon'
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@/common/components/Modal'
import { TextInlineMedium, TextMedium, TextSmall, TokenValue } from '@/common/components/typography'
import { Colors } from '@/common/constants'

import { useSelectedValidators } from '../context/SelectedValidatorsContext'

import { ValidatorInfo } from './ValidatorInfo'

interface NominateValidatorsModalProps {
  isOpen: boolean
  onClose: () => void
  onBack: () => void
  onBondAndNominate: () => void
  nominatingController: any
  stashAccount: any
  valueBonded: string
  useExistingStash?: boolean
  nominatingControllerBalance?: BN
  stashAccountBalance?: BN
}

export const NominateValidatorsModal = ({
  isOpen,
  onClose,
  onBack,
  onBondAndNominate,
  nominatingController,
  stashAccount,
  valueBonded,
  useExistingStash = false,
}: NominateValidatorsModalProps) => {
  const { selectedValidators } = useSelectedValidators()

  if (!isOpen) return null

  return (
    <StyledModal onClose={onClose} modalSize="l">
      <ModalHeader onClick={onClose} title="Nominate validators" />
      <ModalBody>
        <Content>
          <AttentionSection>
            <AttentionIcon>
              <WarningIcon /> Attention
            </AttentionIcon>
            <AttentionText>
              <TextMedium>
                You should trust your validators to act competently and honest; basing your decision purely on their
                current profitability could lead to reduced profits or even loss of funds.
              </TextMedium>
            </AttentionText>
          </AttentionSection>

          <AccountSection>
            <AccountItem>
              <AccountLabel>Nominating controller account</AccountLabel>
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
              <AccountLabel>Stash account</AccountLabel>
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
              <AccountLabel>Value bonded</AccountLabel>
              <ValueDisplay>
                <TokenValue value={new BN(valueBonded)} />
              </ValueDisplay>
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
          <TransactionFee>
            <TextSmall>
              TRANSACTION FEE: <TextInlineMedium bold>0.01</TextInlineMedium> JOY
            </TextSmall>
          </TransactionFee>
          <ButtonPrimary size="medium" onClick={onBondAndNominate}>
            {useExistingStash ? 'Nominate' : 'Bond and nominate'} <Arrow direction="right" />
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

const AttentionSection = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  background: ${Colors.Orange[50]};
  border: 1px solid ${Colors.Orange[200]};
  border-radius: 4px;
`

const AttentionIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const AttentionText = styled.div`
  flex: 1;
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

const ValueDisplay = styled.div`
  padding: 12px;
  background: ${Colors.Black[50]};
  border: 1px solid ${Colors.Black[200]};
  border-radius: 4px;
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
  max-height: 300px;
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

const TransactionFee = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${Colors.Black[600]};
`

const StyledModal = styled(Modal)`
  width: 728px;
`
