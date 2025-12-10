import BN from 'bn.js'
import React, { useMemo, useState } from 'react'
import styled from 'styled-components'

import { Account } from '@/accounts/types'
import { ButtonPrimary } from '@/common/components/buttons'
import { List, ListItem } from '@/common/components/List'
import { Tabs } from '@/common/components/Tabs'
import { Colors } from '@/common/constants'
import { useModal } from '@/common/hooks/useModal'
import { MyStakingRole, MyStashPosition } from '@/validators/hooks/useMyStashPositions'
import { BondModalCall } from '@/validators/modals/BondModal'
import { ValidatorWithDetails } from '@/validators/types/Validator'

import { NorminatorDashboardItem } from './NominatorItems'

type FilterKey = 'all' | MyStakingRole

export interface Props {
  positions: MyStashPosition[]
  accountsMap: Map<string, Account>
  validatorsMap: Map<string, ValidatorWithDetails>
  totalStake: BN
  totalClaimable: BN
  className?: string
  showFilter?: boolean
  tabsSize?: React.ComponentProps<typeof Tabs>['tabsSize']
}

const hasNonZeroStake = (position: MyStashPosition) => {
  if (!position.totalStake.isZero() || !position.activeStake.isZero()) {
    return true
  }

  return position.unlocking.some((chunk) => !chunk.value.isZero())
}

export const NominatorPositionsTable = ({
  positions,
  accountsMap,
  validatorsMap,
  totalStake,
  totalClaimable,
  className,
  showFilter = true,
  tabsSize = 'xs',
}: Props) => {
  const { showModal } = useModal()
  const positionsWithStake = useMemo(() => positions.filter((position) => hasNonZeroStake(position)), [positions])

  const [filter, setFilter] = useState<FilterKey>('all')

  const handleBond = () => {
    showModal<BondModalCall>({ modal: 'Bond' })
  }

  const counts = useMemo(() => {
    return positionsWithStake.reduce(
      (acc, position) => {
        acc.all += 1
        acc[position.role] += 1
        return acc
      },
      {
        all: 0,
        validator: 0,
        nominator: 0,
        inactive: 0,
      } as Record<FilterKey, number>
    )
  }, [positionsWithStake])

  const filteredPositions = useMemo(() => {
    let filtered = positionsWithStake
    if (filter !== 'all') {
      filtered = filtered.filter((position) => position.role === filter)
    }
    // Sort validators to the top
    return [...filtered].sort((a, b) => {
      if (a.role === 'validator' && b.role !== 'validator') return -1
      if (a.role !== 'validator' && b.role === 'validator') return 1
      return 0
    })
  }, [positionsWithStake, filter])

  const filterTabs = useMemo(
    () =>
      [
        {
          title: 'All Stashes',
          key: 'all' as FilterKey,
          count: counts.all,
        },
        {
          title: 'Nominators',
          key: 'nominator' as FilterKey,
          count: counts.nominator,
        },
        {
          title: 'Validators',
          key: 'validator' as FilterKey,
          count: counts.validator,
        },
        {
          title: 'Inactive',
          key: 'inactive' as FilterKey,
          count: counts.inactive,
        },
      ].map(({ title, key, count }) => ({
        title,
        count,
        active: filter === key,
        onClick: () => setFilter(key),
      })),
    [counts, filter]
  )

  return (
    <Wrapper className={className}>
      {showFilter && (
        <FilterRow>
          <TabsContainer>
            <Tabs tabs={filterTabs} tabsSize={tabsSize} />
          </TabsContainer>
          <BondButtonContainer>
            <ButtonPrimary size="small" onClick={handleBond}>
              Bond
            </ButtonPrimary>
          </BondButtonContainer>
        </FilterRow>
      )}
      <ListHeaders>
        <ListHeader>Role</ListHeader>
        <ListHeader>Stash</ListHeader>
        <ListHeader>Controller</ListHeader>
        <ListHeader>Rewards</ListHeader>
        <ListHeader>Bonded</ListHeader>
        <ListHeader>Nominations</ListHeader>
        <ListHeader>Claimable Reward</ListHeader>
        <ListHeader />
        <ListHeader />
        <ListHeader />
      </ListHeaders>
      <StyledList>
        {filteredPositions.map((position) => (
          <ListItem key={position.stash} borderless>
            <NorminatorDashboardItem
              account={accountsMap.get(position.stash)}
              position={position}
              validatorDetails={validatorsMap.get(position.stash)}
              totalStaked={totalStake}
              totalClaimable={totalClaimable}
            />
          </ListItem>
        ))}
      </StyledList>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 16px auto;
  grid-template-areas:
    'validatorstablenav'
    'validatorstableheaders'
    'validatorslist';
  grid-row-gap: 4px;
  width: 100%;
`

const FilterRow = styled.div`
  grid-area: validatorstablenav;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`

const TabsContainer = styled.div`
  flex: 1;
`

const BondButtonContainer = styled.div`
  display: flex;
  align-items: center;
`

const StyledList = styled(List)`
  grid-area: validatorslist;
`

const ListHeaders = styled.div`
  display: grid;
  grid-area: validatorstableheaders;
  grid-template-rows: 1fr;
  grid-template-columns: 100px 210px 240px 120px 180px 140px 140px 40px 40px 40px;
  justify-content: space-between;
  justify-items: center;
  width: 100%;
  padding: 0 8px;
`

const ListHeader = styled.span`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  align-content: center;
  justify-self: start;
  width: fit-content;
  font-size: 10px;
  line-height: 16px;
  font-weight: 700;
  color: ${Colors.Black[400]};
  text-transform: uppercase;
  text-align: right;
  user-select: none;

  &:first-child {
    text-align: left;
    justify-self: start;
  }
`
