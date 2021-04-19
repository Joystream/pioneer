import React, { useState } from 'react'

import { ModalState } from '../../../common/types'

import { ApplyForRolePrepareModal } from './ApplyForRolePrepareModal'

export const ApplyForRoleModal = () => {
  const [state] = useState<ModalState>('PREPARE')

  if (state === 'PREPARE') {
    return <ApplyForRolePrepareModal />
  }

  return null
}
