import { AugmentedEvents } from '@polkadot/api/types'
import { AnyTuple } from '@polkadot/types/types'
import BN from 'bn.js'
import { set } from 'lodash'
import { from, Observable, of } from 'rxjs'

import { toBalances } from '@/accounts/model/toBalances'
import { UseAccounts } from '@/accounts/providers/accounts/provider'
import { Account } from '@/accounts/types'
import { Api } from '@/api'
import { UseApi } from '@/api/providers/provider'
import { BN_ZERO } from '@/common/constants'
import { createType } from '@/common/model/createType'
import { ExtractTuple } from '@/common/model/JoystreamNode'
import { asDerivedBalances } from '@/mocks/helpers/asDerivedBalances'
import { createErrorEvents, createSuccessEvents, stubTransactionResult } from '@/mocks/helpers/transactions'
import { proposalDetails } from '@/proposals/model/proposalDetails'

import { mockedBalances, mockedMyBalances, mockedUseMyAccounts } from '../setup'

import { createRuntimeDispatchInfo } from './chainTypes'

export const currentStubErrorMessage = 'Balance too low to send value.'

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
  set(transaction, 'signAndSend', () => stubTransactionResult(createErrorEvents(currentStubErrorMessage)))
}

type PartialTuple<T extends AnyTuple> = Partial<T>

type IgnoreModules = 'bounty'
export const stubTransactionSuccess = <
  Module extends keyof AugmentedEvents<'rxjs'> | IgnoreModules,
  Event extends Module extends keyof AugmentedEvents<'rxjs'> ? keyof AugmentedEvents<'rxjs'>[Module] : string
>(
  transaction: any,
  module: Module,
  eventName: Event,
  data?: Module extends keyof AugmentedEvents<'rxjs'>
    ? Event extends keyof AugmentedEvents<'rxjs'>[Module]
      ? PartialTuple<ExtractTuple<AugmentedEvents<'rxjs'>[Module][Event]>>
      : any
    : any
) => {
  set(transaction, 'signAndSend', () =>
    stubTransactionResult(createSuccessEvents((data ?? []) as any[], module, eventName as string))
  )
}

export const stubTransactionPending = (transaction: any) => {
  set(transaction, 'signAndSend', () => from([{ status: { isReady: true, type: 'Ready' } }]))
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
  set(
    api,
    transactionPath,
    jest.fn(() => transaction)
  )
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
    api: {
      _async: { chainMetadata: Promise.resolve({}) },
      isConnected: true,
    } as unknown as Api,
    isConnected: true,
    connectionState: 'connected',
    setQnConnectionState: () => undefined,
    qnConnectionState: 'connected',
  }

  set(api, 'api.query.council.councilMembers', () => from([]))
  set(api, 'api.consts.council.councilSize', new BN(3))
  set(api, 'api.rpc.chain.subscribeNewHeads', () =>
    from([
      createType('Header', {
        parentHash: 'j4W7rVcUCxi2crhhjRq46fNDRbVHTjJrz6bKxZwehEMQxZeSf',
        number: 1337,
        stateRoot: 'j4W7rVcUCxi2crhhjRq46fNDRbVHTjJrz6bKxZwehEMQxZeSf',
        extrinsicsRoot: 'j4W7rVcUCxi2crhhjRq46fNDRbVHTjJrz6bKxZwehEMQxZeSf',
        digest: {
          logs: [],
        },
      }),
    ])
  )
  set(api, 'api.rpc.chain.getBlockHash', () => {
    from([createType('BlockHash', 'j4W7rVcUCxi2crhhjRq46fNDRbVHTjJrz6bKxZwehEMQxZeSf')])
  })

  set(api, 'api.rpc.chain.getHeader', () =>
    from([
      {
        number: createType('BlockNumber', 1337),
      },
    ])
  )

  return api
}

export const stubDefaultBalances = () => {
  stubBalances({ available: 1000, locked: 0 })
}

export const stubCouncilConstants = (api: UseApi, constants?: { minStake: number }) => {
  set(api, 'api.consts.council', {
    councilSize: new BN(2),
    idlePeriodDuration: new BN(100),
    budgetRefillPeriod: new BN(1),
    announcingPeriodDuration: new BN(1),
    minCandidateStake: new BN(constants?.minStake ?? 10),
  })
  set(api, 'api.consts.referendum', {
    voteStageDuration: new BN(1),
    revealStageDuration: new BN(1),
    minimumStake: new BN(constants?.minStake ?? 10),
  })
}
// remapping to cover typo on runtime naming
const testProposalDetails = [...proposalDetails, 'fillWorkingGroupOpening', 'setInvitationCount']

export const stubProposalConstants = (api: UseApi, constants?: { requiredStake: number }) => {
  for (const proposalType of testProposalDetails) {
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
  set(api, 'api.consts.members.referralCutMaximumPercent', new BN(50))
  set(api, 'api.consts.proposalsCodex.fundingRequestProposalMaxTotalAmount', new BN(10_000))
  set(api, 'api.consts.proposalsCodex.setMaxValidatorCountProposalMaxValidators', new BN(300))
  set(
    api,
    'api.query.members.membershipPrice',
    () =>
      new Observable((subscriber) => {
        subscriber.next(new BN(100))
      })
  )
}

export const stubBountyConstants = (api: UseApi) => {
  set(api, 'api.consts.bounty', {
    minCherryLimit: createType('BalanceOf', 10),
    minFundingLimit: createType('BalanceOf', 10),
    closedContractSizeLimit: createType('u32', 2),
    minWorkEntrantStake: createType('BalanceOf', 10),
    bountyLockId: createType('LockIdentifier', 1),
  })
  set(api, 'api.consts.members.candidateStake', new BN(200))
}

export const stubCouncilAndReferendum = (
  api: UseApi,
  councilStage: 'Idle' | 'Election' | 'Announcing',
  referendumStage: 'Inactive' | 'Voting' | 'Revealing'
) => {
  stubQuery(api, 'referendum.stage', createType('PalletReferendumReferendumStage', referendumStage))
  stubQuery(
    api,
    'council.stage',
    createType('PalletCouncilCouncilStageUpdate', {
      stage: createType('PalletCouncilCouncilStage', councilStage),
      changedAt: BN_ZERO,
    })
  )
  stubQuery(api, 'council.councilorReward', new BN(100))
  stubQuery(api, 'council.budget', new BN(10000))
  stubQuery(api, 'council.nextRewardPayments', new BN(1000))
}

export const stubBalances = ({ available, lockId, locked }: Parameters<typeof asDerivedBalances>[0]) => {
  const deriveBalances = asDerivedBalances({ available, lockId, locked })
  const balance = toBalances(deriveBalances)
  mockedBalances.mockReturnValue(balance)

  mockedMyBalances.mockReturnValue(
    Object.fromEntries(mockedUseMyAccounts().allAccounts.map(({ address }) => [address, balance]))
  )
}

export const stubAccounts = (allAccounts: Account[], myAccounts: Partial<UseAccounts> = {}) => {
  const hasAccounts = allAccounts.length > 0
  mockedUseMyAccounts.mockReturnValue({
    isLoading: false,
    allAccounts,
    hasAccounts,
    ...myAccounts,
    allWallets: [],
  })

  const balance = mockedBalances()
  if (balance) {
    mockedMyBalances.mockReturnValue(Object.fromEntries(allAccounts.map(({ address }) => [address, balance])))
  }
}
