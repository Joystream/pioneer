import React from 'react'
import styled from 'styled-components'

import { ButtonPrimary } from '@/common/components/buttons'
import { MarkdownPreview } from '@/common/components/MarkdownPreview'
import { ModalFooter } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { SidePaneBody, SidePaneLabel, SidePaneRow, SidePaneText } from '@/common/components/SidePane'
import { NumericValueStat, StatisticsThreeColumns, TokenValueStat } from '@/common/components/statistics'
import { TextSmall } from '@/common/components/typography'
import { BN_ZERO, ERA_DEPTH } from '@/common/constants'
import { plural } from '@/common/helpers'
import { useModal } from '@/common/hooks/useModal'
import { whenDefined } from '@/common/utils'
import RewardPointsChart from '@/validators/components/RewardPointChart'

import { ValidatorWithDetails } from '../../types'
import { NominatingRedirectModalCall } from '../NominatingRedirectModal'

interface Props {
  validator: ValidatorWithDetails
  hideModal: () => void
}

export const ValidatorDetail = ({ validator, hideModal }: Props) => {
  const { showModal } = useModal<NominatingRedirectModalCall>()

  const uptime = whenDefined(
    validator.rewardPointsHistory,
    (rewardPointsHistory) =>
      `${((rewardPointsHistory.filter(({ rewardPoints }) => rewardPoints).length / (ERA_DEPTH + 1)) * 100).toFixed(3)}%`
  )

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
                <RewardPointsChart rewardPointsHistory={validator.rewardPointsHistory} />
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
        <ButtonPrimary
          size="small"
          onClick={() => {
            hideModal()
            showModal({ modal: 'NominatingRedirect' })
          }}
        >
          Nominate
        </ButtonPrimary>
      </ModalFooter>
    </>
  )
}

const Details = styled(RowGapBlock)`
  padding: 24px;
`

const ModalStatistics = styled(StatisticsThreeColumns)`
  grid-gap: 10px;
`

const Stat = styled(NumericValueStat)`
  padding: 20px 12px 20px 16px;
`

const RewardPointsChartWrapper = styled.div`
  width: 100%;
  height: 200px;
`
