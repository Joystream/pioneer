import { ApiRx } from '@polkadot/api'
import { EventRecord } from '@polkadot/types/interfaces/system'
import React, { ReactNode } from 'react'

import { useApi } from '@/common/hooks/useApi'
import { isErrorEvent, toDispatchError } from '@/common/model/apiErrors'

import { FailureIcon } from './icons/FailureIcon'
import { Modal, ModalHeader, ModalTitle, ResultModalBody, ResultText } from './Modal'

export interface FailureModalProps {
  children: ReactNode
  onClose: () => void
  events?: EventRecord[]
}

interface EventErrorMessageProps {
  event: EventRecord
  api: ApiRx
}

export const FailureModal = ({ children, onClose, events }: FailureModalProps) => {
  const { api } = useApi()
  const errorEvents = events?.filter(isErrorEvent) ?? []

  return (
    <Modal modalSize="xs" modalHeight="s" onClose={onClose}>
      <ModalHeader title="" onClick={onClose} modalHeaderSize="s" />
      <ResultModalBody>
        <FailureIcon />
        <ModalTitle as="h4">
          <span className="red-title">Oh no!</span> Failure
        </ModalTitle>
        <ResultText>{children}</ResultText>
        {!!errorEvents && api && errorEvents.map((event, i) => <EventErrorMessage key={i} event={event} api={api} />)}
      </ResultModalBody>
    </Modal>
  )
}

const EventErrorMessage = ({ event, api }: EventErrorMessageProps) => {
  const registryError = toDispatchError(event, api)

  if (!registryError) {
    return null
  }

  return (
    <ResultText>
      {registryError.section}: {registryError.docs}
    </ResultText>
  )
}
