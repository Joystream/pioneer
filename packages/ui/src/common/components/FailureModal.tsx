import { EventRecord } from '@polkadot/types/interfaces/system'
import React, { ReactNode } from 'react'

import { isErrorEvent, toDispatchError } from '@/common/model/JoystreamNode'

import { FailureIcon } from './icons/FailureIcon'
import { Modal, ModalHeader, ModalTitle, ResultModalBody, ResultText } from './Modal'

export interface FailureModalProps {
  children: ReactNode
  onClose: () => void
  events?: EventRecord[]
}

interface EventErrorMessageProps {
  event: EventRecord
}

export const FailureModal = ({ children, onClose, events }: FailureModalProps) => {
  const errorEvents = events?.filter(isErrorEvent) ?? []

  return (
    <Modal modalSize="xs" modalHeight="s" onClose={onClose}>
      <ModalHeader title="" onClick={onClose} modalHeaderSize="s" />
      <ResultModalBody>
        <FailureIcon />
        <ModalTitle as="h4">
          <span className="red-title">Oh no!</span> Failure
        </ModalTitle>
        {!errorEvents.length && <ResultText>{children}</ResultText>}
        {!!errorEvents.length && errorEvents.map((event, i) => <EventErrorMessage key={i} event={event} />)}
      </ResultModalBody>
    </Modal>
  )
}

const EventErrorMessage = ({ event }: EventErrorMessageProps) => {
  const registryError = toDispatchError(event)
  if (!registryError) {
    return null
  }

  return <ResultText>{registryError.docs}</ResultText>
}
