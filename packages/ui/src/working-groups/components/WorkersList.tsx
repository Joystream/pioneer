import React from 'react'
import styled from 'styled-components'

import { ButtonGhost } from '../../common/components/buttons'
import { CountBadge } from '../../common/components/CountBadge'
import { FileIcon } from '../../common/components/icons/FileIcon'
import { ContentWithTabs, RowGapBlock } from '../../common/components/page/PageContent'
import { Label } from '../../common/components/typography'
import { MemberInfo } from '../../memberships/components'
import { Member } from '../../memberships/types'

export interface WorkersListProps {
  leader?: Member
  workers?: Member[]
}

interface WorkerProps {
  member: Member
  isLeader?: Member
}

const Worker = ({ member, isLeader }: WorkerProps) => (
  <WorkerWrap>
    <MemberInfo member={member} isLeader={isLeader} />
    <ButtonGhost square size="small">
      <FileIcon />
    </ButtonGhost>
  </WorkerWrap>
)

export const WorkersList = ({ leader, workers }: WorkersListProps) => {
  return (
    <RowGapBlock gap={36}>
      {leader && (
        <ContentWithTabs>
          <Label>Leader</Label>
          <Worker member={leader} isLeader={leader} />
        </ContentWithTabs>
      )}
      <ContentWithTabs>
        <Label>
          Workers <CountBadge count={workers?.length ?? 0} />{' '}
        </Label>
        {workers && (
          <ContentWithTabs>
            {workers.map((member) => (
              <Worker key={member.handle} member={member} />
            ))}
          </ContentWithTabs>
        )}
      </ContentWithTabs>
    </RowGapBlock>
  )
}

const WorkerWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 32px;
  grid-column-gap: 8px;
`
