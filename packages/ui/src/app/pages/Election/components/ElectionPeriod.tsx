import React from 'react'
import styled from 'styled-components'

import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextInlineMedium } from '@/common/components/typography'
import { A_DAY, A_MINUTE, A_WEEK, Fonts, BorderRad, Colors } from '@/common/constants'
import { MILLISECONDS_PER_BLOCK, splitDuration } from '@/common/model/formatters'
import { useCouncilConstants } from '@/council/hooks/useCouncilConstants'

const formatDays = splitDuration([[A_DAY / MILLISECONDS_PER_BLOCK, ' days']])

const formatWeeks = splitDuration([
  [A_WEEK / MILLISECONDS_PER_BLOCK, 'weeks'],
  [A_DAY / MILLISECONDS_PER_BLOCK, 'days'],
])

export const formatDuration = (duration: number): [string | number, string][] => {
  if (duration < A_MINUTE / MILLISECONDS_PER_BLOCK) {
    return [['< 1', 'min']]
  }
  return formatDays(duration)
}

export const formatTotalDuration = (duration: number): string => {
  if (duration < A_MINUTE / MILLISECONDS_PER_BLOCK) {
    return '< 1 min'
  }
  return (
    formatDays(duration)
      .map((o) => o.join(''))
      .join('') +
    ' = ' +
    formatWeeks(duration)
      .map((o) => o.join(' '))
      .join(' ')
  )
}

export const ElectionPeriod = () => {
  const constants = useCouncilConstants()

  return (
    <PeriodContainer>
      {constants && (
        <>
          <PeriodHeader>
            <h6>Announcing Period</h6>
            <div>
              <TextInlineMedium lighter>{formatDuration(constants.announcingPeriod)}</TextInlineMedium>
            </div>
          </PeriodHeader>
          <PeriodHeader>
            <h6>Voting Period</h6>
            <div>
              <TextInlineMedium lighter>{formatDuration(constants.election.votingPeriod)}</TextInlineMedium>
            </div>
          </PeriodHeader>
          <PeriodHeader>
            <h6>Reveal Period</h6>
            <div>
              <TextInlineMedium lighter>{formatDuration(constants.election.revealingPeriod)}</TextInlineMedium>
            </div>
          </PeriodHeader>
          <PeriodHeader>
            <h6>Idle Period</h6>
            <div>
              <TextInlineMedium lighter>{formatDuration(constants.idlePeriod)}</TextInlineMedium>
            </div>
          </PeriodHeader>
          <PeriodHeader>
            <h6>Total</h6>
            <div>
              <TextInlineMedium lighter>
                {formatTotalDuration(
                  constants.idlePeriod +
                    constants.election.revealingPeriod +
                    constants.election.votingPeriod +
                    constants.announcingPeriod
                )}
              </TextInlineMedium>
            </div>
          </PeriodHeader>
        </>
      )}
    </PeriodContainer>
  )
}

export const PeriodContainer = styled(RowGapBlock).attrs({ gap: 0 })`
  margin-top: 8px;
  border-radius: ${BorderRad.s};
  display: grid;
  grid-template-columns: auto auto;
`
const PeriodHeader = styled.label`
  display: grid;
  align-items: center;
  grid-template-columns: 160px 1fr auto;
  cursor: pointer;
  padding: 4px 4px 4px 8px;
  text-transform: capitalize;

  h6 {
    color: Colors.Black[900];
  }
`
