import React from 'react'
import styled from 'styled-components'
import { Member } from '../../common/types'
import { ButtonPrimaryMedium } from '../../components/buttons'
import { SuccessIcon } from '../../components/icons'
import { MemberInfo } from '../../components/MemberInfo'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../components/Modal'
import { Text } from '../../components/typography'
import { BorderRad, Colors, Sizes } from '../../constants'

interface Props {
  onClose: () => void
  member: Member
}

export function AddMembershipSuccessModal({ onClose, member }: Props) {
  return (
    <Modal modalSize="m" modalHeight="s">
      <ModalHeader onClick={onClose} title="Success" icon={<SuccessIcon />} />
      <ModalBody>
        <Text>You have just successfully create a new membership</Text>
        <MemberRow>
          <MemberInfo member={member} />
        </MemberRow>
      </ModalBody>
      <ModalFooter>
        <ButtonPrimaryMedium disabled>View my profile</ButtonPrimaryMedium>
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
