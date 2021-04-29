import { ApiRx } from '@polkadot/api'
import BN from 'bn.js'
import React, { useMemo, useState } from 'react'

import { FailureModal } from '../../../common/components/FailureModal'
import { useApi } from '../../../common/hooks/useApi'
import { useModal } from '../../../common/hooks/useModal'
import { ModalState } from '../../../common/types'
import { useMyMemberships } from '../../../memberships/hooks/useMyMemberships'

import { ApplyForRolePrepareModal } from './ApplyForRolePrepareModal'
import { ApplyForRoleSignModal } from './ApplyForRoleSignModal'
import { ApplyForRoleSuccessModal } from './ApplyForRoleSuccessModal'

export type OpeningParams = Exclude<
  Parameters<ApiRx['tx']['membershipWorkingGroup']['applyOnOpening']>[0],
  string | Uint8Array
>

export const ApplyForRoleModal = () => {
  const { api } = useApi()
  const { active } = useMyMemberships()
  const { hideModal } = useModal()
  const [state, setState] = useState<ModalState>('PREPARE')
  const [txParams, setTxParams] = useState<OpeningParams | undefined>(undefined)
  const transaction = useMemo(() => {
    return txParams && api?.tx?.membershipWorkingGroup.applyOnOpening(txParams)
  }, [api, JSON.stringify(txParams)])

  const signer = active?.controllerAccount
  const onDone = (result: boolean) => setState(result ? 'SUCCESS' : 'ERROR')
  const stake = new BN(txParams?.stake_parameters.stake ?? 0)

  if (state === 'PREPARE') {
    return (
      <ApplyForRolePrepareModal
        onSubmit={(params) => {
          setTxParams(params)
          setState('AUTHORIZE')
        }}
      />
    )
  }

  if (state === 'AUTHORIZE' && signer) {
    return (
      <ApplyForRoleSignModal
        onClose={hideModal}
        onDone={onDone}
        transaction={transaction}
        signer={signer}
        stake={stake}
      />
    )
  }

  if (state === 'SUCCESS') {
    return <ApplyForRoleSuccessModal onClose={hideModal} />
  }

  return <FailureModal onClose={hideModal}>There was a problem with applying for an opening.</FailureModal>
}
