import { Membership } from '@joystream/types/members'
import React from 'react'
import styled from 'styled-components'
import { AddMembershipButton } from '../../../components/AddMembershipButton'
import { Member } from './Member'
import { Text } from '../../../components/typography/Text'

const bob = ({
  handle: 'Bob member',
  avatar_uri: 'https://www.gravatar.com/avatar/50284e458f1aa6862cc23a26fdcc3db1?s=46',
  about:
    'I am part of the team building the Joystream network. Feel free to follow me on twitter, or contact me on telegram! @bob on both.',
} as unknown) as Membership
const dave = ({
  handle: 'Dave member',
  avatar_uri: 'https://www.gravatar.com/avatar/50284e458f1aa6862cc23a26fdcc3db1?s=46',
  about:
    'I am part of the team building the Joystream network. Feel free to follow me on twitter, or contact me on telegram! @dave on both.',
} as unknown) as Membership
const alice = ({
  handle: 'Alice member',
  avatar_uri: 'https://www.gravatar.com/avatar/50284e458f1aa6862cc23a26fdcc3db1?s=46',
  about:
    'I am part of the team building the Joystream network. Feel free to follow me on twitter, or contact me on telegram! @alice on both.',
} as unknown) as Membership

export function Memberships() {
  const hasMemberships = false

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

  const memberships = {
    active: bob,
    all: [dave, alice],
  }

  return (
    <>
      <h3>Active membership</h3>

      <MembershipsList>
        <MembershipsListHeader>
          Memberships | Roles | Slashed | Terminated | Invitations | Invited
        </MembershipsListHeader>
        <MembershipsListItems>
          <Member member={memberships.active} />
        </MembershipsListItems>
      </MembershipsList>

      <h3>Other memberships</h3>

      <MembershipsList>
        <MembershipsListHeader>
          Memberships | Roles | Slashed | Terminated | Invitations | Invited
        </MembershipsListHeader>
        <MembershipsListItems>
          {memberships.all.map((member) => (
            <Member member={member} />
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
