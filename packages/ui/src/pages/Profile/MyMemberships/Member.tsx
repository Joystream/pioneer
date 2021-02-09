import { Membership } from '@joystream/types/members'
import React, { useState } from 'react'
import styled from 'styled-components'
import { ButtonGhostMediumSquare } from '../../../components/buttons'
import { MembershipAbout } from './MembershipAbout'

interface MemberProps {
  member: Membership
}

export const Member = ({ member }: MemberProps) => {
  const [isAboutOpen, setAboutOpen] = useState(false)

  return (
    <div>
      <Avatar src={member.handle_hash.toString()} />
      <MemberHandle onClick={() => setAboutOpen(true)}>{member.handle_hash}</MemberHandle>
      <p>0 times</p>
      <ButtonGhostMediumSquare>Edit</ButtonGhostMediumSquare>
      {isAboutOpen && <MembershipAbout member={member} onClose={() => setAboutOpen(false)} />}
    </div>
  )
}

export const Avatar = styled.img`
  border-radius: 50%;
`

const MemberHandle = styled.a`
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
`
