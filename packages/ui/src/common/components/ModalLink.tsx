import React from 'react'
import { ReactNode } from 'react-markdown'
import { Link } from 'react-router-dom'

import { MemberModalCall } from '@/memberships/components/MemberProfile'

import { useModal } from '../hooks/useModal'
import { AnyModalCall } from '../providers/modal/types'

interface ModalLinkProps<Call> {
  call: Call extends AnyModalCall ? Call : never
  children: ReactNode
}

const ModalLink = ({ call, children }: ModalLinkProps<AnyModalCall>) => {
  const { showModal } = useModal()
  return (
    <Link
      to="#"
      onClick={(evt) => {
        evt.preventDefault()
        showModal(call)
      }}
    >
      {children}
    </Link>
  )
}

export const MemberModalLink = (props: ModalLinkProps<MemberModalCall>) => ModalLink(props)
