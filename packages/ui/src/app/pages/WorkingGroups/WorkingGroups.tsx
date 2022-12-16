import { concat, partition } from 'lodash'
import React, { useMemo } from 'react'

import { PageHeaderWithHint } from '@/app/components/PageHeaderWithHint'
import { PageLayout } from '@/app/components/PageLayout'
import { WorkingGroupsList } from '@/working-groups/components/WorkingGroupsList'
import { useWorkingGroups } from '@/working-groups/hooks/useWorkingGroups'
import { WorkingGroup } from '@/working-groups/types'

import { WorkingGroupsTabs } from './components/WorkingGroupsTabs'

export const WorkingGroups = () => {
  const { groups } = useWorkingGroups()

  const sortedGroups = useMemo(
    () =>
      !groups.length
        ? defaultGroups
        : concat(
            ...defaultGroups.reduce(
              ([sorted, remaining], { id }) => {
                const [current, others] = partition(remaining, { id })
                return [[...sorted, ...current], others]
              },
              [[], groups]
            )
          ),
    [groups.length]
  )

  return (
    <PageLayout
      header={<PageHeaderWithHint title="Working Groups" hintType="workingGroups" tabs={<WorkingGroupsTabs />} />}
      main={<WorkingGroupsList groups={sortedGroups} />}
    />
  )
}

const defaultGroups: WorkingGroup[] = [
  {
    id: 'storageWorkingGroup',
    name: 'Storage',
  },
  {
    id: 'membershipWorkingGroup',
    name: 'Membership',
  },
  {
    id: 'contentWorkingGroup',
    name: 'Content',
  },
  {
    id: 'forumWorkingGroup',
    name: 'Forum',
  },
  {
    id: 'operationsWorkingGroupAlpha',
    name: 'Operations Alpha',
  },
  {
    id: 'appWorkingGroup',
    name: 'App',
  },
  {
    id: 'distributionWorkingGroup',
    name: 'Distribution',
  },
  {
    id: 'operationsWorkingGroupBeta',
    name: 'Operations Beta',
  },
  {
    id: 'operationsWorkingGroupGamma',
    name: 'Operations Gamma',
  },
]
