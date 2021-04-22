import React from 'react'
import styled from 'styled-components'

import { MemberDarkHover, MemberInfo, MembershipsCount } from '..'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../../common/components/Modal'
import { Notification, NotificationComponent } from '../../../common/components/Notification'
import { BorderRad, Colors, Transitions } from '../../../common/constants'
import { useMyMemberships } from '../../hooks/useMyMemberships'
import { Member } from '../../types'
import { AddMembershipButtonSwitch } from '../AddMembershipButtonSwitch'

interface Props {
  onClose: () => void
  onCreateMember: () => void
}

export const SwitchMemberModal = ({ onClose, onCreateMember }: Props) => {
  const { members, setActive, active } = useMyMemberships()
  const count = members.length
  const switchMember = (member: Member) => {
    setActive(member)
    onClose()
  }

  return (
    <Modal modalSize="xs" modalHeight="s" isDark onClose={onClose}>
      <SwitchModalHeader title="Select Membership" onClick={onClose} modalHeaderSize="s" />
      <SwitchModalBody>
        <MembershipsCount count={count} />
        <MembersList>
          {members.map((member) => (
            <MemberItem
              key={member.handle}
              onClick={() => switchMember(member)}
              isMemberActive={active?.handle === member.handle}
            >
              <MemberInfo member={member} isOnDark={true} />
              <Notification />
            </MemberItem>
          ))}
        </MembersList>
      </SwitchModalBody>
      <SwitchModalFooter>
        <AddMembershipButtonSwitch
          onClick={() => {
            onClose()
            onCreateMember()
          }}
        />
      </SwitchModalFooter>
    </Modal>
  )
}

const SwitchModalHeader = styled(ModalHeader)`
  padding: 16px 16px 0;
`

const SwitchModalBody = styled(ModalBody)`
  position: relative;
  padding: 16px;
  grid-row-gap: 16px;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: calc(100% - 32px);
    height: 1px;
    background-color: ${Colors.Black[700]};
    transform: translateX(-50%);
  }
`

const SwitchModalFooter = styled(ModalFooter)`
  width: 100%;
  height: auto;
  padding: 16px;
`

const MembersList = styled.ul<{ memberIndicatorOffset?: string }>`
  display: flex;
  flex-direction: column;
  width: calc(100% + 16px);
  height: 100%;
  max-height: 192px;
  margin-left: -16px;
  padding-left: 16px;
  overflow: hidden;
  overflow-y: scroll;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

const MemberItem = styled.li<{ isMemberActive: boolean }>`
  display: grid;
  position: relative;
  grid-template-columns: 1fr 16px;
  grid-column-gap: 8px;
  align-items: center;
  width: 100%;
  height: 100%;
  max-height: 64px;
  padding: 12px 16px;
  border-radius: ${BorderRad.s};
  transition: ${Transitions.all};
  cursor: pointer;

  &:hover,
  &:focus {
    outline: none;
    background-color: ${Colors.Black[600]};

    ${NotificationComponent} {
      color: ${Colors.White};
    }
    ${MemberDarkHover}
  }

  &:before {
    content: '';
    display: ${({ isMemberActive }) => (isMemberActive ? 'block' : 'none')};
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background-color: ${Colors.Blue[500]};
    transform: translateX(-16px);
  }
`
