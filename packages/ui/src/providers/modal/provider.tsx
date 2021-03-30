import React, { ReactNode, useState } from 'react'
import { ModalContext } from './context'

interface Props {
  children: ReactNode
}

type ModalName = 'member' | 'addMembership' | 'TransferInvites'

export interface ModalApi {
  modal: string | null
  modalData: any | null
  showModal: (name: ModalName, data?: any) => void
  hideModal: () => void
}

export const ModalContextProvider = (props: Props) => {
  const [modal, setModal] = useState<string | null>(null)
  const [modalData, setModalData] = useState<any>()

  const modalApi = {
    showModal: (name: string, data: any) => {
      setModal(name)
      setModalData(data)
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
