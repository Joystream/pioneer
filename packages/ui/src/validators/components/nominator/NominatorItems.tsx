import BN from 'bn.js'
import React, { useEffect, useMemo, useState } from 'react'
import { combineLatest, first, map, of, catchError } from 'rxjs'
import styled, { createGlobalStyle } from 'styled-components'

import { AccountInfo } from '@/accounts/components/AccountInfo'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { encodeAddress } from '@/accounts/model/encodeAddress'
import { Account } from '@/accounts/types'
import { useApi } from '@/api/hooks/useApi'
import { ButtonGhost } from '@/common/components/buttons'
import { EditSymbol } from '@/common/components/icons/symbols'
import { LockSymbol } from '@/common/components/icons/symbols/LockSymbol'
import { TableListItemAsLinkHover } from '@/common/components/List'
import { Tooltip, TooltipPopupTitle, TooltipText } from '@/common/components/Tooltip'
import { TextMedium, TextSmall, TokenValue } from '@/common/components/typography'
import { BorderRad, Colors, Sizes, Transitions, BN_ZERO, ERAS_PER_DAY } from '@/common/constants'
import { useModal } from '@/common/hooks/useModal'
import { useObservable } from '@/common/hooks/useObservable'
import { shortenAddress } from '@/common/model/formatters'
import { MyStashPosition } from '@/validators/hooks/useMyStashPositions'
import { ChangeSessionKeysModalCall } from '@/validators/modals/ChangeSessionKeysModal'
import { ManageStashAction, ManageStashActionModalCall } from '@/validators/modals/ManageStashActionModal'
import { SetNomineesModalCall } from '@/validators/modals/SetNomineesModal'
import { StopStakingModalCall } from '@/validators/modals/StopStakingModal'
import { UnbondStakingModalCall } from '@/validators/modals/UnbondStakingModal'
import { ValidateModalCall } from '@/validators/modals/ValidateModal'
import { ValidatorWithDetails } from '@/validators/types/Validator'

import { ButtonForTransfer, MenuActionItem, NominatorActionMenu } from './NominatorActionMenu'

interface Props {
  account?: Account
  position: MyStashPosition
  validatorDetails?: ValidatorWithDetails
  totalStaked: BN
  totalClaimable: BN
}

