import React, { useState } from 'react'
import styled from 'styled-components'
import { Member } from '../../../common/types'
import { Avatar } from '../../../components/Avatar'
import { ButtonGhostMediumSquare } from '../../../components/buttons'
import { MembershipAbout } from './MembershipAbout'

interface MemberProps {
  member: Member
}

export const MemberItem = ({ member }: MemberProps) => {
  const [isAboutOpen, setAboutOpen] = useState(false)

  return (
    <div>
      <div>
        <Avatar avatarURI={member.avatarURI} />
        <MemberHandle onClick={() => setAboutOpen(true)}>{member.handle}</MemberHandle>
      </div>
      <ButtonGhostMediumSquare>Edit</ButtonGhostMediumSquare>
      {isAboutOpen && <MembershipAbout member={member} onClose={() => setAboutOpen(false)} />}
    </div>
  )
}

const MemberHandle = styled.a`
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
`
