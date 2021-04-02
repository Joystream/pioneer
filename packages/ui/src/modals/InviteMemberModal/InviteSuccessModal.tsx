import React from 'react'
import styled from 'styled-components'
import { useGetMemberQuery } from '../../api/queries'
import { BaseMember, Member } from '../../common/types'
import { SuccessIcon } from '../../components/icons'
import { MemberInfo } from '../../components/membership'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../components/Modal'
import { TextMedium } from '../../components/typography'
import { BorderRad, Colors, Sizes } from '../../constants'

interface Props {
  onClose: () => void
  member: Member
}

export function InviteSuccessModal({ onClose, member }: Props) {
  const invitorId = member.invitor?.id || ''
  const invitor = useGetMemberQuery({ variables: { id: invitorId } }).data
  const inviteCount = invitor?.membership?.inviteCount ?? 0
  const name = invitor?.membership?.name
  const plural = inviteCount > 1

  return (
    <Modal modalSize="m" modalHeight="s" onClose={onClose}>
      <ModalHeader onClick={onClose} title="Success" icon={<SuccessIcon />} />
      <ModalBody>
        <TextMedium>You have just successfully invited a member.</TextMedium>
        <MemberRow>
          <MemberInfo member={(member as unknown) as BaseMember} />
        </MemberRow>
        {inviteCount > 0 ? (
          <TextMedium>
            You still have {inviteCount} invitation{plural && 's'} left on the "{name}" membership.
          </TextMedium>
        ) : (
          <TextMedium>You have no invitations left on the "{name}" membership.</TextMedium>
        )}
      </ModalBody>
      <ModalFooter />
    </Modal>
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
