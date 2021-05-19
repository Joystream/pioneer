import BN from 'bn.js'
import React, { useCallback } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'

import { AppPage } from '@/app/components/AppPage'
import { ActivitiesBlock } from '@/common/components/Activities/ActivitiesBlock'
import { BadgeRed } from '@/common/components/BadgeRed'
import { BadgeViolet } from '@/common/components/BadgeViolet'
import { BlockTime } from '@/common/components/BlockTime'
import { ButtonGhost, ButtonPrimary, ButtonsGroup } from '@/common/components/buttons/Buttons'
import { Help } from '@/common/components/Help'
import { Loading } from '@/common/components/Loading'
import {
  ContentWithSidepanel,
  ContentWithTabs,
  MainPanel,
  PageFooter,
  RowGapBlock,
  SidePanel,
} from '@/common/components/page/PageContent'
import { PageHeader } from '@/common/components/page/PageHeader'
import { PageTitle } from '@/common/components/page/PageTitle'
import { PreviousPage } from '@/common/components/page/PreviousPage'
import { Statistics, TokenValueStat, MultiTokenValueStat } from '@/common/components/statistics'
import { Label } from '@/common/components/typography'
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
  const isActive = worker && worker.status === 'WorkerStatusActive'

  const onChangeRoleClick = (): void => {
    showModal({ modal: 'ChangeRoleModal', data: { worker } })
  }

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
          {isActive && (
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
          {!isActive && (
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
            <ContentWithTabs>
              <RoleAccountHeader>
                <Label>Role Account</Label>
                <ButtonsGroup onClick={onChangeRoleClick}>
                  {isActive && <ButtonGhost size="small">Change Role Account</ButtonGhost>}
                </ButtonsGroup>
              </RoleAccountHeader>
              <MyRoleAccount account={{ name: 'Role Account', address: worker.roleAccount }} />
            </ContentWithTabs>
            <ContentWithTabs>
              <RoleAccountHeader>
                <Label>Stake Account</Label>
                <ButtonsGroup>
                  {isActive && <ButtonPrimary size="small">Move Excess Tokens</ButtonPrimary>}
                </ButtonsGroup>
              </RoleAccountHeader>
              <MyRoleAccount account={{ name: 'Stake Account', address: worker.stakeAccount }} />
            </ContentWithTabs>
            <ContentWithTabs>
              <RoleAccountHeader>
                <Label>Reward Account</Label>
                <ButtonsGroup>{isActive && <ButtonGhost size="small">Change Reward Account</ButtonGhost>}</ButtonsGroup>
              </RoleAccountHeader>
              <MyRoleAccount account={{ name: 'Reward Account', address: worker.rewardAccount }} />
            </ContentWithTabs>
          </MainPanel>
          <SidePanel>
            <ActivitiesBlock activities={activities} label="Role Activities" />
          </SidePanel>
        </ContentWithSidepanel>
      </RowGapBlock>
      <PageFooter>
        <BlockTime block={worker.hiredAtBlock} horizontal />
      </PageFooter>
    </AppPage>
  )
}

const Row = styled.div`
  display: flex;
`

const RoleAccountHeader = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`
