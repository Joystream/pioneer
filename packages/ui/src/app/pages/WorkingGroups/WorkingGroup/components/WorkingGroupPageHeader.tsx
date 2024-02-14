import React, { useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { PageHeader } from '@/app/components/PageHeader'
import { nameMapping } from '@/common/helpers'
import { CreateOpeningButton } from '@/working-groups/components/CreateOpeningButton'
import { useMyWorkers } from '@/working-groups/hooks/useMyWorkers'
import { WorkingGroup } from '@/working-groups/types'

import { StatusBadge, StatusGroup } from '../../components/StatusBadges'

import { WorkingGroupTabs } from './WorkingGroupTabs'

interface WorkingGroupPageHeaderProps {
  group: WorkingGroup | undefined
  withButtons?: boolean
}

export const WorkingGroupPageHeader = React.memo(({ group, withButtons = false }: WorkingGroupPageHeaderProps) => {
  const { name } = useParams<{ name: string }>()
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
