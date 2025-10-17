import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { generatePath } from 'react-router-dom'
import styled from 'styled-components'

import { ButtonPrimary } from '@/common/components/buttons'
import { Checkbox } from '@/common/components/forms'
import { List, ListItem } from '@/common/components/List'
import { ListHeader } from '@/common/components/List/ListHeader'
import { SortHeader } from '@/common/components/List/SortHeader'
import { Pagination, PaginationProps } from '@/common/components/Pagination'
import { Tooltip, TooltipDefault } from '@/common/components/Tooltip'
import { NotFoundText } from '@/common/components/typography/NotFoundText'
import { BreakPoints, Colors } from '@/common/constants'
import { useModal } from '@/common/hooks/useModal'
import { WorkingGroupsRoutes } from '@/working-groups/constants'

import { useBondedAccounts } from '../hooks/useBondedAccounts'
import { NominateValidatorModalCall } from '../modals/NominateValidatorModal/types'
import { ValidatorCard } from '../modals/validatorCard/ValidatorCard'
import { ValidatorDetailsOrder, ValidatorWithDetails } from '../types'

import { ValidatorItem } from './ValidatorItem'
import { ValidatorItemLoading } from './ValidatorItemLoading'

interface ValidatorsListProps {
  validators: ValidatorWithDetails[] | undefined
  eraIndex: number | undefined
  order: ValidatorDetailsOrder & { sortBy: (key: ValidatorDetailsOrder['key']) => () => void }
  pagination: PaginationProps
  selectedValidators: string[]
  onSelectionChange: (selected: string[]) => void
}

