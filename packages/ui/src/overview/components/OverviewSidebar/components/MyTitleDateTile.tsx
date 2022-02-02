import React, { useMemo } from 'react'
import styled from 'styled-components'

import { formatDuration } from '@/common/components/statistics'
import { TextBig, TextInlineMedium, TextMedium } from '@/common/components/typography'
import { DurationValue } from '@/common/components/typography/DurationValue'
import { A_DAY, A_MINUTE, A_WEEK, AN_HOUR, Colors, Shadows } from '@/common/constants'
import { splitDuration } from '@/common/model/formatters'
import { useElectionRemainingPeriod } from '@/council/hooks/useElectionRemainingPeriod'
import { useElectionStage } from '@/council/hooks/useElectionStage'

const format = splitDuration([
  [A_WEEK, 'w'],
  [A_DAY, 'd'],
  [AN_HOUR, 'h'],
  [A_MINUTE, 'min'],
])

interface Props {
  title: string
  type: 'election' | 'application'
  duration?: string
}

export const MyTitleDateTile = ({ title, type, duration }: Props) => {
  const { stage: electionStage } = useElectionStage()
  const remainingPeriod = useElectionRemainingPeriod(electionStage)

  const time = useMemo(() => {
    if (type === 'election') {
      return formatDuration(remainingPeriod?.toNumber() || 0)
    }

    if (duration) {
      return format(Date.parse(duration) - Date.now())
    }

    return [['Unknown', '']] as [string, string][]
  }, [type, electionStage, remainingPeriod])

  return (
    <Tile>
      <TextBig value bold>
        {title}
      </TextBig>
      <TimeBox>
        <TextInlineMedium>Period length</TextInlineMedium>
        <DurationValue value={time} />
      </TimeBox>
    </Tile>
  )
}

const Tile = styled.div`
  min-width: 216px;
  width: fit-content;
  padding: 20px;
  height: 114px;
  box-shadow: ${Shadows.light};
  border-radius: 4px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 10px;
`

const TimeBox = styled(TextMedium)`
  color: ${Colors.Black[400]};

  > *:first-child {
    padding-right: 5px;
  }

  > * {
    font-size: 12px;
  }

  > div {
    font-size: 14px;
    color: ${Colors.Black[400]};
  }
`
