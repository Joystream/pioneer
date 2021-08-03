import { ApplicationMetadata } from '@joystream/metadata-protobuf'
import { ApplicationId } from '@joystream/types/working-group'
import { ApiRx } from '@polkadot/api'
import { useMachine } from '@xstate/react'
import BN from 'bn.js'
import React, { useEffect, useMemo } from 'react'

import { useHasRequiredStake } from '@/accounts/hooks/useHasRequiredStake'
import { useTransactionFee } from '@/accounts/hooks/useTransactionFee'
import { InsufficientFundsModal } from '@/accounts/modals/InsufficientFundsModal'
import { MoveFundsModalCall } from '@/accounts/modals/MoveFoundsModal'
import { FailureModal } from '@/common/components/FailureModal'
import { useApi } from '@/common/hooks/useApi'
import { useModal } from '@/common/hooks/useModal'
import { getEventParam, metadataToBytes } from '@/common/model/JoystreamNode'
import { getSteps } from '@/common/model/machines/getSteps'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { BindStakingAccountModal } from '@/memberships/modals/BindStakingAccountModal/BindStakingAccountModal'
import { SwitchMemberModalCall } from '@/memberships/modals/SwitchMemberModal'
import { ApplyForRoleModalCall } from '@/working-groups/modals/ApplyForRoleModal'
import { getGroup } from '@/working-groups/model/getGroup'

import { GroupName } from '../../types'

import { ApplyForRoleApplicationStep } from './ApplyForRoleApplicationStep'
import { ApplyForRoleSignModal } from './ApplyForRoleSignModal'
import { ApplyForRoleStakeStep } from './ApplyForRoleStakeStep'
import { ApplyForRoleSuccessModal } from './ApplyForRoleSuccessModal'
import { applyForRoleMachine } from './machine'

export type OpeningParams = Exclude<
  Parameters<ApiRx['tx']['membershipWorkingGroup']['applyOnOpening']>[0],
  string | Uint8Array
>

const transactionsSteps = [{ title: 'Bind account for staking' }, { title: 'Send a proposal' }]

export const ApplyForRoleModal = () => {
  const { api, connectionState } = useApi()
  const { active } = useMyMemberships()
  const { hideModal, modalData, showModal } = useModal<ApplyForRoleModalCall>()
  const [state, send, service] = useMachine(applyForRoleMachine)
  const opening = modalData.opening
  const requiredStake = opening.stake.toNumber()
  const { hasRequiredStake, transferableAccounts, accountsWithLockedFounds } = useHasRequiredStake(requiredStake)
  const transaction = useMemo(() => {
    if (active && api) {
      return getGroup(api, opening.groupName as GroupName)?.applyOnOpening({
        member_id: active?.id,
        opening_id: opening.runtimeId,
        role_account_id: active?.controllerAccount,
        reward_account_id: active?.controllerAccount,
        stake_parameters: {
          stake: opening.stake,
          staking_account_id: active?.controllerAccount,
        },
      })
    }
  }, [active?.id, connectionState])
  const feeInfo = useTransactionFee(active?.controllerAccount, transaction)

  useEffect(() => {
    if (!state.matches('requirementsVerification')) {
      return
    }

    if (hasRequiredStake === false) {
      showModal<MoveFundsModalCall>({
        modal: 'MoveFundsModal',
        data: { lockedFoundsAccounts: accountsWithLockedFounds, accounts: transferableAccounts, requiredStake },
      })

      return
    }

    if (active && feeInfo?.canAfford) {
      send('PASS')
      return
    }

    if (!active && hasRequiredStake) {
      showModal<SwitchMemberModalCall>({ modal: 'SwitchMember' })
    }

    if (feeInfo && !feeInfo.canAfford) {
      send('FAIL')
    }
  }, [state.value, active?.id, JSON.stringify(feeInfo), hasRequiredStake])

  if (!active || !feeInfo || hasRequiredStake === false) {
    return null
  }

  if (state.matches('requirementsFailed')) {
    return (
      <InsufficientFundsModal onClose={hideModal} address={active.controllerAccount} amount={feeInfo.transactionFee} />
    )
  }

  if (state.matches('stake')) {
    return <ApplyForRoleStakeStep opening={opening} steps={getSteps(service)} send={send} />
  }

  if (state.matches('form')) {
    return <ApplyForRoleApplicationStep opening={opening} steps={getSteps(service)} send={send} />
  }

  const bindStakingAccountService = state.children.bindStakingAccount

  if (state.matches('bindStakingAccount') && api && bindStakingAccountService) {
    const { stake } = state.context
    const stakingAccount = stake.account?.address

    const transaction = api.tx.members.addStakingAccountCandidate(active.id)

    return (
      <BindStakingAccountModal
        onClose={hideModal}
        transaction={transaction}
        signer={stakingAccount}
        memberId={active.id}
        service={bindStakingAccountService}
        steps={transactionsSteps}
      />
    )
  }

  const signer = active?.controllerAccount
  const transactionService = state.children.transaction

  if (state.matches('transaction') && signer && api && transactionService) {
    const { stake, answers } = state.context

    const transaction = getGroup(api, opening.groupName as GroupName)?.applyOnOpening({
      opening_id: opening.runtimeId,
      member_id: active?.id,
      role_account_id: active?.controllerAccount,
      reward_account_id: active?.rootAccount,
      description: metadataToBytes(ApplicationMetadata, { answers: Object.values(answers) }),
      stake_parameters: {
        stake: stake.amount,
        stake_account_id: stake.account?.address,
      },
    })

    return (
      <ApplyForRoleSignModal
        onClose={hideModal}
        transaction={transaction}
        signer={signer}
        stake={new BN(state.context.stake.amount)}
        service={transactionService}
        steps={transactionsSteps}
      />
    )
  }

  if (state.matches('success')) {
    const applicationId = getEventParam<ApplicationId>(state.context.transactionEvents, 'AppliedOnOpening', 1)

    return (
      <ApplyForRoleSuccessModal
        stake={new BN(state.context.stake.amount)}
        stakeAccount={state.context.stake.account}
        applicationId={new BN(applicationId ?? 0)}
        steps={getSteps(service)}
      />
    )
  }

  if (state.matches('error')) {
    return <FailureModal onClose={hideModal}>There was a problem with applying for an opening.</FailureModal>
  }

  return null
}
