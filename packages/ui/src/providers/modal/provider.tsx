import React, { ReactNode, useState } from 'react'
import { ModalContext } from './context'

interface Props {
  children: ReactNode
}

interface Modal<M> {
  modal: M
}
interface ModalWithData<M, D> extends Modal<M> {
  data: D
}

type AddMembershipModal = Modal<'AddMembership'>
type MemberModal = ModalWithData<'Member', { id: string }>
type TransferInvitesModal = ModalWithData<'TransferInvites', { memberId: string }>

type ModalCall = MemberModal | AddMembershipModal | TransferInvitesModal

export interface ModalApi {
  modal: string | null
  modalData: any | null
  showModal: (action: ModalCall) => void
  hideModal: () => void
}

function isModalWithData(a: any): a is ModalWithData<any, any> {
  return !!a.data
}

export const ModalContextProvider = (props: Props) => {
  const [modal, setModal] = useState<string | null>(null)
  const [modalData, setModalData] = useState<any>()
  const modalApi: ModalApi = {
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
