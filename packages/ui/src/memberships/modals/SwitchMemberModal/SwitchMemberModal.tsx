import React, { useMemo } from 'react'
import styled from 'styled-components'

import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { Notification, NotificationComponent } from '@/common/components/Notification'
import { BorderRad, Colors, RemoveScrollbar, Transitions } from '@/common/constants'
import { useModal } from '@/common/hooks/useModal'
import { SwitchMemberModalCall } from '@/memberships/modals/SwitchMemberModal/types'

import { MemberDarkHover, MemberInfo, MembershipsCount } from '../../components'
import { AddMembershipButtonSwitch } from '../../components/AddMembershipButtonSwitch'
import { SignOutButton } from '../../components/SignOutButton'
import { useMyMemberships } from '../../hooks/useMyMemberships'
import { Member } from '../../types'
import { BuyMembershipModalCall } from '../BuyMembershipModal'
import { SignOutModalCall } from '../SignOutModal'

export const SwitchMemberModal = () => {
  const { members, setActive, active } = useMyMemberships()
  const { showModal, hideModal, modalData } = useModal<SwitchMemberModalCall>()
  const count = modalData?.membersToShow ? modalData.membersToShow.length : members.length
  const switchMember = (member: Member) => {
    setActive(member)
    hideModal()
    if (modalData?.originalModalName) {
      showModal({ modal: modalData.originalModalName, data: modalData?.originalModalData })
    }
  }

  const filteredMembers = useMemo(() => {
    if (modalData?.membersToShow) {
      return members.filter((member) => modalData.membersToShow?.includes(member.id))
    }

    return members
  }, [members, modalData?.membersToShow])

  return (
    <Modal modalSize="xs" modalHeight="s" isDark onClose={hideModal}>
      <SwitchModalHeader title="Select Membership" onClick={hideModal} modalHeaderSize="s" />
      <SwitchModalBody>
        <MembershipsCount count={count} />
        <MembersList>
          {filteredMembers.map((member) => (
            <MemberItem
              key={member.handle}
              onClick={() => switchMember(member)}
              isMemberActive={active?.handle === member.handle}
            >
              <MemberInfo member={member} isOnDark={true} skipModal />
              <Notification />
            </MemberItem>
          ))}
        </MembersList>
      </SwitchModalBody>
      {!modalData?.noCreateButton && (
        <SwitchModalFooter>
          <AddMembershipButtonSwitch
            onClick={() => {
              hideModal()
              showModal<BuyMembershipModalCall>({ modal: 'BuyMembership' })
            }}
          />
          <SignOutButton
            onClick={() => {
              hideModal()
              showModal<SignOutModalCall>({ modal: 'SignOut' })
            }}
          />
        </SwitchModalFooter>
      )}
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
  grid-auto-flow: row;
  justify-items: start;
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
