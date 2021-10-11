import React, { ReactNode } from 'react'
import styled from 'styled-components'

import { Colors } from '../constants'
import { useModal } from '../hooks/useModal'
import { AnyModalCall } from '../providers/modal/types'

import { Link } from './Link'

interface ModalLinkProps<Call> {
  call: Call extends AnyModalCall ? Call : never
  children: ReactNode
}

export const ModalLink = ({ call, children }: ModalLinkProps<AnyModalCall>) => {
  const { showModal } = useModal()
  return (
    <ModalLinkItem
      onClick={(evt) => {
        evt.preventDefault()
        showModal(call)
      }}
    >
      {children}
    </ModalLinkItem>
  )
}

export type IModalLink<Call> = React.FC<ModalLinkProps<Call>>

const ModalLinkItem = styled(Link)`
  font-size: 14px;
  line-height: 20px;
  text-decoration: none;
  color: ${Colors.Black[900]};
  font-weight: 700;
`
