import React from 'react'
import { generatePath, useHistory } from 'react-router'
import styled from 'styled-components'

import { ArrowRightIcon } from '@/common/components/icons'
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

export const ProposalLink = ({ label, value }: Props) => {
  const history = useHistory()
  return (
    <StatisticButton
      onClick={() => history.push(generatePath(ProposalsRoutes.preview, { id: value.id }))}
      title={label}
      icon={<ArrowRightIcon />}
    >
      <LeftAlignedItem>
        <TextInlineBig bold value>
          {value.title}
        </TextInlineBig>
      </LeftAlignedItem>
    </StatisticButton>
  )
}

const LeftAlignedItem = styled.div`
  align-items: left;
  text-align: left;
  width: 100%;
`
