import { createType } from '@joystream/types'
import { ApiRx } from '@polkadot/api'
import { AugmentedEvents } from '@polkadot/api/types'
import { AnyTuple } from '@polkadot/types/types'
import BN from 'bn.js'
import { set } from 'lodash'
import { from, of } from 'rxjs'

import { BN_ZERO } from '@/common/constants'
import { ExtractTuple } from '@/common/model/JoystreamNode'
import { UseApi } from '@/common/providers/api/provider'
import { proposalDetails } from '@/proposals/model/proposalDetails'

import { createBalanceLock, createRuntimeDispatchInfo } from './chainTypes'

const createSuccessEvents = (data: any[], section: string, method: string) => [
  {
    phase: { ApplyExtrinsic: 2 },
    event: { index: '0x0502', data, method, section },
  },
  {
    phase: { ApplyExtrinsic: 2 },
    event: { index: '0x0000', data: [{ weight: 190949000, class: 'Normal', paysFee: 'Yes' }] },
  },
]

const createErrorEvents = () => [
  {
    phase: { ApplyExtrinsic: 2 },
    event: {
      index: '0x0001',
      data: [{ Module: { index: 5, error: 3 } }, { weight: 190949000, class: 'Normal', paysFee: 'Yes' }],
      section: 'system',
      method: 'ExtrinsicFailed',
    },
  },
]

export const stubTransactionResult = (events: any[]) =>
  from([
    {
      status: { isReady: true, type: 'Ready' },
    },
    {
      status: { type: 'InBlock', isInBlock: true, asInBlock: '0x93XXX' },
      events: [...events],
    },
    {
      status: { type: 'Finalized', isFinalized: true, asFinalized: '0x93XXX' },
      events: [...events],
    },
  ])

const createBatchSuccessEvents = () => [
  {
    phase: { ApplyExtrinsic: 2 },
    event: {
      section: 'utility',
      method: 'BatchCompleted',
      index: '0x0502',
    },
  },
  {
    phase: { ApplyExtrinsic: 2 },
    event: { index: '0x0000', data: [{ weight: 190949000, class: 'Normal', paysFee: 'Yes' }] },
  },
]

const createBatchErrorEvents = () => [
  {
    phase: { ApplyExtrinsic: 2 },
    event: {
      index: '0x0001',
      data: [{ Module: { index: 20, error: 5 } }, { weight: 190949000, class: 'Normal', paysFee: 'Yes' }],
      section: 'utility',
      method: 'BatchInterrupted',
    },
  },
]

export const stubTransactionFailure = (transaction: any) => {
  set(transaction, 'signAndSend', () => stubTransactionResult(createErrorEvents()))
}

type PartialTuple<T extends AnyTuple> = Partial<T>

export const stubTransactionSuccess = <
  Module extends keyof AugmentedEvents<'rxjs'>,
  Event extends keyof AugmentedEvents<'rxjs'>[Module]
>(
  transaction: any,
  module: Module,
  eventName: Event,
  data?: PartialTuple<ExtractTuple<AugmentedEvents<'rxjs'>[Module][Event]>>
) => {
  set(transaction, 'signAndSend', () =>
    stubTransactionResult(createSuccessEvents((data ?? []) as any[], module, eventName as string))
  )
}

export const stubBatchTransactionFailure = (transaction: any) => {
  set(transaction, 'signAndSend', () => stubTransactionResult(createBatchErrorEvents()))
}

export const stubBatchTransactionSuccess = (transaction: any) => {
  set(transaction, 'signAndSend', () => stubTransactionResult(createBatchSuccessEvents()))
}

export const stubTransaction = (api: UseApi, transactionPath: string, fee = 25) => {
  const transaction = {}
  set(transaction, 'paymentInfo', () => of(createRuntimeDispatchInfo(fee)))
  set(api, transactionPath, () => transaction)
  return transaction
}

