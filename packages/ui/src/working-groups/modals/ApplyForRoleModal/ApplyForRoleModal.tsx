import { ApplicationMetadata } from '@joystream/metadata-protobuf'
import { ApiRx } from '@polkadot/api'
import { SubmittableExtrinsic } from '@polkadot/api/types'
import { useMachine } from '@xstate/react'
import BN from 'bn.js'
import React, { useEffect, useMemo } from 'react'

import { useHasRequiredStake } from '@/accounts/hooks/useHasRequiredStake'
import { useStakingAccountStatus } from '@/accounts/hooks/useStakingAccountStatus'
import { useTransactionFee } from '@/accounts/hooks/useTransactionFee'
import { InsufficientFundsModal } from '@/accounts/modals/InsufficientFundsModal'
import { MoveFundsModalCall } from '@/accounts/modals/MoveFoundsModal'
import { FailureModal } from '@/common/components/FailureModal'
import { useApi } from '@/common/hooks/useApi'
import { useModal } from '@/common/hooks/useModal'
import { getDataFromEvent, metadataToBytes } from '@/common/model/JoystreamNode'
import { getSteps } from '@/common/model/machines/getSteps'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { BindStakingAccountModal } from '@/memberships/modals/BindStakingAccountModal/BindStakingAccountModal'
import { SwitchMemberModalCall } from '@/memberships/modals/SwitchMemberModal'
import { ApplyForRoleModalCall } from '@/working-groups/modals/ApplyForRoleModal'
import { getGroup } from '@/working-groups/model/getGroup'

import { GroupName, groupToLockId } from '../../types'

import { ApplyForRoleApplicationStep } from './ApplyForRoleApplicationStep'
import { ApplyForRoleSignModal } from './ApplyForRoleSignModal'
import { ApplyForRoleStakeStep } from './ApplyForRoleStakeStep'
import { ApplyForRoleSuccessModal } from './ApplyForRoleSuccessModal'
import { applyForRoleMachine } from './machine'

export type OpeningParams = Exclude<
  Parameters<ApiRx['tx']['membershipWorkingGroup']['applyOnOpening']>[0],
  string | Uint8Array
>

const transactionsSteps = [{ title: 'Bind account for staking' }, { title: 'Apply on opening' }]

export const ApplyForRoleModal = () => {
  const { api, connectionState } = useApi()
  const { active: activeMember } = useMyMemberships()
  const { hideModal, modalData, showModal } = useModal<ApplyForRoleModalCall>()
  const [state, send, service] = useMachine(applyForRoleMachine)
  const opening = modalData.opening
  const requiredStake = opening.stake.toNumber()
  const { hasRequiredStake, accountsWithTransferableBalance, accountsWithCompatibleLocks } = useHasRequiredStake(
    requiredStake,
    groupToLockId(opening.groupName)
  )
  const transaction = useMemo(() => {
    if (activeMember && api) {
      return getGroup(api, opening.groupName as GroupName)?.applyOnOpening({
        member_id: activeMember?.id,
        opening_id: opening.runtimeId,
        role_account_id: activeMember?.controllerAccount,
        reward_account_id: activeMember?.controllerAccount,
        stake_parameters: {
          stake: opening.stake,
          staking_account_id: activeMember?.controllerAccount,
        },
      })
    }
  }, [activeMember?.id, connectionState])
  const feeInfo = useTransactionFee(activeMember?.controllerAccount, transaction)
  const stakingStatus = useStakingAccountStatus(state.context?.stake?.account?.address, activeMember?.id)

  useEffect(() => {
    if (!state.matches('requirementsVerification')) {
      return
    }

    if (!hasRequiredStake) {
      showModal<MoveFundsModalCall>({
        modal: 'MoveFundsModal',
        data: {
          accountsWithCompatibleLocks,
          accountsWithTransferableBalance,
          requiredStake,
        },
      })

      return
    }

    if (activeMember && feeInfo?.canAfford) {
      send('PASS')
      return
    }

    if (!activeMember && hasRequiredStake) {
      showModal<SwitchMemberModalCall>({ modal: 'SwitchMember' })
    }

    if (feeInfo && !feeInfo.canAfford) {
      send('FAIL')
    }
  }, [state.value, activeMember?.id, JSON.stringify(feeInfo), hasRequiredStake])

  useEffect(() => {
    if (state.matches('beforeTransaction')) {
      send(stakingStatus === 'free' ? 'UNBOUND' : 'BOUND')
    }
  }, [state, stakingStatus])

  if (!activeMember || !feeInfo || !hasRequiredStake) {
    return null
  }

  if (state.matches('requirementsFailed')) {
    return (
      <InsufficientFundsModal
        onClose={hideModal}
        address={activeMember.controllerAccount}
        amount={feeInfo.transactionFee}
      />
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
    const stakingAccount = state.context.stake.account?.address
    const transaction = api.tx.members.addStakingAccountCandidate(activeMember.id)

    return (
      <BindStakingAccountModal
        onClose={hideModal}
        transaction={transaction}
        signer={stakingAccount}
        memberId={activeMember.id}
        service={bindStakingAccountService}
        steps={transactionsSteps}
      />
    )
  }

  const signer = activeMember?.controllerAccount
  const transactionService = state.children.transaction

  if (state.matches('transaction') && signer && api && transactionService) {
    const { stake, answers } = state.context

    const applyOnOpeningTransaction = getGroup(api, opening.groupName as GroupName)?.applyOnOpening({
      opening_id: opening.runtimeId,
      member_id: activeMember?.id,
      role_account_id: activeMember?.controllerAccount,
      reward_account_id: activeMember?.rootAccount,
      description: metadataToBytes(ApplicationMetadata, { answers: Object.values(answers) }),
      stake_parameters: {
        stake: stake.amount,
        stake_account_id: stake.account?.address,
      },
    })

    let transaction: SubmittableExtrinsic<'rxjs'>

    if (stakingStatus === 'confirmed') {
      transaction = applyOnOpeningTransaction
    } else {
      transaction = api.tx.utility.batch([
        api.tx.members.confirmStakingAccount(activeMember?.id, stake.account.address),
        applyOnOpeningTransaction,
      ])
    }

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
    // The types of each working groups are the same, so either will work
    const applicationId = getDataFromEvent(state.context.transactionEvents, 'forumWorkingGroup', 'AppliedOnOpening', 1)

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
    return (
      <FailureModal onClose={hideModal} events={state.context.transactionEvents}>
        There was a problem with applying for an opening.
      </FailureModal>
    )
  }

  return null
}
