import type { u32 } from '@polkadot/types'
import BN from 'bn.js'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { combineLatest, filter, first, map, of, switchMap, catchError, take } from 'rxjs'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { Account } from '@/accounts/types'
import { useApi } from '@/api/hooks/useApi'
import { FailureModal } from '@/common/components/FailureModal'
import { Modal, ModalBody, ModalHeader, ModalTransactionFooter } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { SuccessModal } from '@/common/components/SuccessModal'
import { TextMedium } from '@/common/components/typography'
import { BN_ZERO, ERA_DEPTH } from '@/common/constants'
import { useMachine } from '@/common/hooks/useMachine'
import { useModal } from '@/common/hooks/useModal'
import { useObservable } from '@/common/hooks/useObservable'
import { useSignAndSendTransaction } from '@/common/hooks/useSignAndSendTransaction'
import { transactionMachine } from '@/common/model/machines'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

import { ClaimStakingRewardsModalCall } from '.'

interface ValidatorClaimableRewards {
  address: string
  account: Account | undefined
  controller: string | undefined
  unclaimedEras: number[]
  totalClaimable: BN
}

interface EraInfo {
  currentEra: number
  oldestEra: number
}

export const ClaimStakingRewardsModal = () => {
  const { hideModal } = useModal<ClaimStakingRewardsModalCall>()
  const { api } = useApi()
  const { allAccounts } = useMyAccounts()
  const { active: activeMembership } = useMyMemberships()
  const [machineIteration, setMachineIteration] = useState(0)
  const transactionMachineInstance = useMemo(() => transactionMachine.withContext({ events: [] }), [machineIteration])
  const [state, , service] = useMachine(transactionMachineInstance)
  const [claimedEras, setClaimedEras] = useState<Set<string>>(new Set())
  const pendingBatchRef = useRef<number>(0)
  const isProcessingBatchRef = useRef<boolean>(false)
  const shouldAutoTriggerNextRef = useRef<boolean>(false)

  const validatorsRewards = useObservable<ValidatorClaimableRewards[] | undefined>(() => {
    if (!api || !allAccounts.length) return of(undefined)

    const addresses = allAccounts.map((account) => account.address)

    const isReady$ =
      'isReady' in api && typeof api.isReady === 'function'
        ? (api.isReady() as any).pipe(
            filter((ready: any) => Boolean(ready)),
            first()
          )
        : api.rpc.chain.getBlockHash(0).pipe(
            first(),
            map(() => true)
          )

    const eraInfo$ = api.query.staking.activeEra().pipe(
      map((activeEra) => {
        if (activeEra.isNone) return undefined
        const currentEra = activeEra.unwrap().index.toNumber()
        return { currentEra, oldestEra: Math.max(0, currentEra - ERA_DEPTH) }
      }),
      catchError(() => of(undefined))
    )

    return isReady$.pipe(
      switchMap(() => eraInfo$),
      switchMap((eraInfo) => {
        if (!eraInfo || typeof eraInfo !== 'object' || !('currentEra' in eraInfo) || !('oldestEra' in eraInfo)) {
          return of([])
        }

        const { currentEra, oldestEra } = eraInfo as EraInfo

        const erasRewards$ = api.derive.staking.erasRewards().pipe(catchError(() => of([])))
        const erasPoints$ = api.derive.staking.erasPoints().pipe(catchError(() => of([])))

        return combineLatest([erasRewards$, erasPoints$]).pipe(
          switchMap(([erasRewards, erasPoints]) => {
            const rewardsByEra = new Map(erasRewards.map((reward: any) => [reward.era.toNumber(), reward]))
            const pointsByEra = new Map(erasPoints.map((points: any) => [points.era.toNumber(), points]))

            const accountRewards$ = addresses.map((address) =>
              api.query.staking.bonded(address).pipe(
                catchError(() => of(null)),
                switchMap((bonded) => {
                  if (!bonded || bonded.isNone) return of(null)

                  const controller = bonded.unwrap().toString()
                  return api.query.staking.ledger(controller).pipe(
                    catchError(() => of(null)),
                    map((ledger) => {
                      if (!ledger || ledger.isNone) return null

                      const ledgerData = ledger.unwrap()
                      const claimedRewards = ledgerData.claimedRewards.map((era) => era.toNumber())

                      const unclaimedEras: number[] = []
                      for (let era = oldestEra; era < currentEra; era++) {
                        if (!claimedRewards.includes(era)) {
                          unclaimedEras.push(era)
                        }
                      }

                      if (unclaimedEras.length === 0) return null

                      let totalClaimable = BN_ZERO

                      unclaimedEras.forEach((era) => {
                        const reward = rewardsByEra.get(era)
                        const points = pointsByEra.get(era)

                        if (!reward || !points || reward.eraReward.isZero()) return

                        const totalPoints = points.eraPoints.toNumber()
                        if (totalPoints === 0) return

                        const validatorPoints = points.validators[address]
                        if (validatorPoints) {
                          const validatorPointsNum = validatorPoints.toNumber()
                          const validatorReward = reward.eraReward.muln(validatorPointsNum).divn(totalPoints)
                          totalClaimable = totalClaimable.add(validatorReward)
                        }
                      })

                      return {
                        address,
                        account: allAccounts.find((acc) => acc.address === address),
                        controller,
                        unclaimedEras,
                        totalClaimable,
                      }
                    })
                  )
                })
              )
            )

            return combineLatest(accountRewards$).pipe(
              map((rewards: (ValidatorClaimableRewards | null)[]) =>
                rewards.filter((r): r is ValidatorClaimableRewards => r !== null && !r.totalClaimable.isZero())
              ),
              catchError(() => of([]))
            )
          })
        )
      })
    )
  }, [api?.isConnected, JSON.stringify(allAccounts.map((a) => a.address))])

  const maxBatchSize = useMemo(() => {
    if (!api) return 5
    try {
      const maxNominatorRewarded = (api.consts.staking.maxNominatorRewardedPerValidator as u32)?.toNumber() || 64
      const calculatedMax = (36 * 64) / maxNominatorRewarded
      return Math.max(1, Math.floor(calculatedMax))
    } catch {
      return 5
    }
  }, [api])

  const totals = useMemo(() => {
    if (!validatorsRewards)
      return {
        totalClaimable: BN_ZERO,
        totalEras: 0,
        accountsCount: 0,
        batchedEras: 0,
        allPayouts: [] as Array<{ validatorAddress: string; era: number }>,
      }

    const totalClaimable = validatorsRewards.reduce((sum, v) => sum.add(v.totalClaimable), BN_ZERO)

    const allPayouts: Array<{ validatorAddress: string; era: number }> = []
    validatorsRewards.forEach((validator) => {
      validator.unclaimedEras.forEach((era) => {
        if (!claimedEras.has(`${validator.address}-${era}`)) {
          allPayouts.push({ validatorAddress: validator.address, era })
        }
      })
    })

    // Sort by era (ascending) to claim oldest first
    allPayouts.sort((a, b) => a.era - b.era)

    const batchedEras = Math.min(allPayouts.length, maxBatchSize)

    return {
      totalClaimable,
      totalEras: allPayouts.length,
      batchedEras,
      accountsCount: validatorsRewards.length,
      allPayouts, // Store sorted payouts for transaction creation
    }
  }, [validatorsRewards, claimedEras, maxBatchSize])

  const transaction = useMemo(() => {
    if (!api || !totals.allPayouts || totals.allPayouts.length === 0) return undefined

    // Get the next batch of payouts (sorted by era, oldest first)
    const nextBatch = totals.allPayouts.slice(0, maxBatchSize)

    const payoutCalls = nextBatch.map(({ validatorAddress, era }) =>
      api.tx.staking.payoutStakers(validatorAddress, era)
    )

    return payoutCalls.length === 0
      ? undefined
      : payoutCalls.length === 1
      ? payoutCalls[0]
      : api.tx.utility.forceBatch(payoutCalls)
  }, [api, totals.allPayouts, maxBatchSize])

  const signerAccount = useMemo(() => {
    if (!validatorsRewards || validatorsRewards.length === 0) {
      if (activeMembership?.controllerAccount) {
        return allAccounts.find((acc) => acc.address === activeMembership.controllerAccount) || allAccounts[0]
      }
      return allAccounts[0]
    }
    const firstController = validatorsRewards[0]?.controller
    if (firstController) {
      return allAccounts.find((acc) => acc.address === firstController) || allAccounts[0]
    }
    return allAccounts[0]
  }, [activeMembership, allAccounts, validatorsRewards])

  const { isReady, sign, paymentInfo, canAfford } = useSignAndSendTransaction({
    transaction,
    signer: signerAccount?.address ?? '',
    service: service as any,
    skipQueryNode: true,
  })

  useEffect(() => {
    if (
      state.matches('success') &&
      validatorsRewards &&
      validatorsRewards.length > 0 &&
      !isProcessingBatchRef.current &&
      api
    ) {
      // Mark the current batch as claimed
      const currentBatch = totals.allPayouts
        ? totals.allPayouts.slice(0, maxBatchSize).map(({ validatorAddress, era }) => `${validatorAddress}-${era}`)
        : []

      if (currentBatch.length > 0) {
        // Calculate remaining eras before updating claimedEras
        // After we mark these as claimed, totals.allPayouts will be recalculated and exclude them
        const totalUnclaimedBefore = totals.allPayouts ? totals.allPayouts.length : 0
        const willRemainAfter = Math.max(0, totalUnclaimedBefore - currentBatch.length)

        setClaimedEras((prev) => {
          const newSet = new Set(prev)
          currentBatch.forEach((key) => newSet.add(key))
          return newSet
        })

        if (willRemainAfter > 0) {
          isProcessingBatchRef.current = true

          // Wait for the next block to be produced (no need to wait for finalization)
          const subscription = api.rpc.chain
            .subscribeNewHeads()
            .pipe(take(1))
            .subscribe({
              next: () => {
                pendingBatchRef.current += 1
                isProcessingBatchRef.current = false
                shouldAutoTriggerNextRef.current = true
                // Restart the transaction state machine to handle the next batch
                setMachineIteration((prev) => prev + 1)
              },
              error: () => {
                isProcessingBatchRef.current = false
              },
            })

          return () => {
            subscription.unsubscribe()
          }
        } else {
          isProcessingBatchRef.current = false
        }
      }
    } else if (!state.matches('success')) {
      // Reset the processing flag when not in success state
      isProcessingBatchRef.current = false
    }
  }, [state.value, validatorsRewards, claimedEras, service, api, totals.allPayouts, maxBatchSize])

  // Auto-trigger next batch when machine is reset and ready
  useEffect(() => {
    if (
      state.matches('prepare') &&
      validatorsRewards &&
      validatorsRewards.length > 0 &&
      !isProcessingBatchRef.current &&
      shouldAutoTriggerNextRef.current &&
      transaction // Ensure transaction is ready
    ) {
      // Check if there are any remaining unclaimed eras
      // totals.allPayouts already excludes claimed eras, so we just need to check if it has items
      if (totals.allPayouts && totals.allPayouts.length > 0) {
        shouldAutoTriggerNextRef.current = false
        // Automatically trigger the next batch
        // Use a slightly longer delay to ensure all state updates have propagated
        setTimeout(() => {
          service.send('SIGN')
        }, 200)
      } else {
        shouldAutoTriggerNextRef.current = false
      }
    }
  }, [state.value, validatorsRewards, claimedEras, service, totals.allPayouts, maxBatchSize, transaction])

  if (state.matches('canceled')) {
    return (
      <Modal onClose={hideModal} modalSize="s" modalHeight="s">
        <ModalHeader title="Transaction Canceled" onClick={hideModal} />
        <ModalBody>
          <TextMedium>
            The transaction was canceled. Please try again if you want to claim your staking rewards.
          </TextMedium>
        </ModalBody>
        <ModalTransactionFooter next={{ onClick: hideModal, label: 'Close' }} />
      </Modal>
    )
  }

  if (state.matches('error')) {
    const errorMessage = state.context.events?.find(
      (event: any) =>
        event?.event?.data?.toString().includes('Invalid Transaction') ||
        event?.event?.data?.toString().includes('exhaust the block limits') ||
        event?.event?.method === 'ExtrinsicFailed'
    )

    const isBlockLimitError =
      errorMessage?.event?.data?.toString().includes('exhaust the block limits') ||
      errorMessage?.event?.data?.toString().includes('Invalid Transaction')

    return (
      <FailureModal onClose={hideModal} events={state.context.events}>
        {isBlockLimitError
          ? 'The transaction would exceed block limits. Please try claiming fewer eras at once.'
          : 'There was a problem with claiming staking rewards'}
      </FailureModal>
    )
  }

  if (
    state.matches('signing') ||
    state.matches('signWithExtension') ||
    state.matches('pending') ||
    state.matches('processing') ||
    state.matches('finalizing')
  ) {
    return null
  }

  if (state.matches('success')) {
    // totals.allPayouts already excludes claimed eras, so we just need to check its length
    const remainingErasCount = totals.allPayouts ? totals.allPayouts.length : 0

    if (remainingErasCount > 0) {
      return (
        <Modal onClose={hideModal} modalSize="s" modalHeight="s">
          <ModalHeader title="Claiming Rewards" onClick={hideModal} />
          <ModalBody>
            <RowGapBlock gap={20}>
              <TextMedium>
                Claiming batch {pendingBatchRef.current + 1}... {remainingErasCount} eras remaining.
              </TextMedium>
              <TextMedium lighter>Please wait while we continue claiming the remaining rewards.</TextMedium>
            </RowGapBlock>
          </ModalBody>
        </Modal>
      )
    }

    return <SuccessModal onClose={hideModal} text="You have successfully claimed all your staking rewards" />
  }

  if (!validatorsRewards || validatorsRewards.length === 0) {
    return (
      <Modal onClose={hideModal} modalSize="s" modalHeight="s">
        <ModalHeader title="Claim Staking Rewards" onClick={hideModal} />
        <ModalBody>
          <TextMedium>No claimable staking rewards found for your validator accounts.</TextMedium>
        </ModalBody>
        <ModalTransactionFooter next={{ onClick: hideModal, label: 'Close' }} />
      </Modal>
    )
  }

  if (state.matches('prepare')) {
    const hasMoreThanLimit = totals.totalEras > totals.batchedEras

    return (
      <Modal onClose={hideModal} modalSize="s" modalHeight="s">
        <ModalHeader title="Claim Staking Rewards" onClick={hideModal} />
        <ModalBody>
          <RowGapBlock gap={20}>
            <TextMedium>
              You are about to claim rewards from {totals.batchedEras} unclaimed era
              {totals.batchedEras !== 1 ? 's' : ''} across {totals.accountsCount} validator account
              {totals.accountsCount !== 1 ? 's' : ''}.
            </TextMedium>
            {hasMoreThanLimit && (
              <TextMedium lighter>
                ℹ️ This will automatically claim all {totals.totalEras} unclaimed eras across multiple transactions.
                Each batch will claim up to {maxBatchSize} eras (filling the block), and remaining eras will be claimed
                automatically in subsequent batches without requiring confirmation.
              </TextMedium>
            )}
            {!canAfford && <TextMedium lighter>⚠️ Insufficient balance to cover transaction fee.</TextMedium>}
          </RowGapBlock>
        </ModalBody>
        <ModalTransactionFooter
          transactionFee={paymentInfo?.partialFee}
          next={{
            onClick: () => sign(),
            label: hasMoreThanLimit ? 'Sign and claim batch' : 'Sign and claim all',
            disabled: !isReady || !canAfford,
          }}
        />
      </Modal>
    )
  }

  return null
}
