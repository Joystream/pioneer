import React from 'react'

import { PageHeaderWithHint } from '@/app/components/PageHeaderWithHint'
import { PageLayout } from '@/app/components/PageLayout'
import { WorkingGroupsList } from '@/working-groups/components/WorkingGroupsList'
import { useWorkingGroups } from '@/working-groups/hooks/useWorkingGroups'
import { WorkingGroup } from '@/working-groups/types'

import { WorkingGroupsTabs } from './components/WorkingGroupsTabs'

export const WorkingGroups = () => {
  const { groups } = useWorkingGroups()

  return (
    <PageLayout
      header={<PageHeaderWithHint title="Working Groups" hintType="workingGroups" tabs={<WorkingGroupsTabs />} />}
      main={<WorkingGroupsList groups={groups.length ? groups : defaultGroups} />}
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
    id: 'gatewayWorkingGroup',
    name: 'Gateways',
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
