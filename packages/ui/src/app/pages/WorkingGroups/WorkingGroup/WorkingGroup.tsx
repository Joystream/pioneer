import React, { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

import { PageLayout, PageHeaderWrapper, PageHeaderRow } from '@/app/components/PageLayout'
import { ButtonsGroup } from '@/common/components/buttons'
import { Loading } from '@/common/components/Loading'
import { PageTitle } from '@/common/components/page/PageTitle'
import { PreviousPage } from '@/common/components/page/PreviousPage'
import { Tabs } from '@/common/components/Tabs'
import { nameMapping } from '@/common/helpers'
import { CreateOpeningButton } from '@/working-groups/components/CreateOpeningButton'
import { useMyWorkers } from '@/working-groups/hooks/useMyWorkers'
import { useWorkingGroup } from '@/working-groups/hooks/useWorkingGroup'
import { urlParamToWorkingGroupId } from '@/working-groups/model/workingGroupName'

import { StatusBadge, StatusGroup } from '../components/StatusBadges'

import { AboutTab, AboutTabSidebar } from './AboutTab'
import { HistoryTab, HistoryTabSidebar } from './HistoryTab'
import { OpeningsTab, OpeningsTabSidebar } from './OpeningsTab'

type Tab = 'OPENINGS' | 'ABOUT' | 'HISTORY'

export function WorkingGroup() {
  const [currentTab, setCurrentTab] = useState<Tab>('OPENINGS')
  const { name } = useParams<{ name: string }>()
  const { isLoading, group } = useWorkingGroup({ name: urlParamToWorkingGroupId(name) })
  const { workers } = useMyWorkers()
  const isLead = useMemo(
    () => group?.isActive && workers.find((w) => w.membership.id === group?.leadId),
    [workers, group?.isActive, group?.leadId]
  )

  const tabs = [
    { title: 'Openings', active: currentTab === 'OPENINGS', onClick: () => setCurrentTab('OPENINGS') },
    { title: 'About', active: currentTab === 'ABOUT', onClick: () => setCurrentTab('ABOUT') },
    { title: 'History', active: currentTab === 'HISTORY', onClick: () => setCurrentTab('HISTORY') },
  ]

  const displayTabsContent = () => {
    if (isLoading || !group) {
      return <Loading />
    }

    return (
      <>
        {currentTab === 'OPENINGS' && <OpeningsTab workingGroup={group} />}
        {currentTab === 'ABOUT' && <AboutTab workingGroup={group} />}
        {currentTab === 'HISTORY' && <HistoryTab workingGroup={group} />}
      </>
    )
  }

  const displayTabsSidebar = () => {
    if (!isLoading && group) {
      return (
        <>
          {currentTab === 'OPENINGS' && <OpeningsTabSidebar workingGroup={group} />}
          {currentTab === 'ABOUT' && <AboutTabSidebar workingGroup={group} />}
          {currentTab === 'HISTORY' && <HistoryTabSidebar workingGroup={group} />}
        </>
      )
    }
  }
  return (
    <PageLayout
      header={
        <PageHeaderWrapper>
          <PageHeaderRow>
            <PreviousPage>
              <PageTitle>{nameMapping(group?.name ?? name)}</PageTitle>
              {group?.status && (
                <StatusGroup>
                  <StatusBadge>{group?.status}</StatusBadge>
                </StatusGroup>
              )}
            </PreviousPage>
            {group && isLead && currentTab === 'OPENINGS' && (
              <ButtonsGroup>
                <CreateOpeningButton group={group.id} />
              </ButtonsGroup>
            )}
          </PageHeaderRow>

          <Tabs tabs={tabs} />
        </PageHeaderWrapper>
      }
      main={displayTabsContent()}
      sidebar={displayTabsSidebar()}
      sidebarScrollable
      lastBreadcrumb={nameMapping(group?.name ?? name)}
    />
  )
}
