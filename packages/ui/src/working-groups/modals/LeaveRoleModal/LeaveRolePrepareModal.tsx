import React, { useState } from 'react'

import { ButtonPrimary } from '@/common/components/buttons'
import { InputComponent, InputText } from '@/common/components/forms'
import { Modal, ModalBody, ModalFooter, ModalHeader, Row } from '@/common/components/Modal'
import { Label, TextMedium } from '@/common/components/typography'
import { useOpening } from '@/working-groups/hooks/useOpening'

interface Props {
  openingId: string
  onClose: () => void
  onContinue: (rationale: string) => void
}

export const LeaveRolePrepareModal = ({ onClose, onContinue, openingId }: Props) => {
  const { opening } = useOpening(openingId)
  const [rationale, setRationale] = useState('')

  return (
    <Modal onClose={onClose} modalSize="m" modalHeight="s">
      <ModalHeader onClick={onClose} title="Leaving a position?" />
      <ModalBody>
        <Row>
          <TextMedium>Please remember that this action is irreversible.</TextMedium>
        </Row>
        <Row>
          <Label>Info</Label>
          <TextMedium>Unstaking period takes {opening?.unstakingPeriod} blocks.</TextMedium>
        </Row>
        <InputComponent label="Please tell us why you're leaving">
          <InputText onChange={(event) => setRationale(event.target.value)} />
        </InputComponent>
      </ModalBody>
      <ModalFooter>
        <ButtonPrimary onClick={() => onContinue(rationale)} size="medium">
          Leave the position anyway
        </ButtonPrimary>
      </ModalFooter>
    </Modal>
  )
}
