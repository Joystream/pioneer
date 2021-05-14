import React, { Dispatch, ReactNode } from 'react'

import { Loading } from '@/common/components/Loading'

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
  console.log('my members', members)
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

  return (
    <div>
      <ListHeaders colLayout={colLayoutByType('Member')}>
        <SortHeader sortKey="id">Member ID</SortHeader>
        <SortHeader sortKey="handle">Member</SortHeader>
        <ListHeader>Concil Member</ListHeader>
        <ListHeader>Active Roles</ListHeader>
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
