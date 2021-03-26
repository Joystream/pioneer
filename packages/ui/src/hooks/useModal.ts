import { useContext } from 'react'
import { ModalContext } from '../providers/modal/context'

export const useModal = () => {
  return useContext(ModalContext)
}
