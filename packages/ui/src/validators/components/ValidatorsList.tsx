import React, { useMemo, useState } from 'react'
import { generatePath } from 'react-router-dom'
import styled from 'styled-components'

import { List, ListItem } from '@/common/components/List'
import { ListHeader } from '@/common/components/List/ListHeader'
import { SortHeader } from '@/common/components/List/SortHeader'
import { Loading } from '@/common/components/Loading'
import { Tooltip, TooltipDefault } from '@/common/components/Tooltip'
import { Colors } from '@/common/constants'
import { Comparator } from '@/common/model/Comparator'
import { WorkingGroupsRoutes } from '@/working-groups/constants'

import { ValidatorCard } from '../modals/validatorCard/ValidatorCard'
import { ValidatorWithDetails } from '../types'

import { ValidatorItem } from './ValidatorItem'

interface ValidatorsListProps {
  validators: ValidatorWithDetails[]
}

export const ValidatorsList = ({ validators }: ValidatorsListProps) => {
  const [cardNumber, selectCard] = useState<number | null>(null)
  type SortKey = 'stashAccount' | 'APR' | 'commission'
  const [sortBy, setSortBy] = useState<SortKey>('stashAccount')
  const [isDescending, setDescending] = useState(false)

  const sortedValidators = useMemo(
    () =>
      [...validators].sort(
        Comparator<ValidatorWithDetails>(isDescending, sortBy)[sortBy === 'stashAccount' ? 'string' : 'number']
      ),
    [sortBy, isDescending, validators]
  )

  const onSort = (key: SortKey, descendingByDefault = false) => {
    if (key === sortBy) {
      setDescending(!isDescending)
    } else {
      setDescending(descendingByDefault)
      setSortBy(key)
    }
  }

  if (validators.length === 0) return <Loading />
  return (
    <ResponsiveWrap>
      <ValidatorsListWrap>
        <ListHeaders>
          <SortHeader
            onSort={() => onSort('stashAccount')}
            isActive={sortBy === 'stashAccount'}
            isDescending={isDescending}
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
          <SortHeader onSort={() => onSort('APR', true)} isActive={sortBy === 'APR'} isDescending={isDescending}>
            Expected Nom APR
            <Tooltip
              tooltipText={
                <p>
                  This column shows the expected APR for nominators who are nominating funds for the chosen validator.
                  The APR is subject to the amount staked and have a diminishing return for higher token amounts. This
                  is calculated as follow: <code>Last reward extrapolated over a year</code> times{' '}
                  <code>The nominator commission</code> divided by <code>The total staked by the validator</code>
                </p>
              }
            >
              <TooltipDefault />
            </Tooltip>
          </SortHeader>
          <SortHeader
            onSort={() => onSort('commission', true)}
            isActive={sortBy === 'commission'}
            isDescending={isDescending}
          >
            Commission
          </SortHeader>
        </ListHeaders>
        <List>
          {sortedValidators?.map((validator, index) => (
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
        {cardNumber && sortedValidators[cardNumber - 1] && (
          <ValidatorCard
            cardNumber={cardNumber}
            validator={sortedValidators[cardNumber - 1]}
            selectCard={selectCard}
            totalCards={sortedValidators.length}
          />
        )}
      </ValidatorsListWrap>
    </ResponsiveWrap>
  )
}

const ResponsiveWrap = styled.div`
  overflow: auto;
  max-width: calc(100vw - 32px);
  @media (min-width: 768px) {
    max-width: calc(100vw - 48px);
  }
  @media (min-width: 1024px) {
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
  min-width: 977px;

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
