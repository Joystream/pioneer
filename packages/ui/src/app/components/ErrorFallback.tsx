import React from 'react'
import { useHistory } from 'react-router-dom'

import { ButtonGhost, ButtonPrimary, ButtonsGroup } from '@/common/components/buttons'
import { FailureIcon } from '@/common/components/icons'
import { Modal, ModalBody, ModalFooterComponent, ModalHeader } from '@/common/components/Modal'
import { useModal } from '@/common/hooks/useModal'

interface FallbackProps {
  error: Error
  resetErrorBoundary: (...args: Array<unknown>) => void
}

export const PageErrorFallback = (props: FallbackProps) => {
  const { push } = useHistory()
  return <ErrorFallback {...props} onClose={() => push('/error')} />
}

export const ModalErrorFallback = (props: FallbackProps) => {
  const { hideModal } = useModal()
  return <ErrorFallback {...props} onClose={hideModal} />
}

const ErrorFallback = ({ error, resetErrorBoundary, onClose }: FallbackProps & { onClose: () => void }) => {
  const handleClose = () => {
    onClose()
    resetErrorBoundary()
  }
  return (
    <Modal modalSize="m" onClose={resetErrorBoundary}>
      <ModalHeader icon={<FailureIcon />} title="Something went wrong" onClick={handleClose} />
      <ModalBody>
        <pre>{error.message}</pre>
      </ModalBody>
      <ModalFooterComponent>
        <ButtonsGroup align="right">
          <ButtonGhost size="medium" onClick={handleClose}>
            Close
          </ButtonGhost>
          <ButtonPrimary size="medium" onClick={resetErrorBoundary}>
            Try again
          </ButtonPrimary>
        </ButtonsGroup>
      </ModalFooterComponent>
    </Modal>
  )
}
