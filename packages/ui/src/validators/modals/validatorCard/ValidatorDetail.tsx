import React from 'react'
import styled from 'styled-components'

import { ButtonPrimary, ButtonSecondary, ButtonGhost } from '@/common/components/buttons'
import { MarkdownPreview } from '@/common/components/MarkdownPreview'
import { ModalFooter } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { SidePaneBody, SidePaneLabel, SidePaneRow, SidePaneText } from '@/common/components/SidePane'
import { NumericValueStat, StatisticsThreeColumns, TokenValueStat } from '@/common/components/statistics'
import { TextSmall } from '@/common/components/typography'
import { BN_ZERO } from '@/common/constants'
import { plural } from '@/common/helpers'
import { useModal } from '@/common/hooks/useModal'
import { whenDefined } from '@/common/utils'
import RewardPointsChart from '@/validators/components/RewardPointChart'

import { ValidatorWithDetails } from '../../types'
import { BondModalCall } from '../BondModal'
import { NominateValidatorModalCall } from '../NominateValidatorModal'
import { NominatingRedirectModalCall } from '../NominatingRedirectModal'
import { PayoutModalCall } from '../PayoutModal'
import { StakeModalCall } from '../StakeModal'
import { UnbondModalCall } from '../UnbondModal'

interface Props {
  validator: ValidatorWithDetails
  eraIndex: number | undefined
  hideModal: () => void
}

export const ValidatorDetail = ({ validator, eraIndex, hideModal }: Props) => {
  const { showModal } = useModal<NominatingRedirectModalCall>()
  const { showModal: showNominateModal } = useModal<NominateValidatorModalCall>()
  const { showModal: showStakeModal } = useModal<StakeModalCall>()
  const { showModal: showBondModal } = useModal<BondModalCall>()
  const { showModal: showUnbondModal } = useModal<UnbondModalCall>()
  const { showModal: showPayoutModal } = useModal<PayoutModalCall>()

  const uptime = whenDefined(validator.rewardPointsHistory, (rewardPointsHistory) => {
    const firstEra = rewardPointsHistory.at(0)?.era
    if (!eraIndex || !firstEra) return
    const totalEras = eraIndex - firstEra
    const validatedEra = rewardPointsHistory.filter(({ rewardPoints }) => rewardPoints > 0).length
    return `${((validatedEra / totalEras) * 100).toFixed(1)}%`
  })

  const handleActionClick = (action: string) => {
    const validatorAddress = validator.stashAccount
    
    switch (action) {
      case 'Nominate':
        hideModal()
        showNominateModal({ modal: 'NominateValidator', data: { validatorAddress } })
        break
      case 'Stake':
        hideModal()
        showStakeModal({ modal: 'Stake', data: { validatorAddress } })
        break
      case 'Bond':
        hideModal()
        showBondModal({ modal: 'Bond', data: { validatorAddress } })
        break
      case 'Unbond':
        hideModal()
        showUnbondModal({ modal: 'Unbond', data: { validatorAddress } })
        break
      case 'Payout':
        hideModal()
        showPayoutModal({ modal: 'Payout', data: { validatorAddress } })
        break
      default:
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
          <ButtonPrimary
            size="small"
            onClick={() => handleActionClick('Nominate')}
          >
            Nominate
          </ButtonPrimary>
          <ButtonSecondary
            size="small"
            onClick={() => handleActionClick('Stake')}
          >
            Stake
          </ButtonSecondary>
          <ButtonGhost
            size="small"
            onClick={() => handleActionClick('Bond')}
          >
            Bond
          </ButtonGhost>
          <ButtonGhost
            size="small"
            onClick={() => handleActionClick('Unbond')}
          >
            Unbond
          </ButtonGhost>
          <ButtonGhost
            size="small"
            onClick={() => handleActionClick('Payout')}
          >
            Payout
          </ButtonGhost>
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
`
