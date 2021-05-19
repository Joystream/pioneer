import React, { useState } from 'react'

import { ButtonPrimary } from '@/common/components/buttons'
import { InputComponent, InputText } from '@/common/components/forms'
import { Modal, ModalFooter, ModalHeader, Row } from '@/common/components/Modal'
import { Label, TextMedium } from '@/common/components/typography'

interface Props {
  unstakingPeriod: number
  onClose: () => void
  onContinue: (rationale: string) => void
}

export const LeaveRolePrepareModal = ({ onClose, onContinue, unstakingPeriod }: Props) => {
  const [rationale, setRationale] = useState('')
  return (
    <Modal onClose={onClose} modalSize="m">
      <ModalHeader onClick={onClose} title="Leaving a position?" />
      <Row>
        <TextMedium>Please remember that this action is irreversible.</TextMedium>
      </Row>
      <Row>
        <Label>Info</Label>
        <TextMedium>Unstaking period takes: {unstakingPeriod} blocks.</TextMedium>
      </Row>
      <InputComponent label="Please tell us why you're leaving">
        <InputText onChange={(event) => setRationale(event.target.value)} />
      </InputComponent>
      <ModalFooter>
        <ButtonPrimary onClick={() => onContinue(rationale)}>Leave the position anyway</ButtonPrimary>
      </ModalFooter>
    </Modal>
  )
}
