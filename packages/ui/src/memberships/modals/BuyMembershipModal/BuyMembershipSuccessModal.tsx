import React from 'react'

import { ButtonGhost } from '@/common/components/buttons'
import { SuccessIcon } from '@/common/components/icons'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { TextMedium } from '@/common/components/typography'
import { warning } from '@/common/logger'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { MemberRow } from '@/memberships/modals/components'

import { MemberInfo } from '../../components'
import { Member } from '../../types'

import { MemberFormFields } from './BuyMembershipFormModal'

interface Props {
  onClose: () => void
  member: MemberFormFields
  memberId?: string
}

export const BuyMembershipSuccessModal = ({ onClose, member, memberId }: Props) => {
  const { setActive: setActiveMember, members } = useMyMemberships()

  const handleClose = () => {
    const newMember = members.find((member) => member.id === memberId?.toString())
    if (newMember) {
      setActiveMember(newMember)
    } else {
      warning('Could not find new member', memberId?.toString())
    }
    onClose()
  }

  return (
    <Modal modalSize="m" modalHeight="s" onClose={onClose}>
      <ModalHeader onClick={handleClose} title="Success" icon={<SuccessIcon />} />
      <ModalBody>
        <TextMedium>You have just successfully created a new membership</TextMedium>
        <MemberRow>
          <MemberInfo member={member as unknown as Member} skipModal />
        </MemberRow>
      </ModalBody>
      <ModalFooter>
        <ButtonGhost size="medium" disabled={!memberId} onClick={handleClose}>
          Done
        </ButtonGhost>
      </ModalFooter>
    </Modal>
  )
}
