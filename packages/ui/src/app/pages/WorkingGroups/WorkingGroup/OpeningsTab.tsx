import React from 'react'
import styled from 'styled-components'

import { CountBadge } from '@/common/components/CountBadge'
import { ContentWithSidepanel, MainPanel } from '@/common/components/page/PageContent'
import { SidePanel } from '@/common/components/page/SidePanel'
import { Statistics, TokenValueStat } from '@/common/components/statistics'
import { Label } from '@/common/components/typography'
import { LoadingOpenings } from '@/working-groups/components/OpeningsList'
import { WorkersList } from '@/working-groups/components/WorkersList'
import { useGroupDebt } from '@/working-groups/hooks/useGroupDebt'
import { useOpenings } from '@/working-groups/hooks/useOpenings'
import { useUpcomingOpenings } from '@/working-groups/hooks/useUpcomingOpenings'
import { useWorkers } from '@/working-groups/hooks/useWorkers'
import { WorkingGroup } from '@/working-groups/types'

interface Props {
  workingGroup: WorkingGroup
}

export const OpeningsTab = ({ workingGroup }: Props) => {
  const { isLoading: isLoadingUpcoming, upcomingOpenings } = useUpcomingOpenings({ groupId: workingGroup.id })
  const { isLoading: isLoadingCurrent, openings } = useOpenings({ groupId: workingGroup.id, type: 'open' })
  const { workers } = useWorkers({ groupId: workingGroup.id ?? '', status: 'active' })
  const { debt } = useGroupDebt(workingGroup.id)

  const lead = workers?.find((worker) => worker.member.id === workingGroup.leadId)

  return (
    <ContentWithSidepanel>
      <MainPanel>
        <Statistics>
          <TokenValueStat title="Current budget" tooltipText="Lorem ipsum..." value={workingGroup.budget} />
          <TokenValueStat title="Working Group dept" tooltipText="Lorem ipsum..." value={debt} />
          <TokenValueStat title="Avg stake" tooltipText="Lorem ipsum..." value={workingGroup.averageStake} />
        </Statistics>

        <OpeningsCategories>
          <OpeningsCategory>
            <Label>
              Upcoming Openings <CountBadge count={upcomingOpenings.length} />
            </Label>
            <LoadingOpenings isLoading={isLoadingUpcoming} openings={upcomingOpenings} />
          </OpeningsCategory>
        </OpeningsCategories>

        <OpeningsCategories>
          <OpeningsCategory>
            <Label>Openings</Label>
            <LoadingOpenings isLoading={isLoadingCurrent} openings={openings} />
          </OpeningsCategory>
        </OpeningsCategories>
      </MainPanel>
      <SidePanel>
        <WorkersList lead={lead} workers={workers} />
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
