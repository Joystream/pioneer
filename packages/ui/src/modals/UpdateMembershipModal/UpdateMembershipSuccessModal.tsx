import React from 'react'
import styled from 'styled-components'
import { BaseMember } from '../../common/types'
import { ButtonPrimary } from '../../components/buttons'
import { SuccessIcon } from '../../components/icons'
import { MemberInfo } from '../../components/membership'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../components/Modal'
import { Text } from '../../components/typography'
import { BorderRad, Colors, Sizes } from '../../constants'

interface Props {
  onClose: () => void
  member: BaseMember
}

export function UpdateMembershipSuccessModal({ onClose, member }: Props) {
  return (
    <Modal modalSize="m" modalHeight="s" onClose={onClose}>
      <ModalHeader onClick={onClose} title="Success" icon={<SuccessIcon />} />
      <ModalBody>
        <Text size={2}>You have just successfully updated your membership</Text>
        <MemberRow>
          <MemberInfo member={(member as unknown) as BaseMember} />
        </MemberRow>
      </ModalBody>
      <ModalFooter>
        <ButtonPrimary size="medium" disabled>
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
