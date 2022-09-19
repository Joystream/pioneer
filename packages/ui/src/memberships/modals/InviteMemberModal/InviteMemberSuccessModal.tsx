import React, { ReactNode } from 'react'

import { SuccessIcon } from '@/common/components/icons'
import { Loading } from '@/common/components/Loading'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { TextMedium } from '@/common/components/typography'
import { MemberRow } from '@/memberships/modals/components'

import { MemberInfo } from '../../components'
import { useMember } from '../../hooks/useMembership'
import { Member } from '../../types'
import { MemberFormFields } from '../BuyMembershipModal/BuyMembershipFormModal'

interface Props {
  onClose: () => void
  formData: MemberFormFields
}

type SuccessModalProps = { onClose: () => void; children: ReactNode }

const SuccessModal = ({ onClose, children }: SuccessModalProps) => {
  return (
    <Modal modalSize="m" modalHeight="s" onClose={onClose}>
      <ModalHeader onClick={onClose} title="Success" icon={<SuccessIcon />} />
      {children}
    </Modal>
  )
}

export function InviteMemberSuccessModal({ onClose, formData }: Props) {
  const invitorId = formData.invitor?.id || ''

  const { member: invitor, isLoading } = useMember(invitorId)
  const inviteCount = invitor?.inviteCount ?? 0
  const name = invitor?.name
  const plural = inviteCount > 1

  return (
    <SuccessModal onClose={onClose}>
      <ModalBody>
        <TextMedium>You have just successfully invited a member.</TextMedium>
        <MemberRow>
          <MemberInfo member={formData as unknown as Member} skipModal />
        </MemberRow>
        {isLoading && <Loading />}
        {!isLoading && inviteCount > 0 ? (
          <TextMedium>
            You still have {inviteCount} invitation{plural && 's'} left on the "{name}" membership.
          </TextMedium>
        ) : (
          <TextMedium>You have no invitations left on the "{name}" membership.</TextMedium>
        )}
      </ModalBody>
      <ModalFooter />
    </SuccessModal>
  )
}
