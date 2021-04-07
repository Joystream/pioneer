import React from 'react'
import styled from 'styled-components'

import { ButtonPrimary } from '../../../common/components/buttons'
import { SuccessIcon } from '../../../common/components/icons'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../../common/components/Modal'
import { TextMedium } from '../../../common/components/typography'
import { BorderRad, Colors, Sizes } from '../../../common/constants'
import { useModal } from '../../../common/hooks/useModal'
import { MemberInfo } from '../../components'
import { MemberModalCall } from '../../components/MemberProfile'
import { BaseMember, Member } from '../../types'

interface Props {
  onClose: () => void
  member: Member
  memberId?: string
}

export const BuyMembershipSuccessModal = ({ onClose, member, memberId }: Props) => {
  const { showModal } = useModal()
  const viewMember = () => {
    onClose()

    if (memberId) {
      showModal<MemberModalCall>({ modal: 'Member', data: { id: memberId } })
    }
  }

  return (
    <Modal modalSize="m" modalHeight="s" onClose={onClose}>
      <ModalHeader onClick={onClose} title="Success" icon={<SuccessIcon />} />
      <ModalBody>
        <TextMedium>You have just successfully created a new membership</TextMedium>
        <MemberRow>
          <MemberInfo member={(member as unknown) as BaseMember} />
        </MemberRow>
      </ModalBody>
      <ModalFooter>
        <ButtonPrimary size="medium" disabled={!memberId} onClick={viewMember}>
          View my profile
        </ButtonPrimary>
      </ModalFooter>
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
