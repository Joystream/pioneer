import React, { useState } from 'react'
import styled from 'styled-components'
import { Member } from '../modals/AddMembershipModal/MembershipFormModal'
import { MembershipAbout } from '../pages/Profile/MyMemberships/MembershipAbout'

interface Props {
  member: Member
}

export const MemberInfo = ({ member }: Props) => {
  const [isAboutOpen, setAboutOpen] = useState(false)

  return (
    <>
      <div>
        <Avatar src={member.avatarURI} />
        <MemberHandle onClick={() => setAboutOpen(true)}>{member.handle}</MemberHandle>
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
