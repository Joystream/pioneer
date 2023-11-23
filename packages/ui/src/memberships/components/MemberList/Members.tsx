import React from 'react'
import styled from 'styled-components'

import { MembershipOrderByInput } from '@/common/api/queries'
import { List, ListItem } from '@/common/components/List'
import { ListHeader, ListHeaders } from '@/common/components/List/ListHeader'
import { SortHeader } from '@/common/components/List/SortHeader'
import { Loading } from '@/common/components/Loading'
import { NotFoundText } from '@/common/components/typography/NotFoundText'
import { GetSortProps } from '@/common/hooks/useSort'
import { MemberSearchFilter } from '@/memberships/components/MemberListFilters'

import { MemberWithDetails } from '../../types'
import { MemberListItem } from '../MemberListItem'
import { colLayoutByType } from '../MemberListItem/Fields'

interface MemberListProps {
  members: MemberWithDetails[]
  isLoading?: boolean
  getSortProps: GetSortProps<MembershipOrderByInput>
  searchFilter: MemberSearchFilter
}

export const MemberList = ({ isLoading, members, getSortProps, searchFilter }: MemberListProps) => {
  if (isLoading) {
    return <Loading />
  }

  if (members.length < 1) {
    return <NotFoundText>No results</NotFoundText>
  }

  return (
    <MemberListWrapper>
      <ListHeadersWrapper $colLayout={colLayoutByType('Member')}>
        <SortHeader {...getSortProps('handle')}>Memberships</SortHeader>
        <ListHeader>Roles</ListHeader>
        <ListHeader>Created</ListHeader>
        <ListHeader>Referrer</ListHeader>
        <ListHeader>Slashed</ListHeader>
        <ListHeader>Terminated</ListHeader>
        <ListHeader>Total Balance</ListHeader>
        <ListHeader>Total Staked</ListHeader>
      </ListHeadersWrapper>
      <List>
        {members.map((member) => (
          <ListItem key={member.handle} borderless>
            <MemberListItem member={member} searchFilter={searchFilter} />
          </ListItem>
        ))}
      </List>
    </MemberListWrapper>
  )
}

const MemberListWrapper = styled.div`
  overflow: auto;
`

const ListHeadersWrapper = styled(ListHeaders)`
  padding: 0 24px;
  column-gap: 16px;
`
