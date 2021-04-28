import React, { useMemo, useState } from 'react'

import { useApi } from '../../../common/hooks/useApi'
import { useModal } from '../../../common/hooks/useModal'
import { ModalState } from '../../../common/types'
import { useMyMemberships } from '../../../memberships/hooks/useMyMemberships'

import { ApplyForRolePrepareModal } from './ApplyForRolePrepareModal'
import { ApplyForRoleSignModal } from './ApplyForRoleSignModal'

export const ApplyForRoleModal = () => {
  const [state, setState] = useState<ModalState>('PREPARE')
  const { hideModal } = useModal()
  const { api } = useApi()
  const transaction = useMemo(() => api?.tx?.membershipWorkingGroup.applyOnOpening({}), [api])
  const { active } = useMyMemberships()
  const signer = active?.controllerAccount

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

  if (state === 'AUTHORIZE' && signer) {
    return (
      <ApplyForRoleSignModal onClose={hideModal} onDone={() => undefined} transaction={transaction} signer={signer} />
    )
  }

  return null
}
