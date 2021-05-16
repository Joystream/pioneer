import React from 'react'

import { ButtonPrimary } from '../../../common/components/buttons'
import { Modal, ModalFooter, ModalHeader, Row } from '../../../common/components/Modal'
import { Label, TextMedium } from '../../../common/components/typography'

interface Props {
  onClose: () => void
  onContinue: () => void
}

export const LeaveRolePrepareModal = React.memo(({ onClose, onContinue }: Props) => (
  <Modal onClose={onClose} modalSize={'m'}>
    <ModalHeader onClick={onClose} title="Leaving a position?" />
    <Row>
      <TextMedium>Please remember that this action is irreversible.</TextMedium>
    </Row>
    <Row>
      <Label>Info</Label>
      <TextMedium>Unstaking period takes: X blocks.</TextMedium>
    </Row>
    <ModalFooter>
      <ButtonPrimary onClick={onContinue}>Leave the position anyway</ButtonPrimary>
    </ModalFooter>
  </Modal>
))
