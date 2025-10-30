import React, { FC } from 'react'

import { FailureModal } from '@/common/components/FailureModal'

type BackendErrorModalProps = {
  onClose: () => void
}

export const BackendErrorModal: FC<BackendErrorModalProps> = ({ onClose }) => {
  return (
    <FailureModal onClose={onClose}>
      There's been an unexpected error when communicating with notifications service. Please try again later.
    </FailureModal>
  )
}
