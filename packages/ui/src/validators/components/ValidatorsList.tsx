import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { generatePath } from 'react-router-dom'
import styled from 'styled-components'

import { List, ListItem } from '@/common/components/List'
import { ListHeader } from '@/common/components/List/ListHeader'
import { SortHeader } from '@/common/components/List/SortHeader'
import { Pagination, PaginationProps } from '@/common/components/Pagination'
import { Tooltip, TooltipDefault } from '@/common/components/Tooltip'
import { NotFoundText } from '@/common/components/typography/NotFoundText'
import { BreakPoints, Colors } from '@/common/constants'
import { WorkingGroupsRoutes } from '@/working-groups/constants'

import { ValidatorCard } from '../modals/validatorCard/ValidatorCard'
import { ValidatorDetailsOrder, ValidatorWithDetails } from '../types'

import { ValidatorItem } from './ValidatorItem'
import { ValidatorItemLoading } from './ValidatorItemLoading'

interface ValidatorsListProps {
  validators: ValidatorWithDetails[] | undefined
  eraIndex: number | undefined
  order: ValidatorDetailsOrder & { sortBy: (key: ValidatorDetailsOrder['key']) => () => void }
  pagination: PaginationProps
}

export const ValidatorsList = ({ validators, eraIndex, order, pagination }: ValidatorsListProps) => {
  const { t } = useTranslation('validators')
  const [cardNumber, selectCard] = useState<number | null>(null)

  if (validators && !validators.length) return <NotFoundText>{t('common:forms.noResults')}</NotFoundText>

  return (
    <Wrapper>
      <ResponsiveWrap>
        <ValidatorsListWrap>
          <ListHeaders>
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
                  <ListItem
                    key={validator.stashAccount}
                    onClick={() => {
                      selectCard(index + 1)
                    }}
                  >
                    <ValidatorItem validator={validator} />
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

const ValidatorsListWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 16px auto;
  grid-template-areas:
    'validatorstablenav'
    'validatorslist';
  grid-row-gap: 4px;
  min-width: 1166px;

  ${List} {
    gap: 8px;
  }
  ${ListItem} {
    background: ${Colors.Black[50]};
  }
`

const ListHeaders = styled.div`
  display: grid;
  grid-area: validatorstablenav;
  grid-template-rows: 1fr;
  grid-template-columns: 250px 110px 80px 140px 140px 140px 100px 90px;
  justify-content: space-between;
  width: 100%;
  padding: 0 16px;

  span {
    display: flex;
    justify-content: flex-end;
    gap: 4px;
  }
`
