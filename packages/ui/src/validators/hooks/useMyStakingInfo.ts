import BN from 'bn.js'
import { combineLatest, map, of, switchMap } from 'rxjs'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useApi } from '@/api/hooks/useApi'
import { BN_ZERO } from '@/common/constants'
import { useObservable } from '@/common/hooks/useObservable'

export interface MyStakingInfo {
  totalStake: BN
  ownStake: BN
  isValidator: boolean
  isNominator: boolean
  validatorAddresses: string[]
  nominatorAddresses: string[]
}

/**
 * Hook to get user's staking information across all their accounts
 * Checks which accounts are validators or nominators and fetches their stake amounts
 */
export const useMyStakingInfo = (): MyStakingInfo | undefined => {
  const { api } = useApi()
  const { allAccounts } = useMyAccounts()

  return useObservable(() => {
    if (!api || !allAccounts.length) return of(undefined)

    const addresses = allAccounts.map((account) => account.address)

    // Query bonded accounts (stash -> controller mapping)
    const bonded$ = combineLatest(
      addresses.map((address) =>
        api.query.staking.bonded(address).pipe(map((bonded) => ({ address, controller: bonded.toHuman() })))
      )
    )

    // Query ledger for each account to get staking info
    const stakingInfo$ = bonded$.pipe(
      switchMap((bondedAccounts) => {
        // Get all controller addresses that exist
        const controllerAddresses = bondedAccounts
          .filter((acc) => acc.controller)
          .map((acc) => acc.controller as string)

        if (controllerAddresses.length === 0) {
          return of([])
        }

        // Query ledger for each controller
        return combineLatest(
          controllerAddresses.map((controller) =>
            api.query.staking.ledger(controller).pipe(
              map((ledger) => {
                if (ledger.isNone) return null
                const ledgerData = ledger.unwrap()
                return {
                  stash: ledgerData.stash.toString(),
                  active: ledgerData.active.toBn(),
                  total: ledgerData.total.toBn(),
                }
              })
            )
          )
        ).pipe(map((ledgers) => ledgers.filter((ledger): ledger is NonNullable<typeof ledger> => ledger !== null)))
      })
    )

    // Query validators to check if user's accounts are validators
    const validators$ = api.query.staking.validators.multi(addresses).pipe(
      map((prefs) =>
        prefs
          .map((pref, index) => ({
            address: addresses[index],
            isValidator: !pref.isEmpty,
          }))
          .filter((v) => v.isValidator)
      )
    )

    // Query nominators to check if user's accounts are nominators
    const nominators$ = api.query.staking.nominators.multi(addresses).pipe(
      map((nominations) =>
        nominations
          .map((nom, index) => ({
            address: addresses[index],
            isNominator: !nom.isEmpty,
            targets: nom.isEmpty ? [] : nom.unwrap().targets.map((t) => t.toString()),
          }))
          .filter((n) => n.isNominator)
      )
    )

    // Query active era to get current staking amounts
    const activeEra$ = api.query.staking.activeEra().pipe(
      map((activeEra) => {
        if (activeEra.isNone) return undefined
        return activeEra.unwrap().index.toNumber()
      })
    )

    // Combine all data
    return combineLatest([stakingInfo$, validators$, nominators$, activeEra$]).pipe(
      switchMap(([stakingInfos, validators, nominators, activeEraIndex]) => {
        if (!activeEraIndex) {
          return of({
            totalStake: BN_ZERO,
            ownStake: BN_ZERO,
            isValidator: false,
            isNominator: false,
            validatorAddresses: [],
            nominatorAddresses: [],
          })
        }

        const validatorAddresses = validators.map((v) => v.address)
        const nominatorAddresses = nominators.map((n) => n.address)

        // Calculate total and own stake
        const totalStake = stakingInfos.reduce((sum, info) => sum.add(info.total), BN_ZERO)
        const ownStake = stakingInfos.reduce((sum, info) => sum.add(info.active), BN_ZERO)

        return of({
          totalStake,
          ownStake,
          isValidator: validators.length > 0,
          isNominator: nominators.length > 0,
          validatorAddresses,
          nominatorAddresses,
        })
      })
    )
  }, [api?.isConnected, JSON.stringify(allAccounts.map((a) => a.address))])
}
