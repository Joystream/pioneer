import React, { ReactNode } from 'react'
import styled from 'styled-components'

import { SuccessIcon } from '../../../common/components/icons'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../../common/components/Modal'
import { TextMedium } from '../../../common/components/typography'
import { BorderRad, Colors, Sizes } from '../../../common/constants'
import { MemberInfo } from '../../components'
import { useGetMemberQuery } from '../../queries'
import { BaseMember, Member } from '../../types'

interface Props {
  onClose: () => void
  member: Member
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

export function InviteMemberSuccessModal({ onClose, member }: Props) {
  const invitorId = member.invitor?.id || ''
  const { data: invitor, loading } = useGetMemberQuery({ variables: { id: invitorId } })
  const inviteCount = invitor?.membership?.inviteCount ?? 0
  const name = invitor?.membership?.name
  const plural = inviteCount > 1

  return (
    <SuccessModal onClose={onClose}>
      <ModalBody>
        <TextMedium>You have just successfully invited a member.</TextMedium>
        <MemberRow>
          <MemberInfo member={(member as unknown) as BaseMember} />
        </MemberRow>
        {loading && <TextMedium>Loading...</TextMedium>}
        {!loading && inviteCount > 0 ? (
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

const MemberRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  align-items: center;
  width: 100%;
  min-height: ${Sizes.accountHeight};
  max-height: ${Sizes.accountHeight};
  padding: 8px 72px 8px 14px;
  border: 1px solid ${Colors.Black[300]};
  border-radius: ${BorderRad.s};
  background-color: ${Colors.White};
`
