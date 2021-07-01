import React from 'react'
import styled from 'styled-components'

import { ProposalVoteKind } from '@/common/api/queries'
import { ButtonGhost } from '@/common/components/buttons'
import { DropDownButton, DropDownToggle, ToggleContainer } from '@/common/components/buttons/DropDownToggle'
import { FileIcon } from '@/common/components/icons/FileIcon'
import { TextInlineMedium } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { plural } from '@/common/helpers'
import { useToggle } from '@/common/hooks/useToggle'
import { isDefined } from '@/common/utils'
import { spacing } from '@/common/utils/styles'
import { MemberInfo } from '@/memberships/components'
import { ProposalVote } from '@/proposals/types'

const { Approve, Reject, Slash, Abstain } = ProposalVoteKind

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
        <h6>{KindToTitle.get(kind) ?? kind}</h6>
        <div>
          <TextInlineMedium bold>{isDefined(count) ? count : '-'}</TextInlineMedium>{' '}
          <TextInlineMedium lighter>vote{plural(count)}</TextInlineMedium>
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

const KindToTitle = new Map<string, string>([
  [Approve, 'Approved'],
  [Reject, 'Rejected'],
  [Slash, 'Slashed'],
  [Abstain, 'Abstained'],
])

const VoteType = styled.div`
  ${ToggleContainer} {
    row-gap: ${spacing(1 / 2)};
  }
`

const VoteTypeHeader = styled.label<{ kind: string }>`
  display: grid;
  align-items: center;
  grid-template-columns: 128px 1fr auto;
  cursor: pointer;
  padding: ${spacing(1)};
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
  padding: ${spacing(1, 2)};
`
