import React from 'react'

import { Loading } from '../../../../common/components/Loading'
import { ContentWithSidepanel, MainPanel, SidePanel } from '../../../../common/components/page/PageContent'
import { Statistics, TokenValueStat } from '../../../../common/components/statistics'
import { Label } from '../../../../common/components/typography'
import { useMember } from '../../../../memberships/hooks/useMembership'
import { OpeningsList } from '../../../../working-groups/components/OpeningsList'
import { WorkersList } from '../../../../working-groups/components/WorkersList'
import { useOpenings } from '../../../../working-groups/hooks/useOpenings'
import { WorkingGroup } from '../../../../working-groups/types'
import { useWorkers } from '../../../hooks/useWorkers'
import { OpeningsCategories, OpeningsCategory } from '../WorkingGroup'

interface Props {
  workingGroup?: WorkingGroup
}

export const OpeningsTab = ({ workingGroup }: Props) => {
  const { isLoading, openings } = useOpenings({
    groupId: workingGroup?.id,
  })
  const { member: leader } = useMember(workingGroup?.leaderId)
  const { workers } = useWorkers(workingGroup?.id ?? '')

  return (
    <ContentWithSidepanel>
      <MainPanel>
        <Statistics>
          <TokenValueStat title="Current budget" helperText="Lorem ipsum..." value={150_200} />
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
      </MainPanel>
      <SidePanel>
        <WorkersList leader={leader} workers={workers} />
      </SidePanel>
    </ContentWithSidepanel>
  )
}
