import BN from 'bn.js'
import React, { useCallback, useRef } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import { AppPage } from '@/app/components/AppPage'
import { ActivitiesBlock } from '@/common/components/Activities/ActivitiesBlock'
import { BadgeStatus } from '@/common/components/BadgeStatus/BadgeStatus'
import { BlockTime } from '@/common/components/BlockTime'
import { ButtonGhost, ButtonPrimary, ButtonsGroup } from '@/common/components/buttons/Buttons'
import { LinkButtonGhost } from '@/common/components/buttons/LinkButtons'
import { Loading } from '@/common/components/Loading'
import {
  ContentWithSidepanel,
  ContentWithTabs,
  MainPanel,
  PageFooter,
  RowGapBlock,
} from '@/common/components/page/PageContent'
import { PageHeader } from '@/common/components/page/PageHeader'
import { PageTitle } from '@/common/components/page/PageTitle'
import { PreviousPage } from '@/common/components/page/PreviousPage'
import { SidePanel } from '@/common/components/page/SidePanel'
import { MultiTokenValueStat, Statistics, TokenValueStat } from '@/common/components/statistics'
import { Tooltip, TooltipDefault } from '@/common/components/Tooltip'
import { Label } from '@/common/components/typography'
import { useActivities } from '@/common/hooks/useActivities'
import { useModal } from '@/common/hooks/useModal'
import { MyRoleAccount } from '@/working-groups/components/Roles/MyRoleAccount'
import { workerRoleTitle } from '@/working-groups/helpers'
import { useWorker } from '@/working-groups/hooks/useWorker'
import { ApplicationDetailsModalCall } from '@/working-groups/modals/ApplicationDetailsModal'
import { ModalTypes } from '@/working-groups/modals/ChangeAccountModal/constants'
import { LeaveRoleModalCall } from '@/working-groups/modals/LeaveRoleModal'

export const MyRole = () => {
  const { id } = useParams<{ id: string }>()

  const { worker, isLoading } = useWorker(id)
  const isActive = worker && worker.status === 'WorkerStatusActive'

  const activities = useActivities()
  const warning =
    worker && !isActive
      ? {
          title: 'Role Ended',
          content: 'We are sorry, but this role has already ended.',
          isClosable: false,
        }
      : undefined

  const { showModal } = useModal()
  const showApplicationModal = useCallback(() => {
    if (!worker?.applicationId) {
      return
    }
    showModal<ApplicationDetailsModalCall>({
      modal: 'ApplicationDetails',
      data: { applicationId: worker.applicationId },
    })
  }, [worker?.applicationId])
  const showLeaveRoleModal = useCallback(() => {
    worker &&
      showModal<LeaveRoleModalCall>({
        modal: 'LeaveRole',
        data: { worker },
      })
  }, [worker])

  const onChangeRoleClick = (): void => {
    showModal({ modal: 'ChangeAccountModal', data: { worker, type: ModalTypes.CHANGE_ROLE_ACCOUNT } })
  }

  const onChangeRewardClick = (): void => {
    showModal({ modal: 'ChangeAccountModal', data: { worker, type: ModalTypes.CHANGE_REWARD_ACCOUNT } })
  }

  if (isLoading || !worker) {
    return <Loading />
  }
  const sideNeighborRef = useRef<HTMLDivElement>(null)

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
          <LinkButtonGhost size="medium" to={`/working-groups/openings/${worker?.openingId}`}>
            Opening
          </LinkButtonGhost>
          {isActive && (
            <ButtonGhost size="medium" onClick={showLeaveRoleModal}>
              Leave this position
              <Tooltip tooltipText="Lorem ipsum" tooltipTitle="Lorem ipsum">
                <TooltipDefault />
              </Tooltip>
            </ButtonGhost>
          )}
        </ButtonsGroup>
      </PageHeader>
      <RowGapBlock>
        <Row>
          <BadgeStatus inverted size="l" separated>
            {worker.group.name.toUpperCase()}
          </BadgeStatus>
          <BadgeStatus inverted size="l" separated>
            {worker.isLeader ? 'LEADER' : 'REGULAR'}
          </BadgeStatus>
          <BadgeStatus inverted size="l" separated>
            WORKER ID #{worker.id}
          </BadgeStatus>
          {!isActive && (
            <BadgeStatus ended inverted size="l" separated>
              ROLE ENDED
            </BadgeStatus>
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
          <TokenValueStat title="Stake height" value={worker.stake} />
          <TokenValueStat title="Owed reward" value={150000} />
          <TokenValueStat title="Next payout in" value={150000} />
        </Statistics>
        <ContentWithSidepanel>
          <MainPanel ref={sideNeighborRef}>
            <ContentWithTabs>
              <RoleAccountHeader>
                <Label>Role Account</Label>
                <ButtonsGroup>
                  {isActive && (
                    <ButtonGhost size="small" onClick={onChangeRoleClick}>
                      Change Role Account
                    </ButtonGhost>
                  )}
                </ButtonsGroup>
              </RoleAccountHeader>
              <MyRoleAccount account={{ name: 'Role Account', address: worker.roleAccount }} balances={['total']} />
            </ContentWithTabs>
            <ContentWithTabs>
              <RoleAccountHeader>
                <Label>Stake Account</Label>
                <ButtonsGroup>
                  {isActive && <ButtonPrimary size="small">Move Excess Tokens</ButtonPrimary>}
                </ButtonsGroup>
              </RoleAccountHeader>
              <MyRoleAccount
                account={{ name: 'Stake Account', address: worker.stakeAccount }}
                balances={['total', 'locked']}
              />
            </ContentWithTabs>
            <ContentWithTabs>
              <RoleAccountHeader>
                <Label>Reward Account</Label>
                <ButtonsGroup>
                  {isActive && (
                    <ButtonGhost size="small" onClick={onChangeRewardClick}>
                      Change Reward Account
                    </ButtonGhost>
                  )}
                </ButtonsGroup>
              </RoleAccountHeader>
              <MyRoleAccount account={{ name: 'Reward Account', address: worker.rewardAccount }} balances={['total']} />
            </ContentWithTabs>
          </MainPanel>
          <SidePanel neighbor={sideNeighborRef}>
            <ActivitiesBlock activities={activities} label="Role Activities" warning={warning} />
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

const RoleAccountHeader = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`
