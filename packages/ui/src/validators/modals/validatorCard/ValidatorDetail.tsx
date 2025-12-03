import BN from 'bn.js'
import React from 'react'
import { combineLatest, first, map, of, switchMap } from 'rxjs'
import styled from 'styled-components'

import { useApi } from '@/api/hooks/useApi'
import { ButtonPrimary } from '@/common/components/buttons'
import { MarkdownPreview } from '@/common/components/MarkdownPreview'
import { ModalFooter } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { SidePaneBody, SidePaneLabel, SidePaneRow, SidePaneText } from '@/common/components/SidePane'
import { NumericValueStat, StatisticsThreeColumns, TokenValueStat } from '@/common/components/statistics'
import { TextSmall, TokenValue } from '@/common/components/typography'
import { BN_ZERO } from '@/common/constants'
import { plural } from '@/common/helpers'
import { useModal } from '@/common/hooks/useModal'
import { useObservable } from '@/common/hooks/useObservable'
import { whenDefined } from '@/common/utils'
import RewardPointsChart from '@/validators/components/RewardPointChart'
import { useSelectedValidators } from '@/validators/context/SelectedValidatorsContext'
import { useClaimAllNavigation } from '@/validators/hooks/useClaimAllNavigation'
import { useMyStashPositions } from '@/validators/hooks/useMyStashPositions'

import { ValidatorWithDetails } from '../../types'
import { BondModalCall } from '../BondModal'
import { NominateValidatorModalCall } from '../NominateValidatorModal'
import { NominatingRedirectModalCall } from '../NominatingRedirectModal'
import { StakeModalCall } from '../StakeModal'
import { UnbondModalCall } from '../UnbondModal'

interface Props {
  validator: ValidatorWithDetails
  eraIndex: number | undefined
  hideModal: () => void
  isNominated?: boolean
}

