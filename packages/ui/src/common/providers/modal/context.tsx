import { createContext } from 'react'

import { UseModal } from './types'

export const ModalContext = createContext<UseModal<any>>({
  modal: null,
  modalData: null,
  showModal: () => undefined,
  hideModal: () => undefined,
  hideModalWithoutConfirmModal: () => undefined,
  setMachineState: () => undefined,
  currentModalMachine: undefined,
  isClosing: false,
  returnClosedModal: () => undefined,
})