export const ValidatorsList = ({ validators, eraIndex, order, pagination, selectedValidators, onSelectionChange }: ValidatorsListProps) => {
  const { t } = useTranslation('validators')
  const [cardNumber, selectCard] = useState<number | null>(null)
  const { hasBondedAccounts } = useBondedAccounts()
  const { showModal } = useModal<NominateValidatorModalCall>()

  const handleToggleValidator = (stashAccount: string) => {
    if (selectedValidators.includes(stashAccount)) {
      onSelectionChange(selectedValidators.filter((addr) => addr !== stashAccount))
    } else {
      onSelectionChange([...selectedValidators, stashAccount])
    }
  }

  const handleNominateSelected = () => {
    showModal({ 
      modal: 'NominateValidator', 
      data: { 
        validatorAddresses: selectedValidators 
      } 
    })
  }

  if (validators && !validators.length) return <NotFoundText>{t('common:forms.noResults')}</NotFoundText>

  const showCheckboxes = hasBondedAccounts
  const showNominateButton = showCheckboxes && selectedValidators.length > 0

  return (
    <Wrapper>
      {showNominateButton && (
        <NominateButtonWrapper>
          <ButtonPrimary size="medium" onClick={handleNominateSelected}>
            Nominate {selectedValidators.length} Validator{selectedValidators.length > 1 ? 's' : ''}
          </ButtonPrimary>
        </NominateButtonWrapper>
      )}
      <ResponsiveWrap>
        <ValidatorsListWrap $showCheckboxes={showCheckboxes}>
          <ListHeaders $showCheckboxes={showCheckboxes}>
            {showCheckboxes && <ListHeader />}
            <SortHeader
              onSort={order.sortBy('default')}
              isActive={order.key === 'default'}
              isDescending={order.isDescending}
            >
              Validator
            </SortHeader>
            <ListHeader>
              Verification
              <Tooltip
                tooltipText="The profile of Verified validator has been entirely verified by the Membership working group."
                tooltipLinkText="Membership working group"
                tooltipLinkURL={generatePath(WorkingGroupsRoutes.group, { name: 'membership' })}
              >
                <TooltipDefault />
              </Tooltip>
            </ListHeader>
            <ListHeader>State</ListHeader>
            <ListHeader>Own Stake</ListHeader>
            <ListHeader>Total Stake</ListHeader>
            <SortHeader onSort={order.sortBy('apr')} isActive={order.key === 'apr'} isDescending={order.isDescending}>
              Expected Nom APR
              <Tooltip
                tooltipText={
                  <p>
                    This column shows the expected APR for nominators who are nominating funds for the chosen validator.
                    The APR is subject to the amount staked and have a diminishing return for higher token amounts. This
                    is calculated as follow:
                    <br />
                    <code>Yearly Reward * (1 - Commission) / Stake</code>
                    <dl>
                      <dt>Reward:</dt>
                      <dd>Average reward generated (during the last 30 days) extrapolated over a year.</dd>

                      <dt>Commission:</dt>
                      <dd>Current nominator commission.</dd>

                      <dt>Stake:</dt>
                      <dd>Current total stake (validator + nominators).</dd>
                    </dl>
                  </p>
                }
              >
                <TooltipDefault />
              </Tooltip>
            </SortHeader>
            <SortHeader
              onSort={order.sortBy('commission')}
              isActive={order.key === 'commission'}
              isDescending={order.isDescending}
            >
              Commission
              <Tooltip tooltipText={<p>The validator commission on the nominators rewards</p>}>
                <TooltipDefault />
              </Tooltip>
            </SortHeader>
          </ListHeaders>
          {!validators ? (
            <ValidatorItemLoading count={7} />
          ) : (
            <>
              <List>
                {validators?.map((validator, index) => (
                  <ListItem key={validator.stashAccount}>
                    <ValidatorItemContainer>
                      {showCheckboxes && (
                        <CheckboxWrapper
                          onClick={(e) => {
                            e.stopPropagation()
                            handleToggleValidator(validator.stashAccount)
                          }}
                        >
                          <Checkbox
                            id={`validator-${validator.stashAccount}`}
                            isChecked={selectedValidators.includes(validator.stashAccount)}
                            onChange={() => handleToggleValidator(validator.stashAccount)}
                          />
                        </CheckboxWrapper>
                      )}
                      <ValidatorItemClickable
                        onClick={() => {
                          selectCard(index + 1)
                        }}
                      >
                        <ValidatorItem validator={validator} showCheckbox={showCheckboxes} />
                      </ValidatorItemClickable>
                    </ValidatorItemContainer>
                  </ListItem>
                ))}
              </List>
              {cardNumber && validators[cardNumber - 1] && (
                <ValidatorCard
                  cardNumber={cardNumber}
                  validator={validators[cardNumber - 1]}
                  eraIndex={eraIndex}
                  selectCard={selectCard}
                  totalCards={validators.length}
                />
              )}
            </>
          )}
        </ValidatorsListWrap>
      </ResponsiveWrap>
      <Pagination {...pagination} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: end;
`

const NominateButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 8px 0;
`

const ResponsiveWrap = styled.div`
  overflow: auto;
  align-self: stretch;
  max-width: calc(100vw - 32px);
  @media (min-width: ${BreakPoints.sm}px) {
    max-width: calc(100vw - 48px);
  }
  @media (min-width: ${BreakPoints.md}px) {
    max-width: calc(100vw - 274px);
  }
`

const ValidatorsListWrap = styled.div<{ $showCheckboxes: boolean }>`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 16px auto;
  grid-template-areas:
    'validatorstablenav'
    'validatorslist';
  grid-row-gap: 4px;
  min-width: ${({ $showCheckboxes }) => ($showCheckboxes ? '1226px' : '1166px')};

  ${List} {
    gap: 8px;
  }
  ${ListItem} {
    background: ${Colors.Black[50]};
  }
`

const ListHeaders = styled.div<{ $showCheckboxes: boolean }>`
  display: grid;
  grid-area: validatorstablenav;
  grid-template-rows: 1fr;
  grid-template-columns: ${({ $showCheckboxes }) => 
    $showCheckboxes 
      ? '60px 250px 110px 80px 140px 140px 140px 100px 90px' 
      : '250px 110px 80px 140px 140px 140px 100px 90px'};
  justify-content: space-between;
  width: 100%;
  padding: 0 16px;

  span {
    display: flex;
    justify-content: flex-end;
    gap: 4px;
  }
`

const ValidatorItemContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  padding: 0 16px;
  flex-shrink: 0;
`

const ValidatorItemClickable = styled.div`
  flex: 1;
  cursor: pointer;
`
