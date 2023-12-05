import React from 'react'
import styled from 'styled-components'

import { ButtonPrimary } from '@/common/components/buttons'
import { MarkdownPreview } from '@/common/components/MarkdownPreview'
import { ModalFooter } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { SidePaneBody, SidePaneLabel, SidePaneRow, SidePaneText } from '@/common/components/SidePane'
import { NumericValueStat, StatisticsThreeColumns } from '@/common/components/statistics'
import { TextSmall } from '@/common/components/typography'
import { plural } from '@/common/helpers'

import { ValidatorWithDetails } from '../../types'

interface Props {
  validator: ValidatorWithDetails
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
              <Stat size="s" value={`${validator.slashed} time${plural(validator.slashed)}`}>
                <TextSmall lighter>Slashed</TextSmall>
              </Stat>
              <Stat size="s" value={0}>
                <TextSmall lighter>Uptime</TextSmall>
              </Stat>
              <Stat size="s" value={validator.APR.toString() + '%'}>
                <TextSmall lighter>Average APR</TextSmall>
              </Stat>
              <Stat size="s" value={validator.staking.others.length}>
                <TextSmall lighter>Nominators</TextSmall>
              </Stat>
            </ModalStatistics>
          </RowGapBlock>
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
