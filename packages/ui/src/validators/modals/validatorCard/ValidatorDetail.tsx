import React from 'react'
import styled from 'styled-components'

import { ButtonPrimary } from '@/common/components/buttons'
import { MarkdownPreview } from '@/common/components/MarkdownPreview'
import { ModalFooter } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { SidePaneBody, SidePaneLabel, SidePaneRow, SidePaneText } from '@/common/components/SidePane'
import { NumericValueStat, StatisticsThreeColumns } from '@/common/components/statistics'
import { TextSmall } from '@/common/components/typography'
import LineChart from '@/validators/components/LineChart'

import { Validator } from '../../types'

interface Props {
  validator: Validator
}

export const ValidatorDetail = ({ validator }: Props) => {
  return (
    <>
      <SidePaneBody>
        <Details gap={24}>
          <RowGapBlock gap={4}>
            <h6>Key elements</h6>
            <ModalStatistics>
              <Stat size="s" value={20000}>
                <TextSmall lighter>Total reward</TextSmall>
              </Stat>
              <Stat size="s" value={validator.isVerified ? 'Verified' : 'Unverified'}>
                <TextSmall lighter>Status</TextSmall>
              </Stat>
              <Stat size="s" value={validator.slashed.toString()}>
                <TextSmall lighter>Slashed</TextSmall>
              </Stat>
              <Stat size="s" value={0}>
                <TextSmall lighter>Uptime</TextSmall>
              </Stat>
              <Stat size="s" value={validator.APR.toString()}>
                <TextSmall lighter>Average APR</TextSmall>
              </Stat>
              <Stat size="s" value={validator.staking.others.length}>
                <TextSmall lighter>Nominators</TextSmall>
              </Stat>
            </ModalStatistics>
          </RowGapBlock>
          <RewardPointsChartWrapper>
            <LineChart />
          </RewardPointsChartWrapper>

          <RowGapBlock gap={4}>
            <h6>About</h6>
            <MarkdownPreview
              markdown={
                'I am part of the team building the Joystream network. Feel free to follow me on twitter, or contact me on telegram! @jen29291 on both.'
              }
            />
          </RowGapBlock>
          <SidePaneRow>
            <SidePaneLabel text="Email" />
            <SidePaneText>Alice1@joystream.com</SidePaneText>
          </SidePaneRow>
          <SidePaneRow>
            <SidePaneLabel text="Website" />
            <SidePaneText>Alice1joystream.com</SidePaneText>
          </SidePaneRow>
          <SidePaneRow>
            <SidePaneLabel text="State" />
            <SidePaneText>{validator.isActive ? 'Active' : 'Waiting'}</SidePaneText>
          </SidePaneRow>
        </Details>
      </SidePaneBody>
      <ModalFooter>
        <ButtonPrimary size="small" onClick={() => alert('You select this validator to nominate')}>
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
