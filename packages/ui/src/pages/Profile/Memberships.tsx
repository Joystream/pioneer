import { Membership } from '@joystream/types/members'
import React, { useState } from 'react'
import styled from 'styled-components'
import { ButtonGhostMediumSquare, ButtonPrimary } from '../../components/buttons/Buttons'
import { Close } from '../../components/buttons/CloseButton'
import { CrossIcon } from '../../components/icons/CrossIcon'

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
  const hasMemberships = true

  if (!hasMemberships) {
    return (
      <>
        <h2>You have no active membership</h2>
        <p>
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim
          velit mollit. Exercitation veniam consequat sunt nostrud amet.
        </p>
        <ButtonPrimary>Create membership</ButtonPrimary>
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

interface MemberProps {
  member: Membership
}

const Member = ({ member }: MemberProps) => {
  const [isAboutOpen, setAboutOpen] = useState(false)

  return (
    <div>
      <Avatar src={member.avatar_uri.toString()} />
      <p>{member.handle}</p>
      <p>0 times</p>
      <ButtonGhostMediumSquare onClick={() => setAboutOpen(true)}>Edit</ButtonGhostMediumSquare>
      {isAboutOpen && <MembershipAbout member={member} onClose={() => setAboutOpen(false)} />}
    </div>
  )
}

interface MembershipAboutProps extends MemberProps {
  onClose: () => void
}

const MembershipAbout = ({ member, onClose }: MembershipAboutProps) => {
  return (
    <div>
      <Close onClick={onClose}>
        <CrossIcon />
      </Close>
      <Avatar src={member.avatar_uri.toString()} />
      <p>{member.handle}</p>
      <h5>About</h5>
      <div>{member.about}</div>
    </div>
  )
}

const Avatar = styled.img`
  border-radius: 50%;
`

const MembershipsList = styled.div``
const MembershipsListHeader = styled.div``
const MembershipsListItems = styled.div``
