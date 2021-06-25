import React from 'react'
import styled from 'styled-components'

import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../../common/components/Modal'
import { Notification, NotificationComponent } from '../../../common/components/Notification'
import { BorderRad, Colors, RemoveScrollbar, Transitions } from '../../../common/constants'
import { useModal } from '../../../common/hooks/useModal'
import { MemberDarkHover, MemberInfo, MembershipsCount } from '../../components'
import { AddMembershipButtonSwitch } from '../../components/AddMembershipButtonSwitch'
import { useMyMemberships } from '../../hooks/useMyMemberships'
import { Member } from '../../types'
import { BuyMembershipModalCall } from '../BuyMembershipModal'

export const SwitchMemberModal = () => {
  const { members, setActive, active } = useMyMemberships()
  const { showModal, hideModal } = useModal()
  const count = members.length
  const switchMember = (member: Member) => {
    setActive(member)
    hideModal()
  }

  return (
    <Modal modalSize="xs" modalHeight="s" isDark onClose={hideModal}>
      <SwitchModalHeader title="Select Membership" onClick={hideModal} modalHeaderSize="s" />
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
            hideModal()
            showModal<BuyMembershipModalCall>({ modal: 'BuyMembership' })
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
  ${RemoveScrollbar};
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
