import React, { ReactNode, useMemo, useState } from 'react'
import styled from 'styled-components'

import { HeaderText, SortIconDown, SortIconUp } from '../../common/components/SortedListHeaders'
import { Colors } from '../../common/constants'
import { setOrder, SortKey, sortMemberships } from '../model/sortMemberships'
import { BaseMember } from '../types'

import { MemberListItem } from './MemberListItem/MemberListItem'

interface MembersSectionProps {
  title: string
  members: BaseMember[]
}

export const MembersSection = ({ title, members }: MembersSectionProps) => {
  const [sortBy, setSortBy] = useState<SortKey>('handle')
  const [isDescending, setDescending] = useState(false)
  const sortedMemberships = useMemo(() => sortMemberships(members, sortBy, isDescending), [
    members,
    sortBy,
    isDescending,
  ])
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

        <MembershipsList>
          {sortedMemberships.map((member) => (
            <MemberListItem member={member} key={member.handle} />
          ))}
        </MembershipsList>
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
const ListHeaders = styled.div`
  display: grid;
  grid-area: accountstablenav;
  grid-template-rows: 1fr;
  grid-template-columns: 194px 200px 76px 76px 96px 76px 54px;
  justify-content: space-between;
  width: 100%;
  padding-left: 16px;
`
const ListHeader = styled.span`
  display: flex;
  align-items: center;
  align-content: center;
  width: fit-content;
  font-size: 10px;
  line-height: 16px;
  font-weight: 700;
  color: ${Colors.Black[400]};
  text-transform: uppercase;
  text-align: left;
  user-select: none;
  cursor: pointer;

  &:first-child {
    justify-content: flex-start;
    text-align: left;
  }
  &:nth-child(2) {
    justify-content: flex-start;
    text-align: left;
  }
  &:last-child {
    position: relative;
  }
`
const MembershipsList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
`
