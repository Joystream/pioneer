import React from 'react'

import { PageHeader } from '@/app/components/PageHeader'
import { nameMapping } from '@/common/helpers'
import { CreateOpeningButton } from '@/working-groups/components/CreateOpeningButton'
import { WorkingGroup } from '@/working-groups/types'

import { StatusBadge, StatusGroup } from '../../components/StatusBadges'

import { WorkingGroupTabs } from './WorkingGroupTabs'

interface WorkingGroupPageHeaderProps {
  name: string
  group: WorkingGroup | undefined
  withButtons?: boolean
}

export const WorkingGroupPageHeader = React.memo(({ name, group, withButtons }: WorkingGroupPageHeaderProps) => {
  return (
    <PageHeader
      title={nameMapping(name)}
      canGoBack
      status={
        group?.status && (
          <StatusGroup>
            <StatusBadge>{group?.status}</StatusBadge>
          </StatusGroup>
        )
      }
      buttons={withButtons && <CreateOpeningButton name={name} group={group} />}
      tabs={<WorkingGroupTabs />}
    />
  )
})
