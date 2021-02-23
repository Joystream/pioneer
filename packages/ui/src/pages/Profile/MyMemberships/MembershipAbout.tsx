import React from 'react'
import styled from 'styled-components'
import { MemberFieldsFragment } from '../../../api/queries'
import { Avatar } from '../../../components/Avatar'
import { CloseButton } from '../../../components/buttons'
import { Colors } from '../../../constants'

interface MembershipAboutProps {
  member?: MemberFieldsFragment
  onClose: () => void
}

export const MembershipAbout = ({ onClose, member }: MembershipAboutProps) => {
  return (
    <SidePaneGlass>
      <SidePane>
        <SidePaneHeader>
          <CloseButton onClick={onClose} />
          <Avatar avatarURI={member?.avatarURI} />
        </SidePaneHeader>
        <SidePaneBody>
          <p>{''}</p>
          <h5>About</h5>
          <div>{member?.about || ''}</div>
        </SidePaneBody>
        <SidePaneFooter>...</SidePaneFooter>
      </SidePane>
    </SidePaneGlass>
  )
}

export const SidePaneGlass = styled.div`
  display: flex;
  justify-content: right;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: ${Colors.Black[700.75]};
  color: ${Colors.Black[900]};
  z-index: 100000;
`

const SidePane = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto auto;
  grid-template-areas:
    'sidepaneheader'
    'sidepanebody'
    'sidepanefooter';
  grid-area: modal;
  position: relative;
  background-color: ${Colors.White};
  width: 400px;
  height: 100vh;
`

const SidePaneHeader = styled.div`
  grid-area: sidepaneheader;
`

const SidePaneBody = styled.div`
  grid-area: sidepanebody;
`

const SidePaneFooter = styled.div`
  grid-area: sidepanefooter;
  background: #ccc;
`
