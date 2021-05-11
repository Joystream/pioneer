import { ApplicationId } from '@joystream/types/working-group'
import { ApiRx } from '@polkadot/api'
import { EventRecord } from '@polkadot/types/interfaces/system'
import BN from 'bn.js'
import React, { useEffect, useMemo, useState } from 'react'

import { Account } from '@/accounts/types'
import { FailureModal } from '@/common/components/FailureModal'
import { useApi } from '@/common/hooks/useApi'
import { useModal } from '@/common/hooks/useModal'
import { getEventParam } from '@/common/model/JoystreamNode'
import { ModalState } from '@/common/types'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { SwitchMemberModalCall } from '@/memberships/modals/SwitchMemberModal'
import { ApplyForRoleModalCall } from '@/working-groups/modals/ApplyForRoleModal/index'
import { StakeStepForm } from '@/working-groups/modals/ApplyForRoleModal/StakeStep'

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
  const { hideModal, modalData, showModal } = useModal<ApplyForRoleModalCall>()
  const opening = modalData.opening
  const [state, setState] = useState<ModalState>('REQUIREMENTS_CHECK')
  const [txParams, setTxParams] = useState<OpeningParams | undefined>(undefined)
  const [stakeAccount, setStakeAccount] = useState<Account>()
  const transaction = useMemo(() => {
    return txParams && api?.tx?.membershipWorkingGroup.applyOnOpening(txParams)
  }, [api, JSON.stringify(txParams)])
  const [applicationId, setApplicationId] = useState<BN>()

  const signer = active?.controllerAccount
  const onDone = (result: boolean, events: EventRecord[]) => {
    const applicationId = getEventParam<ApplicationId>(events, 'AppliedOnOpening', 1)

    setApplicationId(applicationId?.toBn())
    setState(result ? 'SUCCESS' : 'ERROR')
  }
  const stake = new BN(txParams?.stake_parameters.stake ?? 0)

  useEffect(() => {
    if (state !== 'REQUIREMENTS_CHECK') {
      return
    }

    if (active) {
      setState('PREPARE')
      return
    }

    showModal<SwitchMemberModalCall>({ modal: 'SwitchMember' })
  }, [state])

  if (state === 'PREPARE') {
    const onSubmit = (stake: StakeStepForm, answers: Record<string, any>) => {
      setStakeAccount(stake.account)
      setTxParams({
        opening_id: opening.id,
        member_id: active?.id,
        role_account_id: active?.controllerAccount,
        reward_account_id: active?.rootAccount,
        description: JSON.stringify(answers),
        stake_parameters: {
          stake: stake.amount,
          stake_account_id: stake.account?.address,
        },
      })
      setState('AUTHORIZE')
    }

    return <ApplyForRolePrepareModal onSubmit={onSubmit} opening={opening} />
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

  if (state === 'SUCCESS' && stake && stakeAccount && applicationId) {
    return <ApplyForRoleSuccessModal stake={stake} stakeAccount={stakeAccount} applicationId={applicationId} />
  }

  return <FailureModal onClose={hideModal}>There was a problem with applying for an opening.</FailureModal>
}
