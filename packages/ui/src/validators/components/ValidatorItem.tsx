import BN from 'bn.js'
import React, { useMemo } from 'react'
import { combineLatest, first, map, of, switchMap } from 'rxjs'
import styled from 'styled-components'

import { encodeAddress } from '@/accounts/model/encodeAddress'
import { useApi } from '@/api/hooks/useApi'
import { BadgeStatus } from '@/common/components/BadgeStatus'
import { ButtonPrimary } from '@/common/components/buttons'
import { TableListItemAsLinkHover } from '@/common/components/List'
import { Skeleton } from '@/common/components/Skeleton'
import { Tooltip, TooltipPopupTitle, TooltipText } from '@/common/components/Tooltip'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { BorderRad, Colors, Sizes, Transitions, BN_ZERO } from '@/common/constants'
import { useModal } from '@/common/hooks/useModal'
import { useObservable } from '@/common/hooks/useObservable'
import { shortenAddress } from '@/common/model/formatters'
import { whenDefined } from '@/common/utils'
import { useClaimAllNavigation } from '@/validators/hooks/useClaimAllNavigation'
import { useMyStashPositions } from '@/validators/hooks/useMyStashPositions'
import { BondModalCall } from '@/validators/modals/BondModal'
import { NominatingRedirectModalCall } from '@/validators/modals/NominatingRedirectModal'
// import { RebagModalCall } from '@/validators/modals/RebagModal'
// import { RebondModalCall } from '@/validators/modals/RebondModal'
// import { UnbondModalCall } from '@/validators/modals/UnbondModal'
import { ValidatorWithDetails } from '@/validators/types/Validator'

import { useSelectedValidators } from '../context/SelectedValidatorsContext'

// import { ValidatorActionsDropdown } from './ValidatorActionsDropdown'
import { ValidatorInfo } from './ValidatorInfo'

