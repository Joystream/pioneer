import React from 'react'
import styled from 'styled-components'

import { ProposalVoteKind } from '@/common/api/queries'
import { ButtonGhost } from '@/common/components/buttons'
import { DropDownButton, DropDownToggle } from '@/common/components/buttons/DropDownToggle'
import { FileIcon } from '@/common/components/icons/FileIcon'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextInlineMedium } from '@/common/components/typography'
import { BorderRad, Colors } from '@/common/constants'
import { useToggle } from '@/common/hooks/useToggle'
import { isDefined } from '@/common/utils'
import { spacing } from '@/common/utils/styles'
import { MemberInfo } from '@/memberships/components'
import { ProposalVotes } from '@/proposals/hooks/useProposalVotes'
import { ProposalVote } from '@/proposals/types'

interface VotesPreviewProps {
  votes: ProposalVotes
}

const { Approve, Reject, Slash, Abstain } = ProposalVoteKind

export const VotesPreview = ({ votes }: VotesPreviewProps) => (
  <VotesContainer>
    <VotePreview kind={Approve} count={votes.count.approve} votes={votes.map.get(Approve)} />
    <VotePreview kind={Reject} count={votes.count.reject} votes={votes.map.get(Reject)} />
    <VotePreview kind={Slash} count={votes.count.slash} votes={votes.map.get(Slash)} />
    <VotePreview kind={Abstain} count={votes.count.abstain} votes={votes.map.get(Abstain)} />
    <VotePreview kind="Not Voted" count={votes.count.remain} />
  </VotesContainer>
)

interface VotePreviewProps {
  kind: string
  count?: number
  votes?: ProposalVote[]
}

export const VotePreview = ({ kind, count, votes }: VotePreviewProps) => {
  const [isOpen, toggle] = useToggle()

  return (
    <VoteType>
      <VoteTypeHeader kind={kind}>
        <h6>{kind.toLowerCase()}</h6>
        <div>
          <TextInlineMedium bold>{isDefined(count) ? count : '-'}</TextInlineMedium>{' '}
          <TextInlineMedium lighter>votes</TextInlineMedium>
        </div>
        <DropDownButton isDropped={isOpen} onClick={toggle} />
      </VoteTypeHeader>

      <DropDownToggle isDropped={isOpen}>
        {votes?.map(({ voter }, index) => (
          <VoteListItem key={index}>
            <MemberInfo key={index} member={voter} memberSize="s" />

            <ButtonGhost size="small" onClick={() => undefined}>
              <FileIcon />
            </ButtonGhost>
          </VoteListItem>
        ))}
      </DropDownToggle>
    </VoteType>
  )
}

const VotesContainer = styled(RowGapBlock).attrs({ gap: 8 })`
  border: 1px solid ${Colors.Black[200]};
  border-radius: ${BorderRad.s};
`

const VoteType = styled.div``

const VoteTypeHeader = styled.label<{ kind: string }>`
  display: grid;
  align-items: center;
  grid-template-columns: 128px 1fr auto;
  cursor: pointer;
  padding: ${spacing(1, 2)};
  text-transform: capitalize;
  h6 {
    color: ${({ kind }) => {
      switch (kind) {
        case Approve:
          return Colors.Green[500]
        case Reject:
          return Colors.Red[500]
        default:
          return Colors.Black[900]
      }
    }};
  }
`

const VoteListItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2px 0;
  padding: ${spacing(1, 2)};
`
