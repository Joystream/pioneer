import React, { Dispatch, ReactNode } from 'react'

import { Loading } from '@/common/components/Loading'
import { TextMedium } from '@/common/components/typography'

import { List, ListItem } from '../../../common/components/List'
import { ListHeader, ListHeaders } from '../../../common/components/List/ListHeader'
import { HeaderText, SortIconDown, SortIconUp } from '../../../common/components/SortedListHeaders'
import { MemberListOrder } from '../../hooks/useMembers'
import { Member } from '../../types'
import { MemberListItem } from '../MemberListItem'
import { colLayoutByType } from '../MemberListItem/Fileds'

type SortKey = MemberListOrder['sortBy']
interface MemberListProps {
  members: Member[]
  isLoading?: boolean
  order?: MemberListOrder
  onSort?: Dispatch<SortKey>
}

export const MemberList = ({ isLoading, members, order, onSort }: MemberListProps) => {
  const SortHeader =
    order && onSort && members.length > 1
      ? ({ children, sortKey }: { children: ReactNode; sortKey: SortKey }) => (
          <ListHeader onClick={() => onSort(sortKey)}>
            <HeaderText>
              {children}
              {order.sortBy === sortKey && (order.isDescending ? <SortIconDown /> : <SortIconUp />)}
            </HeaderText>
          </ListHeader>
        )
      : ListHeader

  if (isLoading) {
    return <Loading />
  }

  if (members.length < 1) {
    return (
      <div>
        <TextMedium>No results</TextMedium>
      </div>
    )
  }

  return (
    <div>
      <ListHeaders colLayout={colLayoutByType('Member')}>
        <SortHeader sortKey="id">ID</SortHeader>
        <SortHeader sortKey="handle">Memeberships</SortHeader>
        <ListHeader>Council Member</ListHeader>
        <ListHeader>Roles</ListHeader>
        <ListHeader>Slashed</ListHeader>
        <ListHeader>Terminated</ListHeader>
        <ListHeader>Total Balance</ListHeader>
        <ListHeader>Total Staked</ListHeader>
      </ListHeaders>
      <List>
        {members.map((member) => (
          <ListItem key={member.handle}>
            <MemberListItem member={member} />
          </ListItem>
        ))}
      </List>
    </div>
  )
}
