import { useContext } from 'react'

import { ModalContext } from '../../app/providers/modal/context'
import { AnyModalCall, UseModal, ModalCallData } from '../../app/providers/modal/types'

export const useModal = <T extends AnyModalCall>(): UseModal<ModalCallData<T>> => {
  return useContext(ModalContext)
}
