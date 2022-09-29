import React, { ReactNode, useState } from 'react'

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
  const modalApi: UseModal<AnyModalCall> = {
    showModal: (modalCall) => {
      setModal(modalCall.modal)

      if (isModalWithData(modalCall)) {
        setModalData(modalCall.data)
      }
    },
    hideModal: () => {
      setModal(null)
      setModalData(null)
      setCurrentModalMachine(undefined)
    },
    modal,
    modalData,
    currentModalMachine,
    setMachineState: setCurrentModalMachine,
  }

  return <ModalContext.Provider value={modalApi}>{props.children}</ModalContext.Provider>
}
