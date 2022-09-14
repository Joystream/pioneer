import React from 'react'

import { MembershipOrderByInput } from '@/common/api/queries'
import { Loader } from '@/common/components/icons'
import { List, ListItem } from '@/common/components/List'
import { ListHeader, ListHeaders } from '@/common/components/List/ListHeader'
import { SortHeader } from '@/common/components/List/SortHeader'
import { NotFoundText } from '@/common/components/typography/NotFoundText'
import { GetSortProps } from '@/common/hooks/useSort'

import { MemberWithDetails } from '../../types'
import { MemberListItem } from '../MemberListItem'
import { colLayoutByType } from '../MemberListItem/Fields'

interface MemberListProps {
  members: MemberWithDetails[]
  isLoading?: boolean
  getSortProps: GetSortProps<MembershipOrderByInput>
}

export const MemberList = ({ isLoading, members, getSortProps }: MemberListProps) => {
  if (isLoading) {
    return <Loader />
  }

  if (members.length < 1) {
    return <NotFoundText>No results</NotFoundText>
  }

  return (
    <div>
      <ListHeaders $colLayout={colLayoutByType('Member')}>
        <SortHeader {...getSortProps('handle')}>Memberships</SortHeader>
        <ListHeader>Roles</ListHeader>
        <ListHeader>Created</ListHeader>
        <ListHeader>Referrer</ListHeader>
        <ListHeader>Slashed</ListHeader>
        <ListHeader>Terminated</ListHeader>
        <ListHeader>Total Balance</ListHeader>
        <ListHeader>Total Staked</ListHeader>
      </ListHeaders>
      <List>
        {members.map((member) => (
          <ListItem key={member.handle} borderless>
            <MemberListItem member={member} />
          </ListItem>
        ))}
      </List>
    </div>
  )
}
