import React, { useCallback } from 'react'
import styled from 'styled-components'

import { List } from '@/common/components/List'
import { ListHeader, ListHeaders } from '@/common/components/List/ListHeader'
import { Loading } from '@/common/components/Loading'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { HeaderText, SortIconDown, SortIconUp } from '@/common/components/SortedListHeaders'
import { CouncilColLayout } from '@/council/constants/styles'

import { CouncilListItem, CouncilListItemProps } from './CouncilListItem'

type CouncilOrderKey = keyof CouncilListItemProps['councilor']
export interface CouncilOrder {
  key: CouncilOrderKey
  isDescending?: boolean
}

const HEADERS: [string, CouncilOrderKey?][] = [
  ['Member', 'member'],
  ['Owed Reward', 'unpaidReward'],
  ['Voters Stake', 'stake'],
  ['Elected', 'numberOfTerms'],
]

export interface CouncilListProps {
  councilors: CouncilListItemProps['councilor'][]
  order: CouncilOrder
  onSort: (order: CouncilOrder) => void
  isLoading?: boolean
}
export const CouncilList = ({ councilors, order, onSort, isLoading }: CouncilListProps) => {
  const sort = useCallback(
    (key: CouncilOrderKey) => onSort({ key, isDescending: order.key === key && !order.isDescending }),
    [order, onSort]
  )
  return (
    <CouncilListStyles gap={4}>
      <ListHeaders $colLayout={CouncilColLayout}>
        {HEADERS.map(([title, key], index) => (
          <ListHeader key={index} onClick={key && (() => sort(key))}>
            <HeaderText>
              {title}
              {order.key === key && (order.isDescending ? <SortIconDown /> : <SortIconUp />)}
            </HeaderText>
          </ListHeader>
        ))}
      </ListHeaders>

      {isLoading ? (
        <Loading />
      ) : (
        <List>
          {councilors.map((councilor, index) => (
            <CouncilListItem key={index} councilor={councilor} />
          ))}
        </List>
      )}
    </CouncilListStyles>
  )
}

const CouncilListStyles = styled(RowGapBlock)`
  ${ListHeaders} {
    padding: 0 58px 0 24px;

    & > :nth-child(n + 2) {
      justify-self: end;
    }
  }
`