export interface ValidatorItemProps {
  validator: ValidatorWithDetails
  onClick?: () => void
  isNominated?: boolean
}
export const ValidatorItem = ({ validator, onClick, isNominated = false }: ValidatorItemProps) => {
  const { stashAccount, membership, isVerifiedValidator, isActive, commission, APR, staking } = validator
  const { api } = useApi()
  const stashPositions = useMyStashPositions()
  const { showModal } = useModal<NominatingRedirectModalCall>()
  const { showModal: showBondModal } = useModal<BondModalCall>()
  // const { showModal: showUnbondModal } = useModal<UnbondModalCall>()
  const openClaimAllModal = useClaimAllNavigation()
  // const { showModal: showRebagModal } = useModal<RebagModalCall>()
  // const { showModal: showRebondModal } = useModal<RebondModalCall>()
  const { isSelected, toggleSelection, selectedValidators, maxSelection } = useSelectedValidators()
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // Get stake amounts and stash info for this nominated validator
  const nominatedStakesInfo = useObservable<Array<{ stash: string; stake: BN }> | undefined>(() => {
    if (!api || !isNominated || !stashPositions) return of(undefined)

    // Find stash positions that nominate this validator
    const nominatingStashes = stashPositions.filter((pos) => pos.nominations.includes(stashAccount))
    if (nominatingStashes.length === 0) return of(undefined)

    // Get current era and query exposures
    return api.query.staking.activeEra().pipe(
      first(),
      switchMap((activeEra) => {
        if (activeEra.isNone) return of(undefined)
        const currentEra = activeEra.unwrap().index.toNumber()

        // Query exposures for all nominating stashes
        const exposureQueries = nominatingStashes.map((pos) =>
          api.query.staking.erasStakers(currentEra, stashAccount).pipe(
            first(),
            map((exposure) => {
              if (!exposure || exposure.isEmpty) return { stash: pos.stash, stake: BN_ZERO }
              const nominatorExposure = exposure.others.find((other) => other.who.toString() === pos.stash)
              return {
                stash: pos.stash,
                stake: nominatorExposure ? nominatorExposure.value.toBn() : BN_ZERO,
              }
            })
          )
        )

        return combineLatest(exposureQueries).pipe(
          first(),
          map((stakesInfo) => stakesInfo.filter((info) => !info.stake.isZero()))
        )
      })
    )
  }, [api?.isConnected, isNominated, stashAccount, stashPositions])

  const nominatedStake = useMemo(() => {
    if (!nominatedStakesInfo || nominatedStakesInfo.length === 0) return undefined
    return nominatedStakesInfo.reduce((sum, info) => sum.add(info.stake), BN_ZERO)
  }, [nominatedStakesInfo])

  const handleActionClick = (e: React.MouseEvent, action: string) => {
    e.stopPropagation()
    const validatorAddress = encodeAddress(stashAccount)

    switch (action) {
      case 'Select':
        toggleSelection(validator)
        break
      case 'Bond':
        showBondModal({ modal: 'Bond', data: { validatorAddress } })
        break
      case 'Payout':
        openClaimAllModal()
        break

      default:
        showModal({ modal: 'NominatingRedirect' })
    }
  }

  const isValidatorSelected = isSelected(validator)
  const canSelect = !isValidatorSelected && selectedValidators.length < maxSelection

  return (
    <ValidatorItemWrapper onClick={onClick}>
      <ValidatorItemWrap>
        <ValidatorInfo member={membership} address={encodeAddress(stashAccount)} />
        {isVerifiedValidator ? (
          <BadgeStatus inverted size="l">
            verified
          </BadgeStatus>
        ) : (
          <div></div>
        )}
        <BadgeStatus inverted size="l">
          {isActive ? 'active' : 'waiting'}
        </BadgeStatus>
        <TokenValue size="xs" value={staking?.own} />
        <TokenValue size="xs" value={staking?.total} />
        <TextMedium bold>{whenDefined(APR, (apr) => `${apr}%`) ?? '-'}</TextMedium>
        <TextMedium bold>{commission}%</TextMedium>
        <ActionButtons>
          {isNominated ? (
            <NominatedInfo>
              <TextMedium lighter>Nominated</TextMedium>
              {nominatedStake && !nominatedStake.isZero() && <TokenValue size="xs" value={nominatedStake} />}
              {nominatedStakesInfo && nominatedStakesInfo.length > 1 && (
                <Tooltip
                  popupContent={
                    <NominatorsTooltipContent>
                      <TooltipPopupTitle>Nominated by {nominatedStakesInfo.length} stashes:</TooltipPopupTitle>
                      {nominatedStakesInfo.map((info) => (
                        <TooltipRow key={info.stash}>
                          <TooltipText>{shortenAddress(encodeAddress(info.stash), 20)}</TooltipText>
                          <TooltipText>
                            <TokenValue size="xs" value={info.stake} />
                          </TooltipText>
                        </TooltipRow>
                      ))}
                    </NominatorsTooltipContent>
                  }
                >
                  <HandIcon>👋</HandIcon>
                </Tooltip>
              )}
            </NominatedInfo>
          ) : isValidatorSelected ? (
            <ButtonPrimary
              size="small"
              onClick={(e) => handleActionClick(e, 'Select')}
              disabled={true}
              title="This validator is already selected for nomination."
            >
              Selected
            </ButtonPrimary>
          ) : (
            <ButtonPrimary
              size="small"
              onClick={(e) => handleActionClick(e, 'Select')}
              disabled={!canSelect}
              title={canSelect ? 'Select this validator for nomination' : 'Maximum number of validators selected'}
            >
              {canSelect ? 'Select' : 'Max Reached'}
            </ButtonPrimary>
          )}
        </ActionButtons>
      </ValidatorItemWrap>
    </ValidatorItemWrapper>
  )
}

const ValidatorItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid ${Colors.Black[100]};
  border-radius: ${BorderRad.s};
  cursor: pointer;
  transition: ${Transitions.all};
  position: relative;
  z-index: 1;

  ${TableListItemAsLinkHover}
`

export const ValidatorItemWrap = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 0.8fr 1.4fr 1.4fr 1.4fr 1fr 1fr;
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

const ActionButtons = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  gap: 8px;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  min-height: 40px;
`

const NominatedInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const HandIcon = styled.span`
  cursor: help;
  font-size: 16px;
  line-height: 1;
  margin-left: 4px;
`

const NominatorsTooltipContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 300px;
`

const TooltipRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`
