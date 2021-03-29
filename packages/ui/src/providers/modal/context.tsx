import { createContext } from 'react'
import { ModalApi } from './provider'

export const ModalContext = createContext<ModalApi>({
  modal: null,
  modalData: null,
  showModal: () => undefined,
  hideModal: () => undefined,
})
