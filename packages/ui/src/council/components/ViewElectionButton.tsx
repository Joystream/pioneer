import React from 'react'
import { useHistory } from 'react-router-dom'

import { ArrowRightIcon } from '@/common/components/icons'
import { StatisticButton } from '@/common/components/statistics/StatisticButton'
import { TextInlineMedium } from '@/common/components/typography'

import { ElectionRoutes } from '../constants'

export const ViewElectionButton = () => {
  const history = useHistory()
  return (
    <StatisticButton
      title="Status"
      onClick={() => history.push(ElectionRoutes.currentElection)}
      icon={<ArrowRightIcon />}
    >
      <TextInlineMedium bold>Election in progress</TextInlineMedium>
    </StatisticButton>
  )
}