export const NorminatorDashboardItem = ({
  account,
  position,
  validatorDetails,
  totalStaked,
  totalClaimable,
}: Props) => {
  const { showModal } = useModal()
  const { allAccounts } = useMyAccounts()
  const accountInfo = useMemo<Account>(() => {
    if (account) {
      return account
    }

    return {
      address: position.stash,
      name: shortenAddress(position.stash),
      source: 'external',
    }
  }, [account, position.stash])

  const controllerAccountInfo = useMemo<Account | null>(() => {
    if (!position.controller) return null
    // Find controller account if it exists in allAccounts
    const controllerAccount = allAccounts?.find((acc) => acc.address === position.controller)
    if (controllerAccount) {
      return controllerAccount
    }
    return {
      address: position.controller,
      name: shortenAddress(position.controller),
      source: 'external',
    }
  }, [position.controller])

  const roleLabel = useMemo(() => {
    switch (position.role) {
      case 'validator':
        return 'Validator'
      case 'nominator':
        return 'Nominator'
      default:
        return 'Inactive'
    }
  }, [position.role])

  const roleVariant = useMemo(() => {
    switch (position.role) {
      case 'validator':
        return 'success'
      case 'nominator':
        return 'info'
      default:
        return 'neutral'
    }
  }, [position.role])

  const assignmentsCount = useMemo(() => {
    if (position.role === 'validator') {
      return validatorDetails?.staking?.nominators.length ?? 0
    }
    return position.nominations.length
  }, [position.role, validatorDetails?.staking?.nominators, position.nominations])

  const { api } = useApi()

  const currentEra = useObservable(() => {
    if (!api) return of(undefined)
    return api.query.staking.activeEra().pipe(
      map((activeEra) => {
        if (activeEra.isNone) return undefined
        return activeEra.unwrap().index.toNumber()
      })
      // Remove first() to allow continuous updates for countdown
    )
  }, [api?.isConnected])

  // Force re-render every minute to update countdown display
  const [, setTick] = useState(0)
  useEffect(() => {
    if (!currentEra) return
    const interval = setInterval(() => {
      // Trigger re-render to update countdown display
      setTick((t) => t + 1)
    }, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [currentEra])

  const activeValidators = useObservable(() => {
    if (!api) return of([] as string[])
    return api.query.session.validators().pipe(
      map((validators) => validators.map((v) => v.toString())),
      first()
    )
  }, [api?.isConnected])

  interface NominationInfo {
    address: string
    isActive: boolean
    stake?: BN
  }

  const nominationsInfo = useObservable<NominationInfo[]>(() => {
    if (!api || position.role !== 'nominator' || !position.nominations.length || !currentEra) {
      return of([])
    }

    const activeValidatorsSet = new Set(activeValidators || [])

    const exposureQueries = position.nominations
      .filter((nom) => activeValidatorsSet.has(nom))
      .map((nom) =>
        api.query.staking.erasStakers(currentEra, nom).pipe(
          map((exposure) => {
            if (!exposure || exposure.isEmpty) return { address: nom, isActive: true, stake: BN_ZERO }
            const stash = position.stash
            const nominatorExposure = exposure.others.find((other) => other.who.toString() === stash)
            return {
              address: nom,
              isActive: true,
              stake: nominatorExposure ? nominatorExposure.value.toBn() : BN_ZERO,
            }
          }),
          first()
        )
      )

    const inactiveNominations: NominationInfo[] = position.nominations
      .filter((nom) => !activeValidatorsSet.has(nom))
      .map((nom) => ({ address: nom, isActive: false }))

    if (exposureQueries.length === 0) {
      return of(inactiveNominations)
    }

    return combineLatest(exposureQueries).pipe(
      map((activeInfos) => [...activeInfos, ...inactiveNominations]),
      first()
    )
  }, [api?.isConnected, currentEra, activeValidators, position.nominations, position.role, position.stash])

  const activeNominationsCount = useMemo(() => {
    if (position.role === 'validator') return assignmentsCount
    if (!activeValidators || !position.nominations.length) return 0
    const activeSet = new Set(activeValidators)
    return position.nominations.filter((nom) => activeSet.has(nom)).length
  }, [position.role, position.nominations, activeValidators, assignmentsCount])

  const unlockingTotal = useMemo(
    () => position.unlocking.reduce((sum, chunk) => sum.add(chunk.value), new BN(0)),
    [position.unlocking]
  )

  const claimableReward = useMemo(() => {
    if (totalClaimable.isZero() || totalStaked.isZero() || position.activeStake.isZero()) {
      return BN_ZERO
    }

    return totalClaimable.mul(position.activeStake).div(totalStaked)
  }, [position.activeStake, totalClaimable, totalStaked])

  const canStop = position.role !== 'inactive'
  const canUnbond = position.role === 'inactive' && (!position.totalStake.isZero() || !unlockingTotal.isZero())

  const rewardDestination = useObservable(() => {
    if (!api || !position.controller) return of(undefined)

    // Check if payee query is available
    if (!api.query.staking || typeof api.query.staking.payee !== 'function') {
      return of('Staked') // Default fallback
    }

    return api.query.staking.payee(position.controller).pipe(
      map((payee) => {
        if (payee.isStaked) return 'Staked'
        if (payee.isStash) return 'Stash'
        if (payee.isController) return 'Controller'
        if (payee.isAccount) return 'Account'
        return 'Staked'
      }),
      catchError(() => {
        // If query fails, return default value
        return of('Staked')
      }),
      first()
    )
  }, [api?.isConnected, position.controller])

  const UNBONDING_PERIOD_ERAS = 112

  const getUnbondingTimeInfo = useMemo(() => {
    if (!currentEra || !position.unlocking.length) {
      return { hasUnbonding: false, remainingEras: 0, isRecoverable: false }
    }

    const earliestChunk = position.unlocking.reduce((earliest, chunk) => {
      if (!earliest || chunk.era < earliest.era) return chunk
      return earliest
    }, position.unlocking[0])

    const remainingEras = UNBONDING_PERIOD_ERAS - (currentEra - earliestChunk.era)
    const isRecoverable = remainingEras === 0 && earliestChunk.era + UNBONDING_PERIOD_ERAS <= currentEra

    return {
      hasUnbonding: true,
      remainingEras,
      earliestEra: earliestChunk.era,
      isRecoverable,
    }
  }, [currentEra, position.unlocking])

  const BLOCKS_PER_ERA = 3600
  const remainingBlocks = useMemo(() => {
    if (!getUnbondingTimeInfo.hasUnbonding || getUnbondingTimeInfo.isRecoverable) return null
    return new BN(getUnbondingTimeInfo.remainingEras * BLOCKS_PER_ERA)
  }, [getUnbondingTimeInfo])

  const unbondingTooltipText = useMemo(() => {
    if (!getUnbondingTimeInfo.hasUnbonding) return null
    if (getUnbondingTimeInfo.isRecoverable) {
      return (
        <UnbondingTooltipContent>
          <TooltipText>Recoverable</TooltipText>
        </UnbondingTooltipContent>
      )
    }

    const { remainingEras } = getUnbondingTimeInfo
    const remainingDays = Math.floor(remainingEras / ERAS_PER_DAY)
    const remainingHours = Math.floor((remainingEras % ERAS_PER_DAY) * 6)
    const blocks = remainingBlocks || BN_ZERO

    let timeText = ''
    if (remainingDays > 0) {
      timeText = `${remainingDays} day${remainingDays > 1 ? 's' : ''} ${remainingHours} hr${
        remainingHours !== 1 ? 's' : ''
      }`
    } else {
      timeText = `${remainingHours} hr${remainingHours !== 1 ? 's' : ''}`
    }

    return (
      <UnbondingTooltipContent>
        <TooltipText>
          {blocks.toString()} blocks ({timeText})
        </TooltipText>
      </UnbondingTooltipContent>
    )
  }, [getUnbondingTimeInfo, remainingBlocks])

  const openChangeControllerModal = () => {
    showModal<ManageStashActionModalCall>({
      modal: 'ManageStashActionModal',
      data: {
        stash: position.stash,
        controller: position.controller,
        action: 'changeController',
        activeStake: position.activeStake,
        totalStake: position.totalStake,
        unlocking: position.unlocking,
      },
    })
  }

  const openManageActionModal = (action: ManageStashAction) =>
    showModal<ManageStashActionModalCall>({
      modal: 'ManageStashActionModal',
      data: {
        stash: position.stash,
        controller: position.controller,
        action,
        activeStake: position.activeStake,
        totalStake: position.totalStake,
        unlocking: position.unlocking,
      },
    })

  const openSetNomineesModal = () =>
    showModal<SetNomineesModalCall>({
      modal: 'SetNomineesModal',
      data: {
        stash: position.stash,
        nominations: position.nominations,
      },
    })

  const openStopStakingModal = () =>
    showModal<StopStakingModalCall>({
      modal: 'StopStakingModal',
      data: {
        stash: position.stash,
        role: position.role,
      },
    })

  const openUnbondModal = () =>
    showModal<UnbondStakingModalCall>({
      modal: 'UnbondStakingModal',
      data: {
        stash: position.stash,
        controller: position.controller,
        bonded: position.totalStake,
      },
    })

  const openChangeSessionKeysModal = () =>
    showModal<ChangeSessionKeysModalCall>({
      modal: 'ChangeSessionKeysModal',
      data: {
        stash: position.stash,
        controller: position.controller,
      },
    })

  const openValidateModal = () =>
    showModal<ValidateModalCall>({
      modal: 'Validate',
      data: {
        validatorAddress: position.stash,
      },
    })

  const menuItems: MenuActionItem[] = [
    {
      label: 'Bond more / Rebond after unbonding',
      onClick: () => openManageActionModal('bondRebond'),
      disabled: !position.controller,
    },
    // {
    //   label: 'Withdraw funds after unbonding period',
    //   onClick: () => openManageActionModal('withdraw'),
    //   disabled: !position.controller || unlockingTotal.isZero(),
    // },
    {
      label: 'Change controller account',
      onClick: () => openManageActionModal('changeController'),
    },
    {
      label: 'Change reward destination',
      onClick: () => openManageActionModal('changeReward'),
    },
  ]

  // if (position.role === 'nominator') {
  //   menuItems.push({
  //     label: 'Set nominees',
  //     onClick: openSetNomineesModal,
  //   })
  // }

  if (position.role === 'inactive') {
    menuItems.push(
      {
        label: 'Start nominating',
        onClick: openSetNomineesModal,
      },
      {
        label: 'Set validator commission',
        onClick: openValidateModal,
      },
      {
        label: 'Set session keys',
        onClick: openChangeSessionKeysModal,
        disabled: !position.controller,
      }
    )
  }

  if (position.role === 'validator') {
    menuItems.push({
      label: 'Change session keys',
      onClick: openChangeSessionKeysModal,
      disabled: !position.controller,
    })
  }

  return (
    <>
      <WideTooltipStyle />
      <ValidatorItemWrapper>
        <ValidatorItemWrap>
          <RoleCell>
            <RoleBadge role={roleVariant}>{roleLabel}</RoleBadge>
          </RoleCell>

          <AccountCell>
            <AccountInfo account={accountInfo} />
          </AccountCell>

          <ControllerCell>
            {controllerAccountInfo ? (
              <>
                <AccountInfo account={controllerAccountInfo} />
                <ButtonForTransfer
                  size="small"
                  square
                  onClick={(e) => {
                    e.stopPropagation()
                    openChangeControllerModal()
                  }}
                >
                  <EditSymbol />
                </ButtonForTransfer>
              </>
            ) : (
              <TextSmall lighter>-</TextSmall>
            )}
          </ControllerCell>

          <RewardsCell>
            <TextSmall>{rewardDestination || '-'}</TextSmall>
          </RewardsCell>

          <StakeCell>
            <StakeInfo>
              <StakeRow>
                <TokenValue value={position.activeStake} />
              </StakeRow>
              {unlockingTotal.gt(BN_ZERO) && getUnbondingTimeInfo.hasUnbonding && (
                <StakeRow>
                  {getUnbondingTimeInfo.isRecoverable && (
                    <RecoverableButton
                      size="small"
                      square
                      onClick={(e) => {
                        e.stopPropagation()
                        openManageActionModal('withdraw')
                      }}
                      title="Recoverable - click to withdraw"
                    >
                      <LockSymbol />
                    </RecoverableButton>
                  )}
                  {!getUnbondingTimeInfo.isRecoverable && unbondingTooltipText && (
                    <Tooltip popupContent={unbondingTooltipText}>
                      <UnbondingIcon>
                        <TextSmall lighter>
                          <TokenValue value={unlockingTotal} /> unbonding
                        </TextSmall>
                      </UnbondingIcon>
                    </Tooltip>
                  )}
                </StakeRow>
              )}
            </StakeInfo>
          </StakeCell>

          <AssignmentsCell>
            {position.role === 'nominator' && position.nominations.length > 0 ? (
              <Tooltip
                className="wide-tooltip"
                popupContent={
                  <NominationsTooltipContent>
                    {nominationsInfo === undefined ? (
                      <TextSmall lighter>Loading...</TextSmall>
                    ) : nominationsInfo && nominationsInfo.length > 0 ? (
                      <>
                        {nominationsInfo.some((n) => n.isActive) && (
                          <>
                            <TooltipSection>
                              <TooltipPopupTitle>
                                Active ({nominationsInfo.filter((n) => n.isActive).length})
                              </TooltipPopupTitle>
                              {nominationsInfo
                                .filter((n) => n.isActive)
                                .map((nom) => {
                                  return (
                                    <TooltipRow key={nom.address}>
                                      <TooltipText>
                                        {nom.address.includes('...')
                                          ? nom.address
                                          : shortenAddress(encodeAddress(nom.address), 20)}
                                      </TooltipText>
                                      {nom.stake && <TokenValue value={nom.stake} />}
                                    </TooltipRow>
                                  )
                                })}
                            </TooltipSection>
                            {nominationsInfo.some((n) => !n.isActive) && <TooltipDivider />}
                          </>
                        )}
                        {nominationsInfo.some((n) => !n.isActive) && (
                          <TooltipSection>
                            <TooltipPopupTitle>
                              Inactive ({nominationsInfo.filter((n) => !n.isActive).length})
                            </TooltipPopupTitle>
                            {nominationsInfo
                              .filter((n) => !n.isActive)
                              .map((nom) => (
                                <TooltipRow key={nom.address}>
                                  <TooltipText>
                                    {nom.address.includes('...')
                                      ? nom.address
                                      : shortenAddress(encodeAddress(nom.address), 20)}
                                  </TooltipText>
                                </TooltipRow>
                              ))}
                          </TooltipSection>
                        )}
                      </>
                    ) : (
                      <TextSmall lighter>No nominations info available</TextSmall>
                    )}
                  </NominationsTooltipContent>
                }
              >
                <NominationsIndicator>
                  {nominationsInfo === undefined ? (
                    <TextSmall lighter>Loading...</TextSmall>
                  ) : (
                    <TextMedium>
                      {activeNominationsCount} / {position.nominations.length}
                    </TextMedium>
                  )}
                  <ButtonForTransfer
                    size="small"
                    square
                    onClick={(e) => {
                      e.stopPropagation()
                      openSetNomineesModal()
                    }}
                  >
                    <EditSymbol />
                  </ButtonForTransfer>
                </NominationsIndicator>
              </Tooltip>
            ) : (
              assignmentsCount > 0 && <TextMedium>{assignmentsCount}</TextMedium>
            )}
          </AssignmentsCell>

          <TokenValue value={claimableReward} />

          <NominatorActionMenu
            items={menuItems}
            canStop={canStop}
            stopDisabled={!position.controller}
            onStop={openStopStakingModal}
            canUnbond={canUnbond}
            onUnbond={openUnbondModal}
          />
        </ValidatorItemWrap>
      </ValidatorItemWrapper>
    </>
  )
}

const ValidatorItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid ${Colors.Black[100]};
  border-radius: ${BorderRad.s};
  transition: ${Transitions.all};
  ${TableListItemAsLinkHover}
`

export const ValidatorItemWrap = styled.div`
  display: grid;
  grid-template-columns: 100px 210px 240px 120px 180px 140px 140px 40px 40px 40px;
  grid-template-rows: 1fr;
  justify-content: space-between;
  justify-items: start;
  align-items: center;
  width: 100%;
  min-height: ${Sizes.accountHeight};
  padding: 16px 8px 16px 16px;
  margin-left: -1px;
  gap: 16px;
`

const AccountCell = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`

const RoleCell = styled.div`
  display: flex;
  align-items: center;
`

const AssignmentsCell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const ControllerCell = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
`

const RewardsCell = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`

const StakeCell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 4px;
`

const StakeInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`

const StakeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const UnbondingIcon = styled.div`
  display: flex;
  align-items: center;
  cursor: help;
  color: ${Colors.Black[600]};
  svg {
    width: 16px;
    height: 16px;
  }
  &:hover {
    color: ${Colors.Black[900]};
  }
`

const RecoverableButton = styled(ButtonGhost)`
  padding: 4px;
  svg {
    color: ${Colors.Blue[500]};
  }
`

const NominationsIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const WideTooltipStyle = createGlobalStyle`
  .wide-tooltip {
    max-width: 600px !important;
    width: max-content;
  }
`

const NominationsTooltipContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 300px;
`

const TooltipSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }
`

const TooltipRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;

  &:last-child {
    margin-bottom: 0;
  }
`

const TooltipDivider = styled.div`
  height: 1px;
  background-color: ${Colors.Black[500]};
  margin: 8px 0;
`

const UnbondingTooltipContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

type RoleVariant = 'success' | 'info' | 'neutral'

const RoleBadge = styled.span<{ role: RoleVariant }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 12px;
  border-radius: ${BorderRad.full};
  font-size: 12px;
  line-height: 16px;
  font-weight: 700;
  text-transform: uppercase;
  background-color: ${({ role }) => {
    switch (role) {
      case 'success':
        return Colors.Green[100]
      case 'info':
        return Colors.Blue[100]
      default:
        return Colors.Black[100]
    }
  }};
  color: ${({ role }) => {
    switch (role) {
      case 'success':
        return Colors.Green[500]
      case 'info':
        return Colors.Blue[600]
      default:
        return Colors.Black[600]
    }
  }};
`
