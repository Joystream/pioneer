import React, { useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { PageHeader } from '@/app/components/PageHeader'
import { nameMapping } from '@/common/helpers'
import { CreateOpeningButton } from '@/working-groups/components/CreateOpeningButton'
import { useMyWorkers } from '@/working-groups/hooks/useMyWorkers'
import { useWorkingGroup } from '@/working-groups/hooks/useWorkingGroup'
import { urlParamToWorkingGroupId } from '@/working-groups/model/workingGroupName'

import { StatusBadge, StatusGroup } from '../../components/StatusBadges'

import { WorkingGroupTabs } from './WorkingGroupTabs'

interface WorkingGroupPageHeaderProps {
  withButtons?: boolean
}

export const WorkingGroupPageHeader = React.memo(({ withButtons = false }: WorkingGroupPageHeaderProps) => {
  const { name } = useParams<{ name: string }>()
  const { group } = useWorkingGroup({ name: urlParamToWorkingGroupId(name) })
  const { workers } = useMyWorkers()
  const isLead = useMemo(
    () => group?.isActive && workers.find((w) => w.membership.id === group?.leadId),
    [workers, group?.isActive, group?.leadId]
  )

  return (
    <PageHeader
      title={nameMapping(group?.name ?? name)}
      canGoBack
      status={
        group?.status && (
          <StatusGroup>
            <StatusBadge>{group?.status}</StatusBadge>
          </StatusGroup>
        )
      }
      buttons={withButtons && group && isLead && <CreateOpeningButton group={group.id} />}
      tabs={<WorkingGroupTabs />}
    />
  )
})
