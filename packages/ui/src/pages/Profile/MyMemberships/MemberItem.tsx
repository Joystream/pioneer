import React, { useState } from 'react'
import styled from 'styled-components'
import { ButtonGhostMediumSquare } from '../../../components/buttons'
import { Member } from '../../../modals/AddMembershipModal/MembershipFormModal'
import { MembershipAbout } from './MembershipAbout'

interface MemberProps {
  member: Member
}

export const MemberItem = ({ member }: MemberProps) => {
  return (
    <div>
      <MemberInfo member={member} />
      <ButtonGhostMediumSquare>Edit</ButtonGhostMediumSquare>
    </div>
  )
}

export const MemberInfo = ({ member }: MemberProps) => {
  const [isAboutOpen, setAboutOpen] = useState(false)

  return (
    <>
      <div>
        <Avatar src={member.avatarURI} />
        <MemberHandle onClick={() => setAboutOpen(true)}>{member.handle}</MemberHandle>
        <p>0 times</p>
      </div>
      {isAboutOpen && <MembershipAbout member={member} onClose={() => setAboutOpen(false)} />}
    </>
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