export const ValidatorDetail = ({ validator, eraIndex, hideModal, isNominated = false }: Props) => {
  const { api } = useApi()
  const stashPositions = useMyStashPositions()
  const { showModal } = useModal<NominatingRedirectModalCall>()
  const { showModal: showNominateModal } = useModal<NominateValidatorModalCall>()
  const { showModal: showStakeModal } = useModal<StakeModalCall>()
  const { showModal: showBondModal } = useModal<BondModalCall>()
  const { showModal: showUnbondModal } = useModal<UnbondModalCall>()
  const { isSelected, toggleSelection, selectedValidators, maxSelection } = useSelectedValidators()
  const openClaimAllModal = useClaimAllNavigation()

  // Get stake amount for this nominated validator
  const nominatedStake = useObservable<BN | undefined>(() => {
    if (!api || !isNominated || !stashPositions) return of(undefined)

    // Find stash positions that nominate this validator
    const nominatingStashes = stashPositions.filter((pos) => pos.nominations.includes(validator.stashAccount))
    if (nominatingStashes.length === 0) return of(undefined)

    // Get current era and query exposures
    return api.query.staking.activeEra().pipe(
      first(),
      switchMap((activeEra) => {
        if (activeEra.isNone) return of(undefined)
        const currentEra = activeEra.unwrap().index.toNumber()

        // Query exposures for all nominating stashes
        const exposureQueries = nominatingStashes.map((pos) =>
          api.query.staking.erasStakers(currentEra, validator.stashAccount).pipe(
            first(),
            map((exposure) => {
              if (!exposure || exposure.isEmpty) return BN_ZERO
              const nominatorExposure = exposure.others.find((other) => other.who.toString() === pos.stash)
              return nominatorExposure ? nominatorExposure.value.toBn() : BN_ZERO
            })
          )
        )

        return combineLatest(exposureQueries).pipe(
          first(),
          map((stakes) => stakes.reduce((sum, stake) => sum.add(stake), BN_ZERO))
        )
      })
    )
  }, [api?.isConnected, isNominated, validator.stashAccount, stashPositions])

  const uptime = whenDefined(validator.rewardPointsHistory, (rewardPointsHistory) => {
    const firstEra = rewardPointsHistory.at(0)?.era
    if (!eraIndex || !firstEra) return
    const totalEras = eraIndex - firstEra
    const validatedEra = rewardPointsHistory.filter(({ rewardPoints }) => rewardPoints > 0).length
    return `${((validatedEra / totalEras) * 100).toFixed(1)}%`
  })

  const isValidatorSelected = isSelected(validator)
  const canSelect = !isValidatorSelected && selectedValidators.length < maxSelection

  const handleActionClick = async (action: string) => {
    const validatorAddress = validator.stashAccount

    switch (action) {
      case 'Select':
        toggleSelection(validator)
        break
      case 'Nominate':
        await new Promise((resolve) => setTimeout(resolve, 0)) // Make async
        hideModal()
        showNominateModal({ modal: 'NominateValidator', data: { validatorAddress } })
        break
      case 'Stake':
        await new Promise((resolve) => setTimeout(resolve, 0)) // Make async
        hideModal()
        showStakeModal({ modal: 'Stake', data: { validatorAddress } })
        break
      case 'Bond':
        await new Promise((resolve) => setTimeout(resolve, 0)) // Make async
        hideModal()
        showBondModal({ modal: 'Bond', data: { validatorAddress } })
        break
      case 'Unbond':
        await new Promise((resolve) => setTimeout(resolve, 0)) // Make async
        hideModal()
        showUnbondModal({ modal: 'Unbond', data: { validatorAddress } })
        break
      case 'Payout':
        await new Promise((resolve) => setTimeout(resolve, 0)) // Make async
        hideModal()
        openClaimAllModal()
        break
      default:
        await new Promise((resolve) => setTimeout(resolve, 0)) // Make async
        hideModal()
        showModal({ modal: 'NominatingRedirect' })
    }
  }

  return (
    <>
      <SidePaneBody>
        <Details gap={24}>
          <RowGapBlock gap={4}>
            <h6>Key elements</h6>
            <ModalStatistics>
              <TokenValueStat size="s" value={validator.totalRewards}>
                <TextSmall lighter>Total reward</TextSmall>
              </TokenValueStat>
              <Stat size="s" value={whenDefined(validator.APR, (apr) => `${apr}%`)}>
                <TextSmall lighter>Average APR</TextSmall>
              </Stat>
              <TokenValueStat
                size="s"
                value={validator.staking?.nominators.reduce((a, b) => a.add(b.staking), BN_ZERO)}
              >
                <TextSmall lighter>Staked by nominators</TextSmall>
              </TokenValueStat>
              <Stat size="s" value={validator.isVerifiedValidator ? 'Verified' : 'Unverified'}>
                <TextSmall lighter>Status</TextSmall>
              </Stat>
              <Stat size="s" value={whenDefined(validator.slashed, (slashed) => `${slashed} time${plural(slashed)}`)}>
                <TextSmall lighter>Slashed</TextSmall>
              </Stat>
              <Stat size="s" value={uptime}>
                <TextSmall lighter>Uptime</TextSmall>
              </Stat>
            </ModalStatistics>
          </RowGapBlock>
          {validator.rewardPointsHistory && (
            <RowGapBlock gap={4}>
              <h6>Era points</h6>
              <RewardPointsChartWrapper>
                <div>
                  <RewardPointsChart rewardPointsHistory={validator.rewardPointsHistory} />
                </div>
              </RewardPointsChartWrapper>
            </RowGapBlock>
          )}
          <RowGapBlock gap={4}>
            <h6>About</h6>
            <MarkdownPreview markdown={validator.membership?.about ?? ''} />
          </RowGapBlock>
          <SidePaneRow>
            <SidePaneLabel text="Email" />
            <SidePaneText>
              {validator.membership?.externalResources?.find(({ source }) => source === 'EMAIL')?.value ?? '-'}
            </SidePaneText>
          </SidePaneRow>
          <SidePaneRow>
            <SidePaneLabel text="Website" />
            <SidePaneText>
              {validator.membership?.externalResources?.find(({ source }) => source === 'HYPERLINK')?.value ?? '-'}
            </SidePaneText>
          </SidePaneRow>
          <SidePaneRow>
            <SidePaneLabel text="State" />
            <SidePaneText>{validator.isActive ? 'Active' : 'Waiting'}</SidePaneText>
          </SidePaneRow>
        </Details>
      </SidePaneBody>
      <ModalFooter>
        <ActionButtonsContainer>
          {isNominated ? (
            <div>
              <TextSmall lighter>Nominated</TextSmall>
              {nominatedStake && !nominatedStake.isZero() && <TokenValue size="xs" value={nominatedStake} />}
            </div>
          ) : isValidatorSelected ? (
            <ButtonPrimary
              size="small"
              onClick={() => handleActionClick('Select')}
              disabled={true}
              title="This validator is already selected for nomination."
            >
              Selected
            </ButtonPrimary>
          ) : (
            <ButtonPrimary
              size="small"
              onClick={() => handleActionClick('Select')}
              disabled={!canSelect}
              title={canSelect ? 'Select this validator for nomination' : 'Maximum number of validators selected'}
            >
              {canSelect ? 'Select' : 'Max Reached'}
            </ButtonPrimary>
          )}
        </ActionButtonsContainer>
      </ModalFooter>
    </>
  )
}

const Details = styled(RowGapBlock)`
  padding: 24px;
`

const ModalStatistics = styled(StatisticsThreeColumns)`
  grid-gap: 10px;

  @media (max-width: 767px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 424px) {
    grid-template-columns: 1fr;
  }
`

const Stat = styled(NumericValueStat)`
  padding: 20px 12px 20px 16px;
`

const RewardPointsChartWrapper = styled.div`
  width: 100%;
  overflow: auto;

  > div {
    min-width: 500px;
    height: 200px;
  }
`

const ActionButtonsContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  position: relative;
`
