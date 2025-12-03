import React from 'react'
import styled from 'styled-components'

import { encodeAddress } from '@/accounts/model/encodeAddress'
import { ButtonPrimary, ButtonGhost } from '@/common/components/buttons'
import { Arrow } from '@/common/components/icons/ArrowIcon'
import { TextMedium, TextSmall } from '@/common/components/typography'
import { Colors } from '@/common/constants'

import { useSelectedValidators } from '../context/SelectedValidatorsContext'

import { ValidatorInfo } from './ValidatorInfo'

interface SelectedValidatorsPanelProps {
  onProceed: () => void
}

export const SelectedValidatorsPanel = ({ onProceed }: SelectedValidatorsPanelProps) => {
  const { selectedValidators, toggleSelection, maxSelection, clearSelection } = useSelectedValidators()

  const handleRemoveValidator = (validator: any) => {
    toggleSelection(validator)
  }

  const handleRemoveAll = () => {
    clearSelection()
  }

  return (
    <PanelContainer>
      <PanelHeader>
        <TextMedium bold>
          CANDIDATE ACCOUNTS ({selectedValidators.length}/{maxSelection})
        </TextMedium>
      </PanelHeader>

      <PanelContent>
        {selectedValidators.length === 0 ? (
          <EmptyState>
            <TextSmall lighter>No validators selected</TextSmall>
          </EmptyState>
        ) : (
          <ValidatorsList>
            {selectedValidators.map((validator) => (
              <ValidatorItem key={validator.stashAccount}>
                <ValidatorInfo member={validator.membership} address={encodeAddress(validator.stashAccount)} />
                <ValidatorActions>
                  <RemoveButton onClick={() => handleRemoveValidator(validator)}>×</RemoveButton>
                </ValidatorActions>
              </ValidatorItem>
            ))}
          </ValidatorsList>
        )}
      </PanelContent>

      <PanelFooter>
        {selectedValidators.length > 0 && (
          <ButtonGhost size="medium" onClick={handleRemoveAll}>
            Remove All
          </ButtonGhost>
        )}
        <ButtonPrimary size="medium" onClick={onProceed} disabled={selectedValidators.length === 0}>
          Proceed <Arrow direction="right" />
        </ButtonPrimary>
      </PanelFooter>
    </PanelContainer>
  )
}

const PanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 316px;
`

const PanelHeader = styled.div`
  display: flex;
  padding: 16px 0 16px 0;
  color: ${Colors.Black[400]};
`

const PanelContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px 0 16px 0;
`

const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  color: ${Colors.Black[400]};
`

const ValidatorsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const ValidatorItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  background: ${Colors.White};
  border: 1px solid ${Colors.Black[200]};
  border-radius: 2px;
  position: relative;

  &::before {
    content: '✓';
    position: absolute;
    top: 8px;
    right: 8px;
    color: ${Colors.Green[500]};
    font-weight: bold;
    font-size: 14px;
  }
`

const ValidatorActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: ${Colors.Black[400]};
  cursor: pointer;
  font-size: 18px;
  line-height: 1;
  padding: 4px;
  border-radius: 4px;

  &:hover {
    background: ${Colors.Black[100]};
    color: ${Colors.Black[600]};
  }
`

const PanelFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 16px;
  gap: 8px;
`
