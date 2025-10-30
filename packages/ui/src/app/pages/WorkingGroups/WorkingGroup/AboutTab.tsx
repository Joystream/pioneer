import React, { useMemo } from 'react'

import { ExternalLinkButtonGhost } from '@/common/components/buttons/LinkButtons'
import { LinkSymbol } from '@/common/components/icons/symbols'
import { Loading } from '@/common/components/Loading'
import { MarkdownPreview } from '@/common/components/MarkdownPreview'
import { MainPanel, RowGapBlock } from '@/common/components/page/PageContent'
import { StatisticItem, Statistics, TokenValueStat } from '@/common/components/statistics'
import { NumericValueStat } from '@/common/components/statistics/NumericValueStat'
import { wgListItemMappings } from '@/common/helpers'
import { isDefined } from '@/common/utils'
import { useGroupStatistics } from '@/working-groups/hooks/useGroupStatistics'
import { WorkingGroup } from '@/working-groups/types'

import { StatusBadge, StatusGroup, StatusTitleGroup } from '../components/StatusBadges'

interface Props {
  workingGroup: WorkingGroup
}

export const AboutTab = ({ workingGroup }: Props) => {
  const { statistics } = useGroupStatistics(workingGroup.id)
  const { defaultDescription, handbookLink } = useMemo(() => wgListItemMappings(workingGroup.name), [workingGroup.name])

  return (
    <MainPanel>
      <Statistics>
        {statistics.spending ? (
          <TokenValueStat
            title="Spending"
            tooltipText="Total spending of the working group during the council term."
            value={statistics.spending}
          />
        ) : (
          <StatisticItem centered>
            <Loading />
          </StatisticItem>
        )}
        {isDefined(statistics.totalHired) ? (
          <NumericValueStat title="Total hired" value={statistics.totalHired} />
        ) : (
          <StatisticItem centered>
            <Loading />
          </StatisticItem>
        )}
        {isDefined(statistics.totalFired) ? (
          <NumericValueStat title="Total fired" value={statistics.totalFired} />
        ) : (
          <StatisticItem centered>
            <Loading />
          </StatisticItem>
        )}
      </Statistics>
      <RowGapBlock gap={32}>
        {workingGroup.description && (
          <RowGapBlock gap={16}>
            <h4>Welcome</h4>
            <MarkdownPreview markdown={workingGroup.description} />
          </RowGapBlock>
        )}
        {!!workingGroup.status && (
          <RowGapBlock gap={16}>
            <StatusTitleGroup>
              <h4>Status</h4>
              <StatusGroup>
                <StatusBadge>{workingGroup.status}</StatusBadge>
              </StatusGroup>
            </StatusTitleGroup>
            {workingGroup.statusMessage && <MarkdownPreview markdown={workingGroup.statusMessage} />}
          </RowGapBlock>
        )}
        <RowGapBlock gap={16}>
          <h4>About</h4>
          <MarkdownPreview markdown={workingGroup.about || defaultDescription} />
          {handbookLink && (
            <ExternalLinkButtonGhost size="small" href={handbookLink} disabled={false} target="_blank">
              Learn more from the Handbook
              <LinkSymbol />
            </ExternalLinkButtonGhost>
          )}
        </RowGapBlock>
      </RowGapBlock>
    </MainPanel>
  )
}
