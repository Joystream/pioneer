import React, { ReactNode, useMemo, useState } from 'react'
import styled from 'styled-components'

import { List, ListItem } from '../../common/components/List'
import { ListHeader, ListHeaders } from '../../common/components/List/ListHeader'
import { HeaderText, SortIconDown, SortIconUp } from '../../common/components/SortedListHeaders'
import { setOrder, SortKey, sortMemberships } from '../model/sortMemberships'
import { Member, Membership } from '../types'

import { MyMemberListItem } from './MemberListItem'

interface MembersSectionProps {
  title: string
  members: Member[]
}

export const MembersSection = ({ title, members }: MembersSectionProps) => {
  const [sortBy, setSortBy] = useState<SortKey>('handle')
  const [isDescending, setDescending] = useState(false)
  const sortedMemberships = useMemo(() => sortMemberships(members, sortBy, isDescending), [
    members,
    sortBy,
    isDescending,
  ]) as Membership[]
  const getOnSort = (key: SortKey) => () => setOrder(key, sortBy, setSortBy, isDescending, setDescending)
  const Header = ({ children, sortKey }: HeaderProps) => {
    return (
      <ListHeader onClick={sortKey && getOnSort(sortKey)}>
        <HeaderText>
          {children}
          {sortBy === sortKey && (isDescending ? <SortIconDown /> : <SortIconUp />)}
        </HeaderText>
      </ListHeader>
    )
  }
  const canSort = sortedMemberships.length > 1

  return (
    <>
      <MembershipsTableTitle>{title}</MembershipsTableTitle>

      <MembershipsGroup>
        <ListHeaders>
          <Header sortKey={canSort ? 'handle' : undefined}>Memeberships</Header>
          <ListHeader>Roles</ListHeader>
          <ListHeader>Slashed</ListHeader>
          <ListHeader>Terminated</ListHeader>
          <Header sortKey={canSort ? 'inviteCount' : undefined}>Invitations</Header>
          <ListHeader>Invited</ListHeader>
        </ListHeaders>

        <List>
          {sortedMemberships.map((member) => (
            <ListItem key={member.handle}>
              <MyMemberListItem member={member} />
            </ListItem>
          ))}
        </List>
      </MembershipsGroup>
    </>
  )
}

interface HeaderProps {
  children: ReactNode
  sortKey?: SortKey
}

const MembershipsTableTitle = styled.h6`
  margin-top: 4px;
`
const MembershipsGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 16px auto;
  grid-template-areas:
    'accountstablenav'
    'accountslist';
  grid-row-gap: 5px;
  width: 100%;
`
