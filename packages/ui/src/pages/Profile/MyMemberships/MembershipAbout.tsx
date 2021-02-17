import React from 'react'
import styled from 'styled-components'
import { Member } from '../../../common/types'
import { CloseButton } from '../../../components/buttons'
import { Avatar } from '../../../components/MemberInfo'

interface MembershipAboutProps {
  member?: Member
  onClose: () => void
}

export const MembershipAbout = ({ onClose, member }: MembershipAboutProps) => {
  return (
    <SidePane>
      <CloseButton onClick={onClose} />
      <Avatar src={member?.avatarURI} />
      <p>{''}</p>
      <h5>About</h5>
      <div>{member?.about || ''}</div>
    </SidePane>
  )
}

const SidePane = styled.div`
  border: 1px solid #444;
  background: #aaa;
`
