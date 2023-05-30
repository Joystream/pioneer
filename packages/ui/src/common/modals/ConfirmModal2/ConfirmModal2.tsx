import React, { useCallback, useContext, useEffect } from 'react'

import { ButtonDark, ButtonGhost, ButtonsGroup } from '@/common/components/buttons'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { useModal } from '@/common/hooks/useModal'
import { Confirm2Context } from '@/common/providers/confirm2/context'
import { ModalWithDataCall } from '@/common/providers/modal/types'

export type ConfirmModal2Call = ModalWithDataCall<
  'ConfirmModal2',
  { headerText: string; modalText: string; buttonText: string }
>

export const ConfirmModal2 = () => {
  const {
    hideModal,
    modalData: { headerText, modalText, buttonText },
  } = useModal<ConfirmModal2Call>()
  const { isConfirmed, setIsConfirmed } = useContext(Confirm2Context)

  useEffect(() => {
    if (isConfirmed) setIsConfirmed(null)
  }, [])

  const onConfirm = useCallback(async () => {
    setIsConfirmed(true)
    hideModal()
  }, [])

  return (
    <Modal modalSize="m" modalHeight="s" onClose={hideModal}>
      <ModalHeader onClick={hideModal} title={headerText} />
      <ModalBody isWhite={true}>{modalText}</ModalBody>
      <ModalFooter>
        <ButtonsGroup align="right">
          <ButtonGhost onClick={hideModal} size="medium">
            Cancel
          </ButtonGhost>
          <ButtonDark onClick={onConfirm} size="medium">
            {buttonText}
          </ButtonDark>
        </ButtonsGroup>
      </ModalFooter>
    </Modal>
  )
}
