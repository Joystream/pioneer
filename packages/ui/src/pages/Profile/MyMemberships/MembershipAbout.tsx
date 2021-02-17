import React from 'react'
import styled from 'styled-components'
import { Member } from '../../../common/types'
import { Avatar } from '../../../components/Avatar'
import { CloseButton } from '../../../components/buttons'

interface MembershipAboutProps {
  member?: Member
  onClose: () => void
}

export const MembershipAbout = ({ onClose, member }: MembershipAboutProps) => {
  return (
    <SidePane>
      <CloseButton onClick={onClose} />
      <Avatar avatarURI={member?.avatarURI} />
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
