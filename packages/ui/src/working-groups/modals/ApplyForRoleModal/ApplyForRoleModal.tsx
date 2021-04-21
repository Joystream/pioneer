import React, { useState } from 'react'

import { useModal } from '../../../common/hooks/useModal'
import { ModalState } from '../../../common/types'

import { ApplyForRolePrepareModal } from './ApplyForRolePrepareModal'

export const ApplyForRoleModal = () => {
  const [state, setState] = useState<ModalState>('PREPARE')
  const { hideModal } = useModal()

  if (state === 'PREPARE') {
    return (
      <ApplyForRolePrepareModal
        onSubmit={() => {
          setState('AUTHORIZE')
          hideModal()
        }}
      />
    )
  }

  return null
}
