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
import { WorkersTableList } from '@/working-groups/components/WorkersTableList/WorkersTableList'
import { useGroupActivities } from '@/working-groups/hooks/useGroupActivities'
import { useWorkersPagination } from '@/working-groups/hooks/useWorkersPagination'
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

type ListOrderKey = 'DateStarted' | 'DateFinished'
interface ListOrder {
  key: ListOrderKey
  isDescending: boolean
}

const WorkersHistory = ({ groupId }: { groupId: string | undefined }) => {
  const [page, setPage] = useState(1)
  const { isLoading, workers, pageCount } = useWorkersPagination({ groupId, page })

  const [order, setOrder] = useState<ListOrder>({ key: 'DateFinished', isDescending: true })
  const sort = useCallback((sortKey: ListOrderKey) => null, [])

  const SortHeader = useMemo<FC<{ sortKey: ListOrderKey }>>(
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

  if (isLoading) {
    return <Loading />
  }

  if (!workers || !workers.length) {
    return <TextBig>No workers found</TextBig>
  }

  return (
    <>
      <ListHeaders>
        <ListHeader>Worker</ListHeader>
        <SortHeader sortKey="DateStarted">Date Started</SortHeader>
        <SortHeader sortKey="DateFinished">Date Finished</SortHeader>
      </ListHeaders>
      <WorkersTableList workers={workers} past />
      <Pagination pageCount={pageCount} handlePageChange={setPage} page={page} />
    </>
  )
}
