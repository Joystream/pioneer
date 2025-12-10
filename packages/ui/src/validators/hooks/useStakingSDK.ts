import { useMemo } from 'react'
import { firstValueFrom } from 'rxjs'

import { useApi } from '@/api/hooks/useApi'
import { percentToPerbill } from '@/common/utils'
// import { StakingManager } from '@joystream/sdk-core/staking'
// For local testing, we'll use the mock implementation

export const useStakingSDK = () => {
  const { api } = useApi()

  const staking = useMemo(() => {
    if (!api) return null
    // Mock staking manager for now - will be replaced with real SDK
    return {
      // Mock transaction methods - will be replaced with real SDK methods
      // Note: Based on SDK implementation, these methods accept bigint directly
      bond: (controller: string, amount: bigint, payee: string) => api.tx.staking.bond(controller, amount, payee),
      bondExtra: (amount: bigint) => api.tx.staking.bondExtra(amount),
      unbond: (amount: bigint) => api.tx.staking.unbond(amount),
      rebond: (amount: bigint) => api.tx.staking.rebond(amount),
      nominate: (targets: string[]) => api.tx.staking.nominate(targets),
      validate: (commission: number, blocked = false) =>
        api.tx.staking.validate({
          commission: percentToPerbill(commission),
          blocked,
        }),
      payoutStakers: () => ({ signAndSend: () => Promise.resolve() }),
      rebag: () => ({ signAndSend: () => Promise.resolve() }),
      setController: (controller: string) => api.tx.staking.setController(controller),
      setPayee: (payee: string) => api.tx.staking.setPayee(payee),
      withdrawUnbonded: (slashingSpans: number) => api.tx.staking.withdrawUnbonded(slashingSpans),
      chill: () => api.tx.staking.chill(),
      canBond: async (_accountId: string, _amount: bigint) => {
        void _accountId
        void _amount
        return { canBond: true }
      },
      canUnbond: async (_accountId: string, _amount: bigint) => {
        void _accountId
        void _amount
        return { canUnbond: true }
      },
      canNominate: async (_accountId: string, _targets: string[]) => {
        void _accountId
        void _targets
        return { canNominate: true }
      },
      canValidate: async (_accountId: string) => {
        void _accountId
        return true
      },
      setSessionKeys: (keys: any, proof: any) => api.tx.session.setKeys(keys, proof),
      bondAndNominate: (controller: string, amount: bigint, targets: string[], payee: string) =>
        api.tx.utility.batch([api.tx.staking.bond(controller, amount, payee), api.tx.staking.nominate(targets)]),

      // Mock query methods - will be replaced with real SDK methods
      getStakingInfo: async (accountId: string) => ({
        totalBonded: BigInt(1000000000000),
        activeBonded: BigInt(800000000000),
        unbonding: BigInt(200000000000),
        rewards: BigInt(50000000000),
        controller: accountId,
        stash: accountId,
        nominations: [],
      }),
      getValidators: async () => {
        const validatorEntriesResult = api.query.staking.validators.entries()
        const validatorEntries = await ((validatorEntriesResult as any)?.pipe
          ? firstValueFrom(validatorEntriesResult as any)
          : validatorEntriesResult)

        const activeValidatorsResult = api.query.session.validators()
        const activeValidators = await ((activeValidatorsResult as any)?.pipe
          ? firstValueFrom(activeValidatorsResult as any)
          : activeValidatorsResult)

        const activeSet = new Set(
          (activeValidators as any[]).map((validator: any) => validator && validator.toString())
        )

        return (validatorEntries as Array<[any, any]>).map(([storageKey, prefs]) => {
          const validator = storageKey.args[0].toString()
          if (!prefs || (prefs as any).isEmpty) {
            return {
              account: validator,
              commission: undefined,
              isActive: activeSet.has(validator),
            }
          }

          const prefsData = (prefs as any).unwrap ? (prefs as any).unwrap() : prefs
          const commission = prefsData?.commission ? prefsData.commission.toNumber() / 10_000_000 : undefined

          return {
            account: validator,
            commission,
            isActive: activeSet.has(validator),
          }
        })
      },
      getWaitingValidators: async () => [
        { account: '5HGjWAeFDfFCWPsjFQdVV2Msvz2XtMktvgocYcC1hjnk34iw', commission: 4.0 },
      ],
      getStakingParams: async () => ({
        minBond: BigInt(100000000000),
        bondingDuration: 28,
        maxNominations: 16,
        historyDepth: 84,
      }),
      getStakingConstants: async () => ({
        minNominatorBond: BigInt(100000000000),
        minValidatorBond: BigInt(1000000000000),
        maxNominatorRewardedPerValidator: 256,
        maxValidators: 1000,
      }),
      getMinActiveBond: async () => ({
        minActiveBond: BigInt(1000000000000),
        era: 1234,
      }),
      getNominatorTargets: async () => [
        { account: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY', commission: 5.0 },
        { account: '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty', commission: 3.0 },
      ],
      getValidatorPrefs: async () => ({
        commission: 5.0,
        blocked: false,
      }),
      getSlashingSpans: async () => ({
        spanCount: 0,
        lastStart: 0,
        lastLength: 0,
      }),
      getUnbondingInfo: async () => ({
        totalUnbonding: BigInt(200000000000),
        chunks: [
          { value: BigInt(100000000000), era: 1230 },
          { value: BigInt(100000000000), era: 1231 },
        ],
      }),
      getStakingRewards: async () => [
        { era: 1230, amount: BigInt(50000000000) },
        { era: 1231, amount: BigInt(30000000000) },
      ],
    } as any
  }, [api])

  return {
    staking,
    isConnected: !!staking,
  }
}

/**
 * Hook for staking queries
 * Provides all the query methods from the SDK
 */
export const useStakingQueries = () => {
  const { staking, isConnected } = useStakingSDK()

  const getStakingInfo = async (accountId: string) => {
    if (!staking) throw new Error('Staking SDK not connected')
    return staking.getStakingInfo(accountId)
  }

  const getValidators = async () => {
    if (!staking) throw new Error('Staking SDK not connected')
    return staking.getValidators()
  }

  const getWaitingValidators = async () => {
    if (!staking) throw new Error('Staking SDK not connected')
    return staking.getWaitingValidators()
  }

  const getStakingParams = async () => {
    if (!staking) throw new Error('Staking SDK not connected')
    return staking.getStakingParams()
  }

  const getStakingConstants = async () => {
    if (!staking) throw new Error('Staking SDK not connected')
    return staking.getStakingConstants()
  }

  const getMinActiveBond = async () => {
    if (!staking) throw new Error('Staking SDK not connected')
    return staking.getMinActiveBond()
  }

  const getNominatorTargets = async (accountId: string) => {
    if (!staking) throw new Error('Staking SDK not connected')
    return staking.getNominatorTargets(accountId)
  }

  const getValidatorPrefs = async (validatorId: string) => {
    if (!staking) throw new Error('Staking SDK not connected')
    return staking.getValidatorPrefs(validatorId)
  }

  const getSlashingSpans = async (accountId: string) => {
    if (!staking) throw new Error('Staking SDK not connected')
    return staking.getSlashingSpans(accountId)
  }

  const getUnbondingInfo = async (accountId: string) => {
    if (!staking) throw new Error('Staking SDK not connected')
    return staking.getUnbondingInfo(accountId)
  }

  const getStakingRewards = async (accountId: string) => {
    if (!staking) throw new Error('Staking SDK not connected')
    return staking.getStakingRewards(accountId)
  }

  return {
    isConnected,
    getStakingInfo,
    getValidators,
    getWaitingValidators,
    getStakingParams,
    getStakingConstants,
    getMinActiveBond,
    getNominatorTargets,
    getValidatorPrefs,
    getSlashingSpans,
    getUnbondingInfo,
    getStakingRewards,
  }
}

/**
 * Hook for staking validation
 * Provides validation helpers from the SDK
 */
export const useStakingValidation = () => {
  const { staking, isConnected } = useStakingSDK()

  const canBond = async (accountId: string, amount: bigint) => {
    if (!staking) throw new Error('Staking SDK not connected')
    return staking.canBond(accountId, amount)
  }

  const canUnbond = async (accountId: string, amount: bigint) => {
    if (!staking) throw new Error('Staking SDK not connected')
    return staking.canUnbond(accountId, amount)
  }

  const canNominate = async (accountId: string, targets: string[]) => {
    if (!staking) throw new Error('Staking SDK not connected')
    return staking.canNominate(accountId, targets)
  }

  const canValidate = async (accountId: string) => {
    if (!staking) throw new Error('Staking SDK not connected')
    return staking.canValidate(accountId)
  }

  return {
    isConnected,
    canBond,
    canUnbond,
    canNominate,
    canValidate,
  }
}

/**
 * Hook for staking transactions
 * Provides all transaction methods from the SDK
 */
export const useStakingTransactions = () => {
  const { staking, isConnected } = useStakingSDK()

  // Bonding transactions
  const bond = (controller: string, amount: bigint, payee: string) => {
    if (!staking) throw new Error('Staking SDK not connected')
    return staking.bond(controller, amount, payee)
  }

  const bondExtra = (amount: bigint) => {
    if (!staking) throw new Error('Staking SDK not connected')
    return staking.bondExtra(amount)
  }

  const unbond = (amount: bigint) => {
    if (!staking) throw new Error('Staking SDK not connected')
    return staking.unbond(amount)
  }

  const rebond = (amount: bigint) => {
    if (!staking) throw new Error('Staking SDK not connected')
    return staking.rebond(amount)
  }

  const withdrawUnbonded = (slashingSpans: number) => {
    if (!staking) throw new Error('Staking SDK not connected')
    return staking.withdrawUnbonded(slashingSpans)
  }

  // Validation transactions
  const validate = (commission: number, blocked: boolean = false) => {
    if (!staking) throw new Error('Staking SDK not connected')
    return staking.validate(commission, blocked)
  }

  const chill = () => {
    if (!staking) throw new Error('Staking SDK not connected')
    return staking.chill()
  }

  // Nomination transactions
  const nominate = (targets: string[]) => {
    if (!staking) throw new Error('Staking SDK not connected')
    return staking.nominate(targets)
  }

  // Controller transactions
  const setController = (controller: string) => {
    if (!staking) throw new Error('Staking SDK not connected')
    return staking.setController(controller)
  }

  const setPayee = (payee: string) => {
    if (!staking) throw new Error('Staking SDK not connected')
    return staking.setPayee(payee)
  }

  const setSessionKeys = (keys: any, proof: any) => {
    if (!staking) throw new Error('Staking SDK not connected')
    return staking.setSessionKeys(keys, proof)
  }

  // Reward transactions
  const payoutStakers = (validatorStash: string, era: number) => {
    if (!staking) throw new Error('Staking SDK not connected')
    return staking.payoutStakers(validatorStash, era)
  }

  const payoutStakersByPage = (validatorStash: string, era: number, page: number) => {
    if (!staking) throw new Error('Staking SDK not connected')
    return staking.payoutStakersByPage(validatorStash, era, page)
  }

  // Bag transactions
  const rebag = (accountId: string) => {
    if (!staking) throw new Error('Staking SDK not connected')
    return staking.rebag(accountId)
  }

  const putInFrontOf = (lighter: string) => {
    if (!staking) throw new Error('Staking SDK not connected')
    return staking.putInFrontOf(lighter)
  }

  // Batch transactions
  const bondAndNominate = (controller: string, amount: bigint, targets: string[], payee: string) => {
    if (!staking) throw new Error('Staking SDK not connected')
    return staking.bondAndNominate(controller, amount, targets, payee)
  }

  return {
    isConnected,
    // Bonding
    bond,
    bondExtra,
    unbond,
    rebond,
    withdrawUnbonded,
    // Validation
    validate,
    chill,
    // Nomination
    nominate,
    // Controller
    setController,
    setPayee,
    // Session
    setSessionKeys,
    // Rewards
    payoutStakers,
    payoutStakersByPage,
    // Bags
    rebag,
    putInFrontOf,
    // Batch
    bondAndNominate,
  }
}
