import { ApplicationMetadata } from '@joystream/metadata-protobuf'
import { ApplicationId } from '@joystream/types/working-group'
import { ApiRx } from '@polkadot/api'
import { EventRecord } from '@polkadot/types/interfaces/system'
import { useMachine } from '@xstate/react'
import BN from 'bn.js'
import React, { useEffect, useMemo, useState } from 'react'
import { assign, createMachine } from 'xstate'

import { useHasRequiredStake } from '@/accounts/hooks/useHasRequiredStake'
import { useTransactionFee } from '@/accounts/hooks/useTransactionFee'
import { InsufficientFundsModal } from '@/accounts/modals/InsufficientFundsModal'
import { MoveFundsModalCall } from '@/accounts/modals/MoveFoundsModal'
import { Account } from '@/accounts/types'
import { FailureModal } from '@/common/components/FailureModal'
import { BN_ZERO } from '@/common/constants'
import { useApi } from '@/common/hooks/useApi'
import { useModal } from '@/common/hooks/useModal'
import { isError } from '@/common/hooks/useSignAndSendTransaction'
import { getEventParam, metadataToBytes } from '@/common/model/JoystreamNode'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { SwitchMemberModalCall } from '@/memberships/modals/SwitchMemberModal'
import { ApplyForRoleModalCall } from '@/working-groups/modals/ApplyForRoleModal'
import { StakeStepForm } from '@/working-groups/modals/ApplyForRoleModal/StakeStep'
import { getGroup } from '@/working-groups/model/getGroup'

import { transactionConfig } from '../../../common/model/machines'

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

  const [state, send] = useMachine(
    createMachine<{ transactionEvents: EventRecord[] }>(
      {
        initial: 'requirementsVerification',
        context: { transactionEvents: [] },
        states: {
          requirementsVerification: {
            on: {
              FAIL: 'requirementsFailed',
              PASS: 'steps',
            },
          },
          requirementsFailed: { type: 'final' },
          steps: {
            initial: 'prepare',
            states: {
              prepare: {
                on: { VALID: 'transaction' },
              },
              transaction: {
                id: 'transaction',
                invoke: {
                  src: createMachine(transactionConfig),
                  onDone: [
                    {
                      target: 'error',
                      actions: ['assignTransactionEvents'],
                      cond: (context, event) => isError(event.data.events),
                    },
                    {
                      target: 'success',
                      cond: (context, event) => !isError(event.data.events),
                      actions: ['assignTransactionEvents'],
                    },
                  ],
                },
              },
              success: { type: 'final' },
              error: { type: 'final' },
            },
          },
        },
      },
      {
        actions: {
          assignTransactionEvents: assign({
            transactionEvents: (context, event) => event.data.events,
          }),
        },
      }
    )
  )

  const [txParams, setTxParams] = useState<OpeningParams>({
    member_id: active?.id,
    opening_id: opening.runtimeId,
    role_account_id: active?.controllerAccount,
    reward_account_id: active?.controllerAccount,
    stake_parameters: {
      stake: opening.stake,
      staking_account_id: active?.controllerAccount,
    },
  })
  const requiredStake = opening.stake.toNumber()
  const { hasRequiredStake, transferableAccounts, accountsWithLockedFounds } = useHasRequiredStake(requiredStake)
  const [stakeAccount, setStakeAccount] = useState<Account>()
  const transaction = useMemo(() => {
    if (active && txParams && api) {
      return getGroup(api, opening.groupName)?.applyOnOpening(txParams)
    }
  }, [api, JSON.stringify(txParams)])
  const signer = active?.controllerAccount
  const stake = new BN(txParams?.stake_parameters.stake ?? 0)
  const feeInfo = useTransactionFee(active?.controllerAccount, transaction)

  useEffect(() => {
    if (hasRequiredStake === false) {
      showModal<MoveFundsModalCall>({
        modal: 'MoveFundsModal',
        data: { lockedFoundsAccounts: accountsWithLockedFounds, accounts: transferableAccounts, requiredStake },
      })
    }

    if (state.value !== 'requirementsVerification') {
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

  if (state.matches('steps.prepare')) {
    const onSubmit = (stake: StakeStepForm, answers: Record<string, string>) => {
      setStakeAccount(stake.account)
      setTxParams({
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
      send('VALID')
    }

    return <ApplyForRolePrepareModal onSubmit={onSubmit} opening={opening} />
  }

  const transactionService = state.children['transaction:invocation[0]']

  if (state.matches('steps.transaction') && signer && transactionService) {
    return (
      <ApplyForRoleSignModal
        onClose={hideModal}
        transaction={transaction}
        signer={signer}
        stake={stake}
        service={transactionService}
      />
    )
  }

  if (state.matches('steps.success') && stake && stakeAccount) {
    const applicationId = getEventParam<ApplicationId>(state.context.transactionEvents, 'AppliedOnOpening', 1)
    return (
      <ApplyForRoleSuccessModal stake={stake} stakeAccount={stakeAccount} applicationId={applicationId ?? BN_ZERO} />
    )
  }

  if (state.matches('steps.error')) {
    return <FailureModal onClose={hideModal}>There was a problem with applying for an opening.</FailureModal>
  }

  return null
}
