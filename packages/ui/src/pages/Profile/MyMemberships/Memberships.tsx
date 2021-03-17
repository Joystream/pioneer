import React, { ReactNode, useMemo, useState } from 'react'
import styled from 'styled-components'
import { BaseMember } from '../../../common/types'
import { ButtonsGroup } from '../../../components/buttons'
import { AddMembershipButton } from '../../../components/membership/AddMembershipButton'
import { Text } from '../../../components/typography'
import { Colors } from '../../../constants'
import { useMyMemberships } from '../../../hooks/useMyMemberships'
import { MemberItem } from './MemberItem'
import { SortKey, sortMemberships } from '../../../utils/sorting/sortMemberships'
import { setOrder } from './helpers'
import { HeaderText, SortIconDown, SortIconUp } from '../../../components/SortedListHeaders'
import { InviteMemberButton } from '../../../components/membership/InviteMemberButton'

export function Memberships() {
  const { count, isLoading, members, active } = useMyMemberships()
  const hasMemberships = !!count

  if (isLoading) {
    return <Loading>Loading...</Loading>
  }

  if (!hasMemberships) {
    return (
      <NoMemberships>
        <NoMembershipsInfo>
          <h3>You have no active membership</h3>
          <Text size={2}>
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim
            velit mollit. Exercitation veniam consequat sunt nostrud amet.
          </Text>
        </NoMembershipsInfo>
        <NoMembershipButton>Create a membership</NoMembershipButton>
      </NoMemberships>
    )
  }

  const otherMemberships = members.filter((member) => !active || active.handle !== member.handle)

  return (
    <MembershipsTables>
      <NewMembers>
        <InviteMemberButton size="medium">Invite a member</InviteMemberButton>
        <AddMembershipButton size="medium">Add Membership</AddMembershipButton>
      </NewMembers>
      {!!active && <MembersSection title="Active membership" members={[active]} />}
      {!!otherMemberships.length && <MembersSection title="Other memberships" members={otherMemberships} />}
    </MembershipsTables>
  )
}

interface MembersSectionProps {
  title: string
  members: BaseMember[]
}

const MembersSection = ({ title, members }: MembersSectionProps) => {
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
            <MemberItem member={member} key={member.handle} />
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

const NoMembershipButton = styled(AddMembershipButton)`
  grid-area: none;
  margin-top: 24px;
`

const NoMemberships = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 420px;
  margin: 124px auto 0;
`

const NoMembershipsInfo = styled.div`
  width: 100%;

  ${Text} {
    margin-top: 16px;
  }
`

const MembershipsTables = styled.div`
  display: grid;
  position: relative;
  grid-row-gap: 26px;
  width: 100%;
  padding-top: 12px;
`

const NewMembers = styled(ButtonsGroup)`
  position: absolute;
  right: 0;
  top: 0;
`

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

const Loading = styled.div`
  font-size: 2em;
`
