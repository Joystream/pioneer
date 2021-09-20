import { EventRecord } from '@polkadot/types/interfaces/system'
import React, { ReactNode } from 'react'

import { toDispatchError, isErrorEvent } from '@/common/hooks/useSignAndSendTransaction'

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
  const errorEvents = events?.filter(isErrorEvent)

  return (
    <Modal modalSize="xs" modalHeight="s" onClose={onClose}>
      <ModalHeader title="" onClick={onClose} modalHeaderSize="s" />
      <ResultModalBody>
        <FailureIcon />
        <ModalTitle as="h4">
          <span className="red-title">Oh no!</span> Failure
        </ModalTitle>
        <ResultText>{children}</ResultText>
        {!!errorEvents && errorEvents.map((event, i) => <EventErrorMessage key={i} event={event} />)}
      </ResultModalBody>
    </Modal>
  )
}

const EventErrorMessage = ({ event }: EventErrorMessageProps) => {
  const registryError = toDispatchError(event)

  if (!registryError) {
    return null
  }

  return (
    <ResultText>
      {registryError.section}: {registryError.docs}
    </ResultText>
  )
}
