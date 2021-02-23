import React from 'react'
import styled from 'styled-components'
import { Member } from '../../../common/types'
import { AddMembershipButton } from '../../../components/AddMembershipButton'
import { Text } from '../../../components/typography'
import { useMembership } from '../../../hooks/useMembership'
import { MemberItem } from './MemberItem'

export function Memberships() {
  const { count, loading, members } = useMembership()
  const hasMemberships = !!count

  if (loading) {
    return <div>Loading...</div>
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

  return (
    <>
      <h3>Other memberships</h3>

      <MembershipsList>
        <MembershipsListHeader>
          Memberships | Roles | Slashed | Terminated | Invitations | Invited
        </MembershipsListHeader>
        <MembershipsListItems>
          {members.map((member) => (
            <MemberItem member={(member as unknown) as Member} key={member.handle} />
          ))}
        </MembershipsListItems>
      </MembershipsList>
    </>
  )
}

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

const MembershipsList = styled.div``
const MembershipsListHeader = styled.div``
const MembershipsListItems = styled.div``
