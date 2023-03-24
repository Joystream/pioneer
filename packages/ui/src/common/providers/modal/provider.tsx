import React, { ReactNode, useState } from 'react'

import { MODAL_WITH_CLOSE_CONFIRMATION, ModalNames } from '@/app/GlobalModals'

import { ModalContext } from './context'
import { AnyModalCall, ModalWithDataCall, UnknownMachine, UseModal } from './types'

interface Props {
  children: ReactNode
}

export const isModalWithData = (a: any): a is ModalWithDataCall<any, any> => !!a.data

export const ModalContextProvider = (props: Props) => {
  const [modal, setModal] = useState<string | null>(null)
  const [modalData, setModalData] = useState<any>()
  const [currentModalMachine, setCurrentModalMachine] = useState<UnknownMachine<any, any, any> | undefined>(undefined)
  const [isClosing, setIsClosing] = useState<boolean>(false)

  const modalApi: UseModal<AnyModalCall> = {
    showModal: (modalCall) => {
      setModal(modalCall.modal)

      if (isModalWithData(modalCall)) {
        setModalData(modalCall.data)
      }
    },
    hideModal: () => {
      const [state] = currentModalMachine ?? []
      if (
        isClosing ||
        !MODAL_WITH_CLOSE_CONFIRMATION.includes((modal ?? '') as ModalNames) ||
        state?.matches('success')
      ) {
        setModal(null)
        setModalData(null)
        setCurrentModalMachine(undefined)
        setIsClosing(false)
      } else {
        setIsClosing(true)
      }
    },
    modal,
    modalData,
    currentModalMachine,
    isClosing,
    returnClosedModal: () => setIsClosing(false),
    setMachineState: setCurrentModalMachine,
  }

  return <ModalContext.Provider value={modalApi}>{props.children}</ModalContext.Provider>
}
