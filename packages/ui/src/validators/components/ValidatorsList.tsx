import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { List, ListItem } from '@/common/components/List'
import { ListHeader } from '@/common/components/List/ListHeader'
import { SortHeader } from '@/common/components/List/SortHeader'
import { Tooltip, TooltipDefault } from '@/common/components/Tooltip'
import { Colors } from '@/common/constants'

import { Validator } from '../types'

import { ValidatorItem } from './ValidatorItem'

interface ValidatorsListProps {
  validators: Validator[]
}

export const ValidatorsList = ({ validators }: ValidatorsListProps) => {
  const [sortByApr, setSortByApr] = useState<'asc' | 'desc' | undefined>(undefined)
  const [sortByCommission, setSortByCommission] = useState<'asc' | 'desc' | undefined>(undefined)
  const [sortedValidators, setSortedValidators] = useState<Validator[]>([])

  useEffect(() => {
    setSortedValidators(validators)
  }, [validators])

  useEffect(() => {
    if (!sortByApr) return
    setSortedValidators(sortedValidators.sort((a, b) => (sortByApr === 'desc' ? a.APR - b.APR : b.APR - a.APR)))
  }, [sortByApr])

  useEffect(() => {
    if (!sortByCommission) return
    setSortedValidators(
      sortedValidators.sort((a, b) =>
        sortByCommission === 'desc' ? a.commission - b.commission : b.commission - a.commission
      )
    )
  }, [sortByCommission])

  return (
    <ValidatorsListWrap>
      <ListHeaders>
        <ListHeader>Validator</ListHeader>
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
        <SortHeader
          onSort={() => {
            setSortByApr(!sortByApr ? 'desc' : sortByApr === 'desc' ? 'asc' : undefined)
          }}
          isActive={!!sortByApr}
          isDescending={sortByApr === 'desc'}
        >
          Expected Nom APR
          <Tooltip tooltipText="This column shows the expected APR for nominators who are nominating funds for the chosen validator. The APR is subject to the amount staked and have a diminishing return for higher token amounts.">
            <TooltipDefault />
          </Tooltip>
        </SortHeader>
        <SortHeader
          onSort={() => {
            setSortByCommission(!sortByCommission ? 'desc' : sortByCommission === 'desc' ? 'asc' : undefined)
          }}
          isActive={!!sortByCommission}
          isDescending={sortByCommission === 'desc'}
        >
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