export const stubQuery = (api: UseApi, querySubPath: string, response: unknown) => {
  return set(api, `api.query.${querySubPath}`, () => of(response))
}

export const stubConst = <T>(api: UseApi, constSubPath: string, value: T) => {
  return set(api, `api.consts.${constSubPath}`, value)
}

export const stubApi = () => {
  const api: UseApi = {
    api: ({} as unknown) as ApiRx,
    isConnected: true,
    connectionState: 'connected',
  }

  set(api, 'api.query.council.councilMembers', () => from([]))
  set(api, 'api.consts.council.councilSize', new BN(3))
  set(api, 'api.rpc.chain.subscribeNewHeads', () =>
    from([
      createType('Header', {
        parentHash: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
        number: 1337,
        stateRoot: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
        extrinsicsRoot: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
        digest: {
          logs: [],
        },
      }),
    ])
  )
  stubDefaultBalances(api)

  return api
}

export const stubDefaultBalances = (api: UseApi) => {
  stubBalances(api, {
    available: 1000,
    locked: 0,
  })
}

export const stubCouncilConstants = (api: UseApi, constants?: { minStake: number }) => {
  set(api, 'api.consts.council', {
    councilSize: new BN(2),
    idlePeriodDuration: new BN(1),
    budgetRefillPeriod: new BN(1),
    announcingPeriodDuration: new BN(1),
  })
  set(api, 'api.consts.referendum', {
    voteStageDuration: new BN(1),
    revealStageDuration: new BN(1),
    minimumStake: new BN(constants?.minStake ?? 10),
  })
}

export const stubProposalConstants = (api: UseApi, constants?: { requiredStake: number }) => {
  for (const proposalType of proposalDetails) {
    set(api, `api.consts.proposalsCodex.${proposalType}ProposalParameters`, {
      votingPeriod: new BN(10),
      gracePeriod: new BN(10),
      approvalQuorumPercentage: new BN(10),
      approvalThresholdPercentage: new BN(10),
      slashingQuorumPercentage: new BN(10),
      slashingThresholdPercentage: new BN(10),
      requiredStake: new BN(constants && constants.requiredStake ? constants.requiredStake : 10),
      constitutionality: new BN(10),
    })
  }
}

export const stubCouncilAndReferendum = (
  api: UseApi,
  councilStage: 'Idle' | 'Election' | 'Announcing',
  referendumStage: 'Inactive' | 'Voting' | 'Revealing'
) => {
  stubQuery(api, 'referendum.stage', createType('ReferendumStage', referendumStage))
  stubQuery(
    api,
    'council.stage',
    createType('CouncilStageUpdate', {
      stage: createType('CouncilStage', councilStage),
    })
  )
}

type Balances = { available?: number; locked?: number; lockId?: number }

export const stubBalances = (api: UseApi, { available, lockId, locked }: Balances) => {
  const availableBalance = new BN(available ?? 0)
  const lockedBalance = new BN(locked ?? 0)

  set(api, 'api.derive.balances.all', () =>
    from([
      {
        availableBalance: createType('Balance', availableBalance),
        lockedBalance: createType('Balance', lockedBalance),
        accountId: createType('AccountId', '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY'),
        accountNonce: createType('Index', 1),
        freeBalance: createType('Balance', availableBalance.add(lockedBalance)),
        frozenFee: new BN(0),
        frozenMisc: new BN(0),
        isVesting: false,
        lockedBreakdown: lockedBalance.eq(BN_ZERO) ? [] : [createBalanceLock(locked!, lockId ?? 11)],
        reservedBalance: new BN(0),
        vestedBalance: new BN(0),
        vestedClaimable: new BN(0),
        vestingEndBlock: createType('BlockNumber', 1234),
        vestingLocked: new BN(0),
        vestingPerBlock: new BN(0),
        vestingTotal: new BN(0),
        votingBalance: new BN(0),
      },
    ])
  )
}
