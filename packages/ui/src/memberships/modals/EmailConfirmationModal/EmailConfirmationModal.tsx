import React, { useCallback, useEffect } from 'react'

import { Loading } from '@/common/components/Loading'
import { Modal, ModalBody, ModalHeader } from '@/common/components/Modal'
import { TextMedium } from '@/common/components/typography'
import { useModal } from '@/common/hooks/useModal'
import { error as logError } from '@/common/logger'
import { ModalWithDataCall } from '@/common/providers/modal/types'
import { useNotificationSettings } from '@/memberships/hooks/useNotificationSettings'
import { useConfirmBackendEmailMutation } from '@/memberships/queries/__generated__/backend.generated'

import { BackendErrorModal } from '../BackendErrorModal'

export type EmailConfirmationModalCall = ModalWithDataCall<
  'EmailConfirmationModal',
  {
    token: string
    onClose?: () => void
  }
>

export const EmailConfirmationModal = () => {
  const {
    hideModal,
    modalData: { token, onClose },
  } = useModal<EmailConfirmationModalCall>()
  const { backendClient } = useNotificationSettings()
  const [sendConfirmEmailMutation, { loading, error }] = useConfirmBackendEmailMutation({
    client: backendClient,
  })

  const confirmEmail = useCallback(async () => {
    if (!token) return
    try {
      await sendConfirmEmailMutation({
        variables: {
          token,
        },
      })
    } catch (error) {
      logError(error)
    }
  }, [sendConfirmEmailMutation, token])

  useEffect(() => {
    confirmEmail()
  }, [confirmEmail])

  const closeConfirmationModal = () => {
    onClose?.()
    hideModal()
  }

  if (error) {
    return <BackendErrorModal onClose={closeConfirmationModal} />
  }

  return (
    <Modal onClose={closeConfirmationModal} modalSize="m">
      <ModalHeader onClick={closeConfirmationModal} title="Email confirmation" />
      <ModalBody>
        {loading ? (
          <Loading text="Confirming email..." withoutMargin />
        ) : (
          <TextMedium>
            Your email has been confirmed! You can always adjust your notification preferences in settings.
          </TextMedium>
        )}
      </ModalBody>
    </Modal>
  )
}
