import React, { useState } from 'react'
import styled from 'styled-components'
import { Membership } from '@joystream/types/members'

import { ButtonPrimary } from '../../../components/buttons'
import { AddMembershipModal } from './AddMembershipModal'
import { Member } from './Member'

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
  const [isCreateOpen, setCreateOpen] = useState(false)
  const hasMemberships = false

  if (!hasMemberships) {
    return (
      <>
        <h2>You have no active membership</h2>
        <p>
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim
          velit mollit. Exercitation veniam consequat sunt nostrud amet.
        </p>
        <ButtonPrimary onClick={() => setCreateOpen(true)}>Create membership</ButtonPrimary>
        {isCreateOpen && <AddMembershipModal onClose={() => setCreateOpen(false)} />}
      </>
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

const MembershipsList = styled.div``
const MembershipsListHeader = styled.div``
const MembershipsListItems = styled.div``
