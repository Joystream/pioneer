import BN from 'bn.js'
import React, { useCallback } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'

import { AppPage } from '@/app/components/AppPage'
import { ActivitiesBlock } from '@/common/components/Activities/ActivitiesBlock'
import { BadgeRed } from '@/common/components/BadgeRed'
import { BadgeViolet } from '@/common/components/BadgeViolet'
import { BlockTime } from '@/common/components/BlockTime'
import { ButtonGhost, ButtonsGroup } from '@/common/components/buttons/Buttons'
import { Help } from '@/common/components/Help'
import { Loading } from '@/common/components/Loading'
import {
  ContentWithSidepanel,
  MainPanel,
  PageFooter,
  RowGapBlock,
  SidePanel,
} from '@/common/components/page/PageContent'
import { PageHeader } from '@/common/components/page/PageHeader'
import { PageTitle } from '@/common/components/page/PageTitle'
import { PreviousPage } from '@/common/components/page/PreviousPage'
import { Statistics, TokenValueStat, MultiTokenValueStat } from '@/common/components/statistics'
import { useActivities } from '@/common/hooks/useActivities'
import { useModal } from '@/common/hooks/useModal'
import { MyRoleAccount } from '@/working-groups/components/Roles/MyRoleAccount'
import { workerRoleTitle } from '@/working-groups/helpers'
import { useWorker } from '@/working-groups/hooks/useWorker'
import { ApplicationDetailsModalCall } from '@/working-groups/modals/ApplicationDetailsModal'
import { WorkingGroupApplication } from '@/working-groups/types/WorkingGroupApplication'

export const MyRole = () => {
  const { id } = useParams<{ id: string }>()

  const { worker, isLoading } = useWorker(id)

  const history = useHistory()
  const activities = useActivities()
  const { showModal } = useModal()
  const showApplicationModal = useCallback(() => {
    showModal<ApplicationDetailsModalCall>({
      modal: 'ApplicationDetails',
      data: { application: (worker && worker.application) as WorkingGroupApplication },
    })
  }, [worker && worker.application.id])

  if (isLoading || !worker) {
    return <Loading />
  }

  return (
    <AppPage lastBreadcrumb={workerRoleTitle(worker)} rowGap="s">
      <PageHeader>
        <PreviousPage>
          <PageTitle>{workerRoleTitle(worker)}</PageTitle>
        </PreviousPage>
        <ButtonsGroup>
          <ButtonGhost size="medium" onClick={showApplicationModal}>
            Application
          </ButtonGhost>
          <ButtonGhost
            size="medium"
            onClick={() => history.push(`/working-groups/openings/${worker?.application.opening.id}`)}
          >
            Opening
          </ButtonGhost>
          {worker.status === 'WorkerStatusActive' && (
            <ButtonGhost size="medium">
              Leave a position
              <Help helperText="Lorem ipsum" helperTitle="Lorem ipsum" />
            </ButtonGhost>
          )}
        </ButtonsGroup>
      </PageHeader>
      <RowGapBlock>
        <Row>
          <BadgeViolet inverted size="l" separated>
            {worker.group.name.toUpperCase()}
          </BadgeViolet>
          <BadgeViolet inverted size="l" separated>
            {worker.isLeader ? 'LEADER' : 'REGULAR'}
          </BadgeViolet>
          <BadgeViolet inverted size="l" separated>
            WORKER ID #{worker.id}
          </BadgeViolet>
          {worker.status !== 'WorkerStatusActive' && (
            <BadgeRed inverted size="l" separated>
              ROLE ENDED
            </BadgeRed>
          )}
        </Row>
        <Statistics>
          <MultiTokenValueStat
            title="Total earned in the past"
            values={[
              {
                label: '24 hours',
                value: new BN(200),
              },
              {
                label: 'Month',
                value: new BN(10200000),
              },
            ]}
          />
          <TokenValueStat title="Stake height" value={150000} />
          <TokenValueStat title="Owed reward" value={150000} />
          <TokenValueStat title="Next payout in" value={150000} />
        </Statistics>
        <ContentWithSidepanel>
          <MainPanel>
            <MyRoleAccount name="Role Account" address={worker.roleAccount} />
            <MyRoleAccount name="Staking Account" address={worker.stakeAccount} />
            <MyRoleAccount name="Reward Account" address={worker.rewardAccount} />
          </MainPanel>
          <SidePanel>
            <ActivitiesBlock activities={activities} label="Role Activities" />
          </SidePanel>
        </ContentWithSidepanel>
      </RowGapBlock>
      <PageFooter>
        <BlockTime block={worker.hiredAtBlock} horizontal dateLabel="Hired" />
      </PageFooter>
    </AppPage>
  )
}

const Row = styled.div`
  display: flex;
`
