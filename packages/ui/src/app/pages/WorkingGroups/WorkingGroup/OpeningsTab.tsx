import React from 'react'
import styled from 'styled-components'

import { CountBadge } from '@/common/components/CountBadge'
import { useUpcomingOpenings } from '@/working-groups/hooks/useUpcomingOpenings'

import { Loading } from '../../../../common/components/Loading'
import { ContentWithSidepanel, MainPanel, SidePanel } from '../../../../common/components/page/PageContent'
import { Statistics, TokenValueStat } from '../../../../common/components/statistics'
import { Label } from '../../../../common/components/typography'
import { useMember } from '../../../../memberships/hooks/useMembership'
import { OpeningsList } from '../../../../working-groups/components/OpeningsList'
import { WorkersList } from '../../../../working-groups/components/WorkersList'
import { useOpenings } from '../../../../working-groups/hooks/useOpenings'
import { useWorkers } from '../../../../working-groups/hooks/useWorkers'
import { WorkingGroup } from '../../../../working-groups/types'

interface Props {
  workingGroup: WorkingGroup
}

export const OpeningsTab = ({ workingGroup }: Props) => {
  const { isLoading, openings } = useOpenings({ groupId: workingGroup.id, type: 'open' })
  const { isLoading: isLoadingUpcoming, upcomingOpenings } = useUpcomingOpenings({ groupId: workingGroup.id })
  const { member: leader } = useMember(workingGroup.leaderId)
  const { workers } = useWorkers({ groupId: workingGroup.id ?? '' })

  return (
    <ContentWithSidepanel>
      <MainPanel>
        <Statistics>
          <TokenValueStat title="Current budget" helperText="Lorem ipsum..." value={workingGroup.budget} />
          <TokenValueStat title="Working Group dept" helperText="Lorem ipsum..." value={-200} />
          <TokenValueStat title="Avg stake" helperText="Lorem ipsum..." value={100_000} />
        </Statistics>
        {isLoading ? (
          <Loading />
        ) : (
          <OpeningsCategories>
            <OpeningsCategory>
              <Label>Openings</Label>
              <OpeningsList openings={openings} />
            </OpeningsCategory>
          </OpeningsCategories>
        )}
        {isLoadingUpcoming ? (
          <Loading />
        ) : (
          <OpeningsCategories>
            <OpeningsCategory>
              <Label>
                Upcoming Openings <CountBadge count={upcomingOpenings.length} />
              </Label>
            </OpeningsCategory>
          </OpeningsCategories>
        )}
      </MainPanel>
      <SidePanel>
        <WorkersList leader={leader} workers={workers} />
      </SidePanel>
    </ContentWithSidepanel>
  )
}

const OpeningsCategories = styled.div`
  display: grid;
  grid-row-gap: 24px;
  width: 100%;
`

const OpeningsCategory = styled.div`
  display: grid;
  grid-row-gap: 16px;
  width: 100%;
`
