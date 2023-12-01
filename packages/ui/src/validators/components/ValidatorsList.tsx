import React, { useMemo, useState } from 'react'
import { generatePath } from 'react-router-dom'
import styled from 'styled-components'

import { List, ListItem } from '@/common/components/List'
import { ListHeader } from '@/common/components/List/ListHeader'
import { SortHeader } from '@/common/components/List/SortHeader'
import { Tooltip, TooltipDefault } from '@/common/components/Tooltip'
import { Colors } from '@/common/constants'
import { Comparator } from '@/common/model/Comparator'
import { WorkingGroupsRoutes } from '@/working-groups/constants'

import { Validator } from '../types'

import { ValidatorItem } from './ValidatorItem'

interface ValidatorsListProps {
  validators: Validator[]
}

export const ValidatorsList = ({ validators }: ValidatorsListProps) => {
  type SortKey = 'address' | 'APR' | 'commission'
  const [sortBy, setSortBy] = useState<SortKey>('address')
  const [isDescending, setDescending] = useState(false)

  const sortedValidators = useMemo(
    () => validators.sort(Comparator<Validator>(isDescending, sortBy)[sortBy === 'address' ? 'string' : 'number']),
    [sortBy, isDescending, validators]
  )

  const onSort = (key: SortKey) => {
    if (key === sortBy) {
      setDescending(!isDescending)
    } else {
      setDescending(false)
      setSortBy(key)
    }
  }

  return (
    <ValidatorsListWrap>
      <ListHeaders>
        <SortHeader onSort={() => onSort('address')} isActive={sortBy === 'address'} isDescending={isDescending}>
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
        <SortHeader onSort={() => onSort('APR')} isActive={sortBy === 'APR'} isDescending={isDescending}>
          Expected Nom APR
          <Tooltip
            tooltipText={
              <p>
                This column shows the expected APR for nominators who are nominating funds for the chosen validator. The
                APR is subject to the amount staked and have a diminishing return for higher token amounts. This is
                calculated as follow: <code>Last reward extrapolated over a year</code> times{' '}
                <code>The nominator commission</code> divided by <code>The total staked by the validator</code>
              </p>
            }
          >
            <TooltipDefault />
          </Tooltip>
        </SortHeader>
        <SortHeader onSort={() => onSort('commission')} isActive={sortBy === 'commission'} isDescending={isDescending}>
          Commission
        </SortHeader>
      </ListHeaders>
      <List>
        {sortedValidators?.map((validator) => (
          <ListItem key={validator.address}>
            <ValidatorItem validator={validator} />
          </ListItem>
        ))}
      </List>
    </ValidatorsListWrap>
  )
}

const ValidatorsListWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 16px auto;
  grid-template-areas:
    'validatorstablenav'
    'validatorslist';
  grid-row-gap: 4px;
  width: 100%;

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
  grid-template-columns: 250px 100px 80px 120px 120px 140px 100px 90px;
  justify-content: space-between;
  width: 100%;
  padding: 0 16px;

  span {
    display: flex;
    justify-content: flex-end;
    gap: 4px;
  }
`
