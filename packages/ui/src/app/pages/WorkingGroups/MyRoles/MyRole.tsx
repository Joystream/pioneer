import React, { useCallback, useRef } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import { PageLayout } from '@/app/components/PageLayout'
import { ActivitiesBlock } from '@/common/components/Activities/ActivitiesBlock'
import { BadgesRow, BadgeStatus } from '@/common/components/BadgeStatus'
import { BlockTime } from '@/common/components/BlockTime'
import { ButtonGhost, ButtonPrimary, ButtonsGroup } from '@/common/components/buttons/Buttons'
import { LinkButtonGhost } from '@/common/components/buttons/LinkButtons'
import { Loading } from '@/common/components/Loading'
import { ContentWithTabs, MainPanel, PageFooter, RowGapBlock } from '@/common/components/page/PageContent'
import { PageHeader } from '@/common/components/page/PageHeader'
import { PageTitle } from '@/common/components/page/PageTitle'
import { PreviousPage } from '@/common/components/page/PreviousPage'
import { SidePanel } from '@/common/components/page/SidePanel'
import { Statistics, TokenValueStat, StakeStat } from '@/common/components/statistics'
import { Tooltip, TooltipDefault } from '@/common/components/Tooltip'
import { Label } from '@/common/components/typography'
import { useModal } from '@/common/hooks/useModal'
import { MyEarningsStat } from '@/working-groups/components/MyEarningsStat'
import { NextPayoutStat } from '@/working-groups/components/NextPayoutStat'
import { MyRoleAccount } from '@/working-groups/components/Roles/MyRoleAccount'
import { workerRoleTitle } from '@/working-groups/helpers'
import { useWorker } from '@/working-groups/hooks/useWorker'
import { useRoleActivities } from '@/working-groups/hooks/utils/useRoleActivities'
import { ApplicationDetailsModalCall } from '@/working-groups/modals/ApplicationDetailsModal'
import { ModalTypes } from '@/working-groups/modals/ChangeAccountModal/constants'
import { LeaveRoleModalCall } from '@/working-groups/modals/LeaveRoleModal'

import { useWorkerUnstakingPeriodEnd } from '../../../../working-groups/hooks/useWorkerUnstakingPeriodEnd'
import { getRoleWarning } from '../../../../working-groups/model/getRoleWarning'

export const MyRole = () => {
  const { id } = useParams<{ id: string }>()

  const { worker, isLoading } = useWorker(id)
  const isActive = worker && worker.status === 'WorkerStatusActive'
  const isLeaving = worker && worker.status === 'WorkerStatusLeaving'

  const { activities } = useRoleActivities(worker)
  const { unstakingPeriodEnd } = useWorkerUnstakingPeriodEnd(worker?.id)
  const warning = worker ? getRoleWarning(worker.status, unstakingPeriodEnd) : undefined

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
        data: { workerId: worker.id },
      })
  }, [worker])

  const sideNeighborRef = useRef<HTMLDivElement>(null)

  const onChangeRoleClick = (): void => {
    showModal({ modal: 'ChangeAccountModal', data: { worker, type: ModalTypes.CHANGE_ROLE_ACCOUNT } })
  }

  const onChangeRewardClick = (): void => {
    showModal({ modal: 'ChangeAccountModal', data: { worker, type: ModalTypes.CHANGE_REWARD_ACCOUNT } })
  }

  if (isLoading || !worker) {
    return <Loading />
  }

  return (
    <PageLayout
      lastBreadcrumb={workerRoleTitle(worker)}
      header={
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
          <RowGapBlock gap={24}>
            <BadgesRow>
              <BadgeStatus inverted size="l" separated>
                {worker.group.name.toUpperCase()}
              </BadgeStatus>
              <BadgeStatus inverted size="l" separated>
                {worker.isLead ? 'LEAD' : 'REGULAR'}
              </BadgeStatus>
              <BadgeStatus inverted size="l" separated>
                WORKER ID #{worker.id}
              </BadgeStatus>
              {!isActive && (
                <BadgeStatus ended inverted size="l" separated>
                  {isLeaving ? 'LEAVING' : 'ROLE ENDED'}
                </BadgeStatus>
              )}
            </BadgesRow>
            <Statistics>
              <MyEarningsStat />
              <StakeStat value={worker.stake} minStake={worker.minStake} />
              <TokenValueStat title="Owed reward" value={worker.owedReward} />
              <NextPayoutStat workers={[worker]} />
            </Statistics>
          </RowGapBlock>
        </PageHeader>
      }
      main={
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
                {isActive || (isLeaving && <ButtonPrimary size="small">Move Excess Tokens</ButtonPrimary>)}
              </ButtonsGroup>
            </RoleAccountHeader>
            <MyRoleAccount
              account={{ name: 'Stake Account', address: worker.stakeAccount }}
              balances={['free', 'total', 'locked']}
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
      }
      sidebar={
        <SidePanel neighbor={sideNeighborRef}>
          <ActivitiesBlock activities={activities} label="Role Activities" warning={warning} isOwn />
        </SidePanel>
      }
      footer={
        <PageFooter>
          <BlockTime block={worker.hiredAtBlock} layout="row" dateLabel="Hired" />
        </PageFooter>
      }
    />
  )
}

const RoleAccountHeader = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-end;
`
