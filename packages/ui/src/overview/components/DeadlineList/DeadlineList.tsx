import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { List } from '@/common/components/List'
import { Loading } from '@/common/components/Loading'
import { Colors } from '@/common/constants'
import { useLocalStorage } from '@/common/hooks/useLocalStorage'
import { useCurrentElection } from '@/council/hooks/useCurrentElection'
import { ElectionListItem } from '@/overview/components/DeadlineList/ElectionListItem'
import { OpeningsListItem } from '@/overview/components/DeadlineList/OpeningsListItem'
import { ProposalListItem } from '@/overview/components/DeadlineList/ProposalListItem'
import { StyledBadge, StyledText, TimeWrapper } from '@/overview/components/DeadlineList/styles'
import { useDeadlines } from '@/overview/hooks/useDeadlines'
import { useProposals } from '@/proposals/hooks/useProposals'
import { useOpenings } from '@/working-groups/hooks/useOpenings'
import { useUpcomingOpenings } from '@/working-groups/hooks/useUpcomingOpenings'
import { WorkingGroup } from '@/working-groups/types'

export interface DeadlineListProps {
  workingGroup?: WorkingGroup
}

export type DeadlineNamespace = 'election' | 'proposals' | 'openings' | 'upcomingOpenings'

const initializer: Record<DeadlineNamespace, string[]> = {
  proposals: [],
  openings: [],
  upcomingOpenings: [],
  election: [],
}

export const DeadlineList: React.FC<DeadlineListProps> = React.memo(({ workingGroup }) => {
  const { t } = useTranslation('overview')
  const { election, proposals, upcomingOpenings, openings, isLoading } = useDeadlines({ groupId: workingGroup?.id })
  const [storageDeadlines, setStorageDeadlines] = useLocalStorage<Record<DeadlineNamespace, string[]>>('deadlines')
  const [tempDeadlines, setTempDeadlines] = useState<Record<DeadlineNamespace, string[]> | null>(null)
  const tempRef = useRef<boolean>(false)
  useEffect(() => {
    if (!tempRef.current && !tempDeadlines) {
      setTempDeadlines(storageDeadlines ?? initializer)
      tempRef.current = true
    }

    return () => {
      if (tempDeadlines) {
        setStorageDeadlines(tempDeadlines)
      }
    }
  }, [storageDeadlines, tempDeadlines])

  const helper = (namespace: DeadlineNamespace) => (id: string) => {
    setTempDeadlines((prev) => {
      return prev
        ? {
            ...prev,
            [namespace]: [...prev[namespace], id],
          }
        : null
    })
  }

  const deadlines = useMemo((): Record<DeadlineNamespace, any[]> => {
    return {
      proposals: tempDeadlines?.proposals
        ? proposals.filter((proposal) => !tempDeadlines.proposals.includes(proposal.id))
        : proposals,
      election: tempDeadlines?.election
        ? election?.candidates.filter((candidate) => !tempDeadlines.election.includes(candidate.id)) ?? []
        : election?.candidates ?? [],
      openings: tempDeadlines?.openings
        ? openings.filter((opening) => !tempDeadlines.openings.includes(opening.id))
        : openings,
      upcomingOpenings: tempDeadlines?.upcomingOpenings
        ? upcomingOpenings.filter((upcomingOpening) => !tempDeadlines.upcomingOpenings.includes(upcomingOpening.id))
        : upcomingOpenings,
    }
  }, [storageDeadlines?.proposals, proposals, election, upcomingOpenings, openings])

  if (isLoading) {
    return <Loading />
  }

  const elementsLength =
    proposals.length + (election ? election.candidates.length : 0) + upcomingOpenings.length + openings.length
  return (
    <>
      <TimeWrapper>
        <StyledText>
          {t('deadline.deadlinesTitle')}
          <StyledBadge>{elementsLength}</StyledBadge>
        </StyledText>
      </TimeWrapper>
      {elementsLength === 0 ? (
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
              hideForStorage={helper('proposals')}
            />
          ))}
          {deadlines.election?.map((elections) => (
            <ElectionListItem
              hideForStorage={helper('election')}
              electionId={elections.id}
              title={elections.info.title}
              key={elections.id}
            />
          ))}
          {deadlines.openings.map((opening) => (
            <OpeningsListItem
              hideForStorage={helper('openings')}
              id={opening.id}
              key={opening.id}
              title={opening.metadata.title}
              type="openings"
              groupName={opening.group.name}
            />
          ))}
          {deadlines.upcomingOpenings.map((upcoming) => (
            <OpeningsListItem
              hideForStorage={helper('upcomingOpenings')}
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
