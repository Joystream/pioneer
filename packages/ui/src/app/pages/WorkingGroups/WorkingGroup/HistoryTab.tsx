import React, { useRef, useState } from 'react'

import { ActivitiesBlock } from '@/common/components/Activities/ActivitiesBlock'
import { Loading } from '@/common/components/Loading'
import { ContentWithSidepanel, MainPanel, RowGapBlock } from '@/common/components/page/PageContent'
import { SidePanel } from '@/common/components/page/SidePanel'
import { Pagination } from '@/common/components/Pagination'
import { Tabs } from '@/common/components/Tabs'
import { useActivities } from '@/common/hooks/useActivities'
import { OpeningsPagination } from '@/working-groups/components/OpeningsList'
import { WorkersTableList } from '@/working-groups/components/WorkersTableList/WorkersTableList'
import { useWorkersPagination } from '@/working-groups/hooks/useWorkersPagination'
import { WorkingGroup } from '@/working-groups/types'

import { TextBig } from '../../../../common/components/typography'

type Tab = 'OPENINGS' | 'WORKERS'

interface Props {
  workingGroup: WorkingGroup
}

export function HistoryTab({ workingGroup }: Props) {
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
        <RowGapBlock gap={32}>
          <Tabs tabsSize="xs" tabs={tabs} />
          {currentTab === 'OPENINGS' && <OpeningsHistory groupId={workingGroup?.id} />}
          {currentTab === 'WORKERS' && <WorkersHistory groupId={workingGroup?.id} />}
        </RowGapBlock>
      </MainPanel>
      <SidePanel neighbor={sideNeighborRef}>
        <ActivitiesBlock activities={activities} label="Working Groups Activities" />
      </SidePanel>
    </ContentWithSidepanel>
  )
}

const OpeningsHistory = ({ groupId }: { groupId: string | undefined }) => (
  <OpeningsPagination groupId={groupId} statusIn={['filled', 'cancelled']} />
)

const WorkersHistory = ({ groupId }: { groupId: string | undefined }) => {
  const [page, setPage] = useState(1)
  const { isLoading, workers, pageCount } = useWorkersPagination({ groupId, statusIn: ['left', 'terminated'], page })

  if (isLoading) {
    return <Loading />
  }

  if (!workers || !workers.length) {
    return <TextBig>No workers found</TextBig>
  }

  return (
    <>
      <WorkersTableList workers={workers} past />
      <Pagination pageCount={pageCount} handlePageChange={setPage} page={page} />
    </>
  )
}
