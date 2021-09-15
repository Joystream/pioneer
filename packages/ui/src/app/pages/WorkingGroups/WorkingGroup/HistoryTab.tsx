import React, { useMemo, useRef, useState, FC, memo, useCallback } from 'react'

import { ActivitiesBlock } from '@/common/components/Activities/ActivitiesBlock'
import { ListHeader, ListHeaders } from '@/common/components/List/ListHeader'
import { Loading } from '@/common/components/Loading'
import { ContentWithSidepanel, MainPanel, RowGapBlock } from '@/common/components/page/PageContent'
import { SidePanel } from '@/common/components/page/SidePanel'
import { Pagination } from '@/common/components/Pagination'
import { HeaderText, SortIconDown, SortIconUp } from '@/common/components/SortedListHeaders'
import { Tabs } from '@/common/components/Tabs'
import { TextBig } from '@/common/components/typography'
import { OpeningsPagination } from '@/working-groups/components/OpeningsList'
import { PastWorkersList } from '@/working-groups/components/WorkersTableList/PastWorkersList'
import { useGroupActivities } from '@/working-groups/hooks/useGroupActivities'
import { usePastWorkersPagination, WorkersOrderKey } from '@/working-groups/hooks/usePastWorkersPagination'
import { WorkingGroup } from '@/working-groups/types'

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
  const { activities } = useGroupActivities(workingGroup.id)
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
  <OpeningsPagination groupId={groupId} type="past" />
)

interface ListOrder {
  key: WorkersOrderKey
  isDescending: boolean
}

const WorkersHistory = ({ groupId }: { groupId: string | undefined }) => {
  const [page, setPage] = useState(1)
  const [order, setOrder] = useState<ListOrder>({ key: 'DateFinished', isDescending: true })

  const { loadingWorkers, loadingCount, workers, pageCount } = usePastWorkersPagination({
    groupId,
    page,
    isDescending: order.isDescending,
    orderKey: order.key,
  })

  const sort = useCallback((sortKey: WorkersOrderKey) => null, [])

  const SortHeader = useMemo<FC<{ sortKey: WorkersOrderKey }>>(
    () =>
      memo(({ sortKey, children }) => (
        <ListHeader onClick={() => sort(sortKey)}>
          <HeaderText>
            {children}
            {order.key === sortKey && (order.isDescending ? <SortIconDown /> : <SortIconUp />)}
          </HeaderText>
        </ListHeader>
      )),
    [order, sort]
  )

  if (loadingWorkers && loadingCount) {
    return <Loading />
  }

  if (!workers?.length && !loadingWorkers) {
    return <TextBig>No workers found</TextBig>
  }

  return (
    <>
      <ListHeaders>
        <ListHeader>Worker</ListHeader>
        <SortHeader sortKey="DateStarted">Date Started</SortHeader>
        <SortHeader sortKey="DateFinished">Date Finished</SortHeader>
      </ListHeaders>
      {!loadingWorkers ? <PastWorkersList workers={workers} /> : <Loading />}
      {!loadingCount && <Pagination pageCount={pageCount} handlePageChange={setPage} page={page} />}
    </>
  )
}
