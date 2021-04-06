import { useContext } from 'react'

import { ModalContext } from '../providers/modal/context'
import { AnyModalCall, UseModal, ModalCallData } from '../providers/modal/types'

export const useModal = <T extends AnyModalCall>(): UseModal<ModalCallData<T>> => {
  return useContext(ModalContext)
}
