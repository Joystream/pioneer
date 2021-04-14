import React from 'react'

import { ContentWithSidepanel, MainPanel, SidePanel } from '../../../../common/components/page/PageContent'
import { Statistics, TokenValueStat } from '../../../../common/components/statistics'
import { Label } from '../../../../common/components/typography'
import { OpeningsList } from '../../../../working-groups/components/OpeningsList'
import { useOpenings } from '../../../../working-groups/hooks/useOpenings'
import { WorkingGroup } from '../../../../working-groups/types'
import { OpeningsCategories, OpeningsCategory } from '../WorkingGroup'

interface Props {
  workingGroup?: WorkingGroup
}

export function OpeningsTab({ workingGroup }: Props) {
  const { isLoading, openings } = useOpenings({
    groupId: workingGroup?.id,
  })

  return (
    <ContentWithSidepanel>
      <MainPanel>
        <Statistics>
          <TokenValueStat title="Current budget" helperText="Lorem ipsum..." value={150_200} />
          <TokenValueStat title="Working Group dept" helperText="Lorem ipsum..." value={-200} />
          <TokenValueStat title="Avg stake" helperText="Lorem ipsum..." value={100_000} />
        </Statistics>
        {isLoading ? (
          'loading'
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
        <Label>Leader</Label>
        <Label>Workers</Label>
      </SidePanel>
    </ContentWithSidepanel>
  )
}
