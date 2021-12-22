import React from 'react'
import { generatePath, useHistory } from 'react-router'

import { ArrowRightIcon } from '@/common/components/icons'
import { StatisticButton } from '@/common/components/statistics/StatisticButton'
import { TextInlineBig } from '@/common/components/typography'
import { WorkingGroupsRoutes } from '@/working-groups/constants'

interface Props {
  label: string
  value: string
}

export const OpeningLink = ({ label, value }: Props) => {
  const history = useHistory()
  return (
    <StatisticButton
      onClick={() => history.push(generatePath(WorkingGroupsRoutes.openingById, { id: value }))}
      title={label}
      icon={<ArrowRightIcon />}
    >
      <TextInlineBig bold value>
        View the opening
      </TextInlineBig>
    </StatisticButton>
  )
}
