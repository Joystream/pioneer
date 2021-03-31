import React, { ReactNode, useState } from 'react'
import { ModalContext } from './context'
import { AnyModalCall, ModalWithDataCall, UseModal } from './types'

interface Props {
  children: ReactNode
}

const isModalWithData = (a: any): a is ModalWithDataCall<any, any> => !!a.data

export const ModalContextProvider = (props: Props) => {
  const [modal, setModal] = useState<string | null>(null)
  const [modalData, setModalData] = useState<any>()
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
    },
    modal,
    modalData,
  }

  return <ModalContext.Provider value={modalApi}>{props.children}</ModalContext.Provider>
}
