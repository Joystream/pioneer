import React from 'react'
import styled from 'styled-components'
import { MemberFieldsFragment } from '../../../api/queries'
import { AddMembershipButton } from '../../../components/AddMembershipButton'
import { Text } from '../../../components/typography'
import { Colors } from '../../../constants'
import { useMembership } from '../../../hooks/useMembership'
import { MemberItem } from './MemberItem'

export function Memberships() {
  const { count, isLoading, members, active } = useMembership()
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
        <AddMembershipButton />
      </NoMemberships>
    )
  }

  const otherMemberships = members.filter((member) => !active || active.handle !== member.handle)

  return (
    <>
      {!!active && <MembersSection title="Active membership" members={[active]} />}
      {!!otherMemberships.length && <MembersSection title="Other memberships" members={otherMemberships} />}
    </>
  )
}

interface MembersSectionProps {
  title: string
  members: MemberFieldsFragment[]
}

const MembersSection = ({ title, members }: MembersSectionProps) => (
  <>
    <h6>{title}</h6>

    <MembershipsGroup>
      <ListHeaders>
        <ListHeader>Memberships</ListHeader>
        <ListHeader>Roles</ListHeader>
        <ListHeader>Slashed</ListHeader>
        <ListHeader>Terminated</ListHeader>
        <ListHeader>Invitations</ListHeader>
        <ListHeader>Invited</ListHeader>
      </ListHeaders>

      <MembershipsList>
        {members.map((member) => (
          <MemberItem member={member} key={member.handle} />
        ))}
      </MembershipsList>
    </MembershipsGroup>
  </>
)

const NoMemberships = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 24px;
  justify-items: center;
  justify-content: center;
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

const MembershipsGroup = styled.div`
  display: grid;
  grid-area: memberstable;
  grid-template-columns: 1fr;
  grid-template-rows: 16px auto;
  grid-template-areas:
    'accountstablenav'
    'accountslist';
  grid-row-gap: 6px;
  width: 100%;
`

const ListHeaders = styled.div`
  display: grid;
  grid-area: accountstablenav;
  grid-template-rows: 1fr;
  grid-template-columns: 260px 120px repeat(5, 80px);
  justify-content: space-between;
  width: 100%;
  padding-left: 16px;
`

const ListHeader = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  font-size: 10px;
  line-height: 16px;
  font-weight: 700;
  color: ${Colors.Black[400]};
  text-transform: uppercase;
  text-align: center;

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

    &:before {
      content: '';
      position: absolute;
      top: 8px;
      right: -15px;
      width: 4px;
      height: 4px;
      border: 1px solid ${Colors.Black[600]};
      border-left: 1px solid transparent;
      border-bottom: 1px solid transparent;
      transform: rotate(-45deg);
    }
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
