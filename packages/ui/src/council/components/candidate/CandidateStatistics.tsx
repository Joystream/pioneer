import React from 'react'
import styled from 'styled-components'

import { NumericValueStat, StatisticsThreeColumns } from '@/common/components/statistics'
import { TextSmall } from '@/common/components/typography'
import { useMemberCandidacyStats } from '@/memberships/hooks/useMemberCandidacyStats'

interface Props {
  memberId?: string
}

export const CandidateStatistics = ({ memberId }: Props) => {
  const stats = useMemberCandidacyStats(memberId)
  return (
    <ModalStatistics>
      <Stat size="s" value={stats.successful}>
        <TextSmall lighter>Successful</TextSmall>
      </Stat>
      <Stat size="s" value={stats.withdrawn}>
        <TextSmall lighter>Withdrawn</TextSmall>
      </Stat>
      <Stat size="s" value={stats.failed}>
        <TextSmall lighter>Failed</TextSmall>
      </Stat>
    </ModalStatistics>
  )
}

const ModalStatistics = styled(StatisticsThreeColumns)`
  grid-gap: 10px;
`

const Stat = styled(NumericValueStat)`
  padding: 20px 12px 20px 16px;
`
