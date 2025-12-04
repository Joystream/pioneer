import React, { useState } from 'react'
import { combineLatest, map, of, switchMap } from 'rxjs'
import styled from 'styled-components'

import { AccountInfo } from '@/accounts/components/AccountInfo'
import { Account } from '@/accounts/types'
import { useApi } from '@/api/hooks/useApi'
import { TransactionButtonWrapper } from '@/common/components/buttons/TransactionButton'
import { TableListItemAsLinkHover } from '@/common/components/List'
import { Skeleton } from '@/common/components/Skeleton'
import { TokenValue } from '@/common/components/typography'
import { BorderRad, BN_ZERO, Colors, ERA_DEPTH, Sizes, Transitions } from '@/common/constants'
import { useModal } from '@/common/hooks/useModal'
import { useObservable } from '@/common/hooks/useObservable'
import { AccountStakingRewards } from '@/validators/hooks/useAllAccountsStakingRewards'

import { ValidatorOverViewClaimButton } from '../styles'

export interface AccountItemDataProps {
  account: Account
  stakingRewards?: AccountStakingRewards
}

export const ValidatorAccountItem = ({ account, stakingRewards: propsStakingRewards }: AccountItemDataProps) => {
  const address = account.address
  const { showModal } = useModal()
  const { api } = useApi()

  const [isDropped, setDropped] = useState(false)

  // Get staking rewards data (total earned and claimable) - fallback if not provided
  const fetchedStakingRewards = useObservable(() => {
    if (!api || !address) return of(undefined)

    const eraInfo$ = api.query.staking.activeEra().pipe(
      map((activeEra) => {
        if (activeEra.isNone) return undefined
        const currentEra = activeEra.unwrap().index.toNumber()
        return { currentEra, oldestEra: Math.max(0, currentEra - ERA_DEPTH) }
      })
    )

    return eraInfo$.pipe(
      switchMap((eraInfo) => {
        if (!eraInfo) return of(undefined)

        return api.query.staking.bonded(address).pipe(
          switchMap((bonded) => {
            if (bonded.isNone) return of(undefined)

            const controller = bonded.unwrap().toString()
            return api.query.staking.ledger(controller).pipe(
              switchMap((ledger) => {
                if (ledger.isNone) return of(undefined)

                const ledgerData = ledger.unwrap()
                const claimedRewards = ledgerData.claimedRewards.map((era) => era.toNumber())

                const unclaimedEras: number[] = []
                for (let era = eraInfo.oldestEra; era < eraInfo.currentEra; era++) {
                  if (!claimedRewards.includes(era)) {
                    unclaimedEras.push(era)
                  }
                }

                const erasRewards$ = api.derive.staking.erasRewards()
                const erasPoints$ = api.derive.staking.erasPoints()

                return combineLatest([erasRewards$, erasPoints$]).pipe(
                  map(([erasRewards, erasPoints]) => {
                    const rewardsByEra = new Map(erasRewards.map((reward: any) => [reward.era.toNumber(), reward]))
                    const pointsByEra = new Map(erasPoints.map((points: any) => [points.era.toNumber(), points]))

                    let totalEarned = BN_ZERO
                    let claimable = BN_ZERO

                    for (let era = eraInfo.oldestEra; era < eraInfo.currentEra; era++) {
                      const reward = rewardsByEra.get(era)
                      const points = pointsByEra.get(era)

                      if (!reward || !points || reward.eraReward.isZero()) continue

                      const totalPoints = points.eraPoints.toNumber()
                      if (totalPoints === 0) continue

                      const validatorPoints = points.validators[address]
                      if (validatorPoints) {
                        const validatorPointsNum = validatorPoints.toNumber()
                        const validatorReward = reward.eraReward.muln(validatorPointsNum).divn(totalPoints)

                        totalEarned = totalEarned.add(validatorReward)

                        if (unclaimedEras.includes(era)) {
                          claimable = claimable.add(validatorReward)
                        }
                      }
                    }

                    return {
                      totalEarned,
                      claimable,
                      hasClaimable: !claimable.isZero(),
                    }
                  })
                )
              })
            )
          })
        )
      })
    )
  }, [api?.isConnected, address])

  // Use provided rewards if available, otherwise use fetched rewards
  const stakingRewards = propsStakingRewards || fetchedStakingRewards

  const handleClaimReward = (e: React.MouseEvent) => {
    e.stopPropagation()
    showModal({ modal: 'ClaimStakingRewardsModal', data: { address } })
  }

  return (
    <AccountItemWrapper>
      <AccountItemWrap key={address} onClick={() => setDropped(!isDropped)}>
        <AccountInfo account={account} />
        <TokenValue value={stakingRewards?.totalEarned} isLoading={!stakingRewards} />
        <TokenValue value={stakingRewards?.claimable} isLoading={!stakingRewards} />
        <TransactionButtonWrapper>
          <ValidatorOverViewClaimButton
            size="small"
            disabled={!stakingRewards?.hasClaimable}
            onClick={handleClaimReward}
          >
            Claim Reward
          </ValidatorOverViewClaimButton>
        </TransactionButtonWrapper>
      </AccountItemWrap>
    </AccountItemWrapper>
  )
}

const AccountItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid ${Colors.Black[100]};
  border-radius: ${BorderRad.s};
  cursor: pointer;
  transition: ${Transitions.all};

  ${TableListItemAsLinkHover}
`

export const AccountItemWrap = styled.div`
  display: grid;
  grid-template-columns: 276px repeat(2, 128px) 104px;
  grid-template-rows: 1fr;
  justify-content: space-between;
  justify-items: start;
  align-items: center;
  width: 100%;
  height: ${Sizes.accountHeight};
  padding: 16px;
  margin: -1px;

  ${Skeleton} {
    min-width: 80%;
    height: 1.2rem;
  }
`
