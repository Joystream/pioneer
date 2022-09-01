import React, { useCallback, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import { useBalance } from '@/accounts/hooks/useBalance'
import { PageLayout, PageHeaderWrapper, PageHeaderRow } from '@/app/components/PageLayout'
import { ActivitiesBlock } from '@/common/components/Activities/ActivitiesBlock'
import { BadgesRow, BadgeStatus } from '@/common/components/BadgeStatus'
import { BlockTime } from '@/common/components/BlockTime'
import { ButtonGhost, ButtonsGroup } from '@/common/components/buttons/Buttons'
import { LinkButtonGhost } from '@/common/components/buttons/LinkButtons'
import { TransactionButton } from '@/common/components/buttons/TransactionButton'
import { Loading } from '@/common/components/Loading'
import { ContentWithTabs, MainPanel, PageFooter, RowGapBlock } from '@/common/components/page/PageContent'
import { PageTitle } from '@/common/components/page/PageTitle'
import { PreviousPage } from '@/common/components/page/PreviousPage'
import { SidePanel } from '@/common/components/page/SidePanel'
import { Statistics, TokenValueStat, StakeStat } from '@/common/components/statistics'
import { Tooltip, TooltipDefault } from '@/common/components/Tooltip'
import { Label } from '@/common/components/typography'
import { useModal } from '@/common/hooks/useModal'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { MyEarningsStat } from '@/working-groups/components/MyEarningsStat'
import { NextPayoutStat } from '@/working-groups/components/NextPayoutStat'
import { MyRoleAccount } from '@/working-groups/components/Roles/MyRoleAccount'
import { workerRoleTitle } from '@/working-groups/helpers'
import { useWorker } from '@/working-groups/hooks/useWorker'
import { useWorkerUnstakingPeriodEnd } from '@/working-groups/hooks/useWorkerUnstakingPeriodEnd'
import { useRoleActivities } from '@/working-groups/hooks/utils/useRoleActivities'
import { ApplicationDetailsModalCall } from '@/working-groups/modals/ApplicationDetailsModal'
import { ModalTypes } from '@/working-groups/modals/ChangeAccountModal/constants'
import { LeaveRoleModalCall } from '@/working-groups/modals/LeaveRoleModal'
import { getRoleWarning } from '@/working-groups/model/getRoleWarning'

export const MyRole = () => {
  const { id } = useParams<{ id: string }>()

  const { worker, isLoading } = useWorker(id)
  const { members } = useMyMemberships()
  const stakeBalance = useBalance(worker?.stakeAccount)

  const isOwn = useMemo(() => {
    return !!members.find((member) => member.id === worker?.membership.id)
  }, [members.length, worker?.id])

  const isActive = worker && worker.status === 'WorkerStatusActive'
  const isLeaving = worker && worker.status === 'WorkerStatusLeaving'
  const isBelowMinStake = worker && worker.stake < worker.minStake
  const shouldIncreaseStake = worker?.stakeAccount && isBelowMinStake && isOwn
  const canMoveExcessTokens = worker && stakeBalance?.transferable && worker.stake > worker.minStake

  const workerExcessValue = useMemo(() => {
    if (canMoveExcessTokens) {
      const excessValue = worker.stake.sub(worker.minStake)

      return stakeBalance.transferable.gte(excessValue) ? excessValue : stakeBalance.transferable
    }
  }, [worker, stakeBalance])

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

  const onChangeRoleClick = (): void => {
    showModal({ modal: 'ChangeAccountModal', data: { worker, type: ModalTypes.CHANGE_ROLE_ACCOUNT } })
  }

  const onChangeRewardClick = (): void => {
    showModal({ modal: 'ChangeAccountModal', data: { worker, type: ModalTypes.CHANGE_REWARD_ACCOUNT } })
  }

  const onIncreaseStakeClick = (): void => {
    showModal({
      modal: 'IncreaseWorkerStake',
      data: {
        worker: worker,
      },
    })
  }

  const onMoveExcessClick = () => {
    showModal({
      modal: 'TransferTokens',
      data: { from: worker?.stakeAccount, to: worker?.roleAccount, maxValue: workerExcessValue },
    })
  }

  if (isLoading || !worker) {
    return <Loading />
  }

  return (
    <PageLayout
      lastBreadcrumb={workerRoleTitle(worker)}
      header={
        <PageHeaderWrapper>
          <PageHeaderRow>
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
              {isActive && isOwn && (
                <TransactionButton style="ghost" size="medium" onClick={showLeaveRoleModal}>
                  Leave this position
                  <Tooltip tooltipText="Lorem ipsum" tooltipTitle="Lorem ipsum">
                    <TooltipDefault />
                  </Tooltip>
                </TransactionButton>
              )}
            </ButtonsGroup>
          </PageHeaderRow>
          <RowGapBlock gap={24}>
            <BadgesRow>
              <BadgeStatus inverted size="l" separated>
                {worker.group.name.toUpperCase()}
              </BadgeStatus>
              <BadgeStatus inverted size="l" separated>
                {worker.isLead ? 'LEAD' : 'REGULAR'}
              </BadgeStatus>
              <BadgeStatus inverted size="l" separated>
                {`WORKER ID #${worker.id}`}
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
        </PageHeaderWrapper>
      }
      main={
        <MainPanel>
          <ContentWithTabs>
            <RoleAccountHeader>
              <Label>Role Account</Label>
              <ButtonsGroup>
                {isActive && isOwn && (
                  <TransactionButton style="ghost" size="small" onClick={onChangeRoleClick}>
                    Change Role Account
                  </TransactionButton>
                )}
              </ButtonsGroup>
            </RoleAccountHeader>
            <MyRoleAccount account={{ name: 'Role Account', address: worker.roleAccount }} balances={['total']} />
          </ContentWithTabs>
          <ContentWithTabs>
            <RoleAccountHeader>
              <Label>Stake Account</Label>
              <ButtonsGroup>
                {isActive ||
                  (canMoveExcessTokens && (
                    <TransactionButton style="primary" size="small" onClick={onMoveExcessClick}>
                      Move Excess Tokens
                    </TransactionButton>
                  ))}
                {isActive && shouldIncreaseStake && (
                  <TransactionButton style="primary" size="small" onClick={onIncreaseStakeClick}>
                    Increase Stake
                  </TransactionButton>
                )}
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
                {isActive && isOwn && (
                  <TransactionButton style="ghost" size="small" onClick={onChangeRewardClick}>
                    Change Reward Account
                  </TransactionButton>
                )}
              </ButtonsGroup>
            </RoleAccountHeader>
            <MyRoleAccount account={{ name: 'Reward Account', address: worker.rewardAccount }} balances={['total']} />
          </ContentWithTabs>
        </MainPanel>
      }
      sidebar={
        <SidePanel>
          <ActivitiesBlock activities={activities} label="Role Activities" warning={warning} isOwn={isOwn} />
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
