import React, { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

import { ActivitiesBlock } from '@/common/components/Activities/ActivitiesBlock'
import { Loading } from '@/common/components/Loading'
import { ContentWithSidepanel, MainPanel } from '@/common/components/page/PageContent'
import { SidePanel } from '@/common/components/page/SidePanel'
import { Pagination } from '@/common/components/Pagination'
import { Tabs } from '@/common/components/Tabs'
import { useActivities } from '@/common/hooks/useActivities'
import { OpeningsList } from '@/working-groups/components/OpeningsList'
import { WorkersTableList } from '@/working-groups/components/WorkersTableList/WorkersTableList'
import { useOpenings } from '@/working-groups/hooks/useOpenings'
import { useWorkersPagination } from '@/working-groups/hooks/useWorkersPagination'
import { useWorkingGroup } from '@/working-groups/hooks/useWorkingGroup'

type Tab = 'OPENINGS' | 'WORKERS'

export function HistoryTab() {
  const { name } = useParams<{ name: string }>()
  const { group } = useWorkingGroup({ name })

  const [currentTab, setCurrentTab] = useState<Tab>('OPENINGS')
  const tabs = [
    { title: 'Past openings', active: currentTab === 'OPENINGS', onClick: () => setCurrentTab('OPENINGS') },
    { title: 'Past workers', active: currentTab === 'WORKERS', onClick: () => setCurrentTab('WORKERS') },
  ]
  const activities = useActivities()
  const sideNeighborRef = useRef<HTMLDivElement>(null)

  return (
    <ContentWithSidepanel>
      <MainPanel ref={sideNeighborRef}>
        <Tabs tabsSize="xs" tabs={tabs} />
        {currentTab === 'OPENINGS' && <OpeningsHistory groupId={group?.id} />}
        {currentTab === 'WORKERS' && <WorkersHistory groupId={group?.id} />}
      </MainPanel>
      <SidePanel neighbor={sideNeighborRef}>
        <ActivitiesBlock activities={activities} label="Working Groups Activities" />
      </SidePanel>
    </ContentWithSidepanel>
  )
}

const OpeningsHistory = ({ groupId }: { groupId: string | undefined }) => {
  const [page, setPage] = useState<number>(1)
  const { isLoading, openings, pageCount } = useOpenings({ groupId, statusIn: ['filled', 'cancelled'], page })

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <OpeningsList openings={openings} past />
      <Pagination pageCount={pageCount as number} handlePageChange={setPage} page={page} />
    </>
  )
}

const WorkersHistory = ({ groupId }: { groupId: string | undefined }) => {
  const [page, setPage] = useState<number>(1)
  const { isLoading, workers, pageCount } = useWorkersPagination({ groupId, statusIn: ['left', 'terminated'], page })

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <WorkersTableList workers={workers} past />
      <Pagination pageCount={pageCount as number} handlePageChange={setPage} page={page} />
    </>
  )
}
