import React, { useMemo, useState } from 'react'

import { FailureModal } from '../../../common/components/FailureModal'
import { useApi } from '../../../common/hooks/useApi'
import { useModal } from '../../../common/hooks/useModal'
import { ModalState } from '../../../common/types'
import { useMyMemberships } from '../../../memberships/hooks/useMyMemberships'

import { ApplyForRolePrepareModal } from './ApplyForRolePrepareModal'
import { ApplyForRoleSignModal } from './ApplyForRoleSignModal'
import { ApplyForRoleSuccessModal } from './ApplyForRoleSuccessModal'

export const ApplyForRoleModal = () => {
  const [state, setState] = useState<ModalState>('PREPARE')
  const { hideModal } = useModal()
  const { api } = useApi()
  const transaction = useMemo(() => api?.tx?.membershipWorkingGroup.applyOnOpening({}), [api])
  const { active } = useMyMemberships()
  const signer = active?.controllerAccount
  const onDone = (result: boolean) => setState(result ? 'SUCCESS' : 'ERROR')

  if (state === 'PREPARE') {
    return <ApplyForRolePrepareModal onSubmit={() => setState('AUTHORIZE')} />
  }

  if (state === 'AUTHORIZE' && signer) {
    return <ApplyForRoleSignModal onClose={hideModal} onDone={onDone} transaction={transaction} signer={signer} />
  }

  if (state === 'SUCCESS') {
    return <ApplyForRoleSuccessModal onClose={hideModal} />
  }

  return <FailureModal onClose={hideModal}>There was a problem with applying for an opening.</FailureModal>
}
