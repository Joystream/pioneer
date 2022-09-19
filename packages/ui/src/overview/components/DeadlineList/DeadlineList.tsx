import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { List } from '@/common/components/List'
import { Loading } from '@/common/components/Loading'
import { Colors } from '@/common/constants'
import { Member } from '@/memberships/types'
import { ElectionListItem } from '@/overview/components/DeadlineList/ElectionListItem'
import { OpeningsListItem } from '@/overview/components/DeadlineList/OpeningsListItem'
import { ProposalListItem } from '@/overview/components/DeadlineList/ProposalListItem'
import { StyledBadge, StyledText, TimeWrapper } from '@/overview/components/DeadlineList/styles'
import { useDeadlines } from '@/overview/hooks/useDeadlines'
import { WorkingGroup } from '@/working-groups/types'

export interface DeadlineListProps {
  workingGroup?: WorkingGroup
  member: Member
}

export const DeadlineList: React.FC<DeadlineListProps> = React.memo(({ workingGroup, member }) => {
  const { t } = useTranslation('overview')

  const { isLoading, deadlines, hideForStorage, count } = useDeadlines({ groupId: workingGroup?.id, member: member })

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <TimeWrapper>
        <StyledText>
          {t('deadline.deadlinesTitle')}
          <StyledBadge>{count}</StyledBadge>
        </StyledText>
      </TimeWrapper>
      {count === 0 ? (
        <EmptyStateWrapper>
          <EmptyMessage>{t('deadline.emptyState')}</EmptyMessage>
        </EmptyStateWrapper>
      ) : (
        <List>
          {deadlines.proposals?.map((proposal) => (
            <ProposalListItem
              key={proposal.id}
              proposalId={proposal.id}
              title={proposal.title}
              hideForStorage={hideForStorage('proposals')}
            />
          ))}
          {deadlines.elections?.map((election) => (
            <ElectionListItem
              hideForStorage={hideForStorage('elections')}
              key={election.cycleId}
              election={election}
              member={member}
            />
          ))}
          {deadlines.openings.map((opening) => (
            <OpeningsListItem
              hideForStorage={hideForStorage('openings')}
              id={opening.id}
              key={opening.id}
              title={opening.metadata.title}
              type="openings"
              groupName={opening.group.name}
            />
          ))}
          {deadlines.upcomingOpenings.map((upcoming) => (
            <OpeningsListItem
              hideForStorage={hideForStorage('upcomingOpenings')}
              id={upcoming.id}
              key={upcoming.id}
              title={upcoming.title}
              type="upcoming"
              groupName={upcoming.groupName}
            />
          ))}
        </List>
      )}
    </>
  )
})

export const EmptyStateWrapper = styled.div`
  height: 66px;
  align-items: center;
  border-radius: 5px;
  display: grid;
  border: 1px solid ${Colors.Black[100]};
  background-color: ${Colors.White};
  transition: all 0.25s ease;
`

export const EmptyMessage = styled(StyledText)`
  padding-left: 16px;
`
