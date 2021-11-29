import React from 'react'
import { generatePath, useHistory } from 'react-router'

import { StatisticButton } from '@/common/components/statistics/StatisticButton'
import { TextInlineBig } from '@/common/components/typography'
import { ProposalsRoutes } from '@/proposals/constants/routes'

interface Props {
  label: string
  value: {
    id: string
    title: string
  }
}

export const Proposal = ({ label, value }: Props) => {
  const history = useHistory()
  return (
    <StatisticButton
      onClick={() => history.push(generatePath(ProposalsRoutes.preview, { id: value.id }))}
      title={label}
    >
      <TextInlineBig bold value>
        {value.title}
      </TextInlineBig>
    </StatisticButton>
  )
}
