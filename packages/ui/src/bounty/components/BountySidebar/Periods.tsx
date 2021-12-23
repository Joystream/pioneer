import BN from 'bn.js'
import React, { ReactNode, memo, useMemo } from 'react'
import styled from 'styled-components'

import { BountyPeriod } from '@/bounty/types/Bounty'
import { formatDuration } from '@/common/components/statistics'
import { Stepper } from '@/common/components/Stepper'
import { TextSmall } from '@/common/components/typography'
import { DurationValue } from '@/common/components/typography/DurationValue'
import { Colors } from '@/common/constants'

interface PeriodStep {
  title: 'Funding Period' | 'Working Period' | 'Judgement Period'
  details: ReactNode
  type: 'past' | 'active' | 'hideNumber'
}

export interface PeriodsProps {
  stage: BountyPeriod
  fundingPeriodLength?: BN
  workPeriodLength: BN
  judgingPeriodLength: BN
}

const formatPeriodLength = (value?: BN) => {
  if (!value) {
    return <LengthText>Perpetual</LengthText>
  }
  return (
    <LengthText>
      Length: <DurationValue value={formatDuration(value.toNumber())} tiny />
    </LengthText>
  )
}

export const Periods = memo(({ stage, fundingPeriodLength, workPeriodLength, judgingPeriodLength }: PeriodsProps) => {
  const steps: PeriodStep[] = useMemo(
    () => [
      {
        title: 'Funding Period',
        details: formatPeriodLength(fundingPeriodLength),
        type: stage === 'funding' ? 'active' : 'past',
      },
      {
        title: 'Working Period',
        details: formatPeriodLength(workPeriodLength),
        type: stage === 'working' ? 'active' : stage === 'funding' ? 'hideNumber' : 'past',
      },
      {
        title: 'Judgement Period',
        details: formatPeriodLength(judgingPeriodLength),
        type: stage === 'judgement' ? 'active' : 'hideNumber',
      },
    ],
    []
  )
  return (
    <>
      <TitleText bold>PERIODS</TitleText>
      <Stepper steps={steps} theme="light" />
    </>
  )
})

const TitleText = styled(TextSmall)`
  margin-bottom: 16px;
  color: ${Colors.Black[400]};
`

const LengthText = styled(TextSmall)`
  color: ${Colors.Black[400]};
`
