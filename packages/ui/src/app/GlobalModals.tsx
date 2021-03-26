import React from 'react'
import { MemberProfile } from '../components/membership/MemberProfile'
import { useModal } from '../hooks/useModal'

export const GlobalModals = () => {
  const { modal } = useModal()

  if (!modal) {
    return null
  } else {
    return <>{modal === 'member' && <MemberProfile />}</>
  }
}
