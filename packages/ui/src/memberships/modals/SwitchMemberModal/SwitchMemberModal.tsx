import React, { useMemo } from 'react'
import styled from 'styled-components'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { DetailsButton } from '@/common/components/buttons/DetailsButton'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { MyProfileIcon } from '@/common/components/page/Sidebar/LinksIcons'
import { DisconnectWalletIcon } from '@/common/components/page/Sidebar/LinksIcons/DisconnectWalletIcon'
import { SignOutIcon } from '@/common/components/page/Sidebar/LinksIcons/SignOutIcon'
import { BorderRad, Colors, RemoveScrollbar, Transitions } from '@/common/constants'
import { useModal } from '@/common/hooks/useModal'
import { DisconnectWalletModalCall } from '@/memberships/modals/DisconnectWalletModal'
import { SwitchMemberModalCall } from '@/memberships/modals/SwitchMemberModal/types'
import { sortMemberships } from '@/memberships/model/sortMemberships'

import { MemberDarkHover, MemberInfo, MembershipsCount } from '../../components'
import { useMyMemberships } from '../../hooks/useMyMemberships'
import { Member } from '../../types'
import { BuyMembershipModalCall } from '../BuyMembershipModal'
import { SignOutModalCall } from '../SignOutModal'

export const SwitchMemberModal = () => {
  const { members, setActive, active } = useMyMemberships()
  const { wallet } = useMyAccounts()
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
    const sortedMembers = sortMemberships(members, 'handle', false)
    if (modalData?.membersToShow) {
      return sortedMembers.filter((member) => modalData.membersToShow?.includes(member.id))
    }
    return sortedMembers
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
              <MemberInfo member={member} isOnDark skipModal />
            </MemberItem>
          ))}
        </MembersList>
      </SwitchModalBody>
      {!modalData?.noCreateButton && (
        <SwitchModalFooter>
          <DetailsButton
            withoutBackground
            icon={<MyProfileIcon />}
            onClick={() => {
              hideModal()
              showModal<BuyMembershipModalCall>({ modal: 'BuyMembership' })
            }}
            titleText="New Member"
            subtitleText="Create a New Membership"
          />
          {active ? (
            <>
              <DetailsButton
                icon={<SignOutIcon />}
                onClick={() => {
                  hideModal()
                  showModal<SignOutModalCall>({ modal: 'SignOut' })
                }}
                titleText="Sign Out"
                subtitleText="Sign out of the active Membership"
              />
              <DisconnectWrapper />
            </>
          ) : null}
          {wallet ? (
            <DetailsButton
              withoutBackground
              dangerText
              icon={<DisconnectWalletIcon />}
              onClick={() => {
                hideModal()
                showModal<DisconnectWalletModalCall>({ modal: 'DisconnectWallet' })
              }}
              titleText="Disconnect Wallet"
              subtitleText="Disconnect the active wallet"
            />
          ) : null}
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
const DisconnectWrapper = styled.div`
  position: relative;
  grid-row-gap: 16px;
  content: '';
  width: 100%;
  background-color: ${Colors.Black[700]};
  transform: translateX(-50%);
  left: 50%;
  height: 1px;
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
  max-height: 316px;
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
