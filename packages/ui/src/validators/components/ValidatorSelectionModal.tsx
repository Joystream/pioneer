import React from 'react'
import styled from 'styled-components'

import { encodeAddress } from '@/accounts/model/encodeAddress'
import { ButtonPrimary, ButtonGhost } from '@/common/components/buttons'
import { CopyButton } from '@/common/components/buttons/CopyButton'
import { Arrow } from '@/common/components/icons/ArrowIcon'
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@/common/components/Modal'
import { TextMedium } from '@/common/components/typography'
import { Colors } from '@/common/constants'

import { useSelectedValidators } from '../context/SelectedValidatorsContext'

import { ValidatorInfo } from './ValidatorInfo'

interface ValidatorSelectionModalProps {
  isOpen: boolean
  onClose: () => void
  onContinue: () => void
  onCancel: () => void
}

export const ValidatorSelectionModal = ({ isOpen, onClose, onContinue, onCancel }: ValidatorSelectionModalProps) => {
  const { selectedValidators } = useSelectedValidators()

  if (!isOpen) return null

  return (
    <Modal onClose={onClose} modalSize="m">
      <ModalHeader onClick={onClose} title="Nominating validators" />
      <ModalBody>
        <Content>
          <Description>
            <TextMedium>
              You are about to delegate your JOY tokens to <strong>{selectedValidators.length} validators</strong>. Your
              reward will be calculated based on the amount of staked tokens, the validator's commission and the APR.
            </TextMedium>
            <TextMedium>
              Click "Continue" to set up or select your stash account and complete the process of nominating.
            </TextMedium>
          </Description>

          <ValidatorsSection>
            <SectionHeader>
              <TextMedium bold>Shortlisted validators ({selectedValidators.length})</TextMedium>
            </SectionHeader>
            <ValidatorsList>
              {selectedValidators.map((validator) => (
                <ValidatorItem key={validator.stashAccount}>
                  <ValidatorInfo member={validator.membership} address={encodeAddress(validator.stashAccount)} />
                  <CopyButton textToCopy={encodeAddress(validator.stashAccount)} />
                </ValidatorItem>
              ))}
            </ValidatorsList>
          </ValidatorsSection>
        </Content>
      </ModalBody>
      <ModalFooter>
        <ButtonsGroup>
          <ButtonGhost size="medium" onClick={onCancel}>
            <Arrow direction="left" /> Cancel
          </ButtonGhost>
          <ButtonPrimary size="medium" onClick={onContinue}>
            Continue <Arrow direction="right" />
          </ButtonPrimary>
        </ButtonsGroup>
      </ModalFooter>
    </Modal>
  )
}

const ButtonsGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 8px;
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const Description = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const ValidatorsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: ${Colors.Black[50]};
  border: 1px solid ${Colors.Black[200]};
  border-radius: 4px;
`

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: ${Colors.Black[100]};
  border-radius: 4px;
`

const ValidatorsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 300px;
  overflow-y: auto;
  padding: 12px;
  background: ${Colors.Black[50]};
  border-radius: 4px;
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
