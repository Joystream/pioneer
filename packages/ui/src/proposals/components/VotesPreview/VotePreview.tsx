import React, { useMemo } from 'react'
import styled from 'styled-components'

import { ProposalVoteKind } from '@/common/api/queries'
import { ButtonGhost } from '@/common/components/buttons'
import { DropDownButton, DropDownToggle, ToggleContainer } from '@/common/components/buttons/DropDownToggle'
import { FileIcon } from '@/common/components/icons/FileIcon'
import { TextInlineMedium } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { plural } from '@/common/helpers'
import { useModal } from '@/common/hooks/useModal'
import { useToggle } from '@/common/hooks/useToggle'
import { isDefined } from '@/common/utils'
import { MemberInfo } from '@/memberships/components'
import { Member } from '@/memberships/types'
import { VoteRationaleModalCall } from '@/proposals/modals/VoteRationale/types'
import { ProposalVote } from '@/proposals/types'

const { Approve, Reject, Slash, Abstain } = ProposalVoteKind

interface VotePreviewProps {
  kind: string
  count?: number
  votes?: ProposalVote[]
  members?: Member[]
}

export const VotePreview = ({ kind, count, votes, members }: VotePreviewProps) => {
  const [isOpen, toggle] = useToggle()
  const { showModal } = useModal()

  const votesToShow = useMemo(() => {
    switch (true) {
      case !!votes?.length:
        return votes?.map(({ voter, id }, index) => (
          <VoteListItem key={index}>
            <MemberInfo key={index} member={voter} memberSize="s" />

            <ButtonGhost
              size="small"
              onClick={() => showModal<VoteRationaleModalCall>({ modal: 'VoteRationaleModal', data: { id } })}
            >
              <FileIcon />
            </ButtonGhost>
          </VoteListItem>
        ))
      case !!members?.length:
        return members?.map((member, index) => (
          <VoteListItem key={index}>
            <MemberInfo key={index} member={member} memberSize="s" />
          </VoteListItem>
        ))
      default:
        return null
    }
  }, [members?.length, votes?.length])

  return (
    <VoteType>
      <VoteTypeHeader kind={kind}>
        <h6>{KindToTitle.get(kind) ?? kind}</h6>
        <div>
          <TextInlineMedium bold>{isDefined(count) ? count : '-'}</TextInlineMedium>{' '}
          <TextInlineMedium lighter>vote{plural(count)}</TextInlineMedium>
        </div>
        {votesToShow && <DropDownButton isDropped={isOpen} onClick={toggle} />}
      </VoteTypeHeader>

      <DropDownToggle isDropped={isOpen}>{votesToShow}</DropDownToggle>
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
    row-gap: 4px;
  }
`

const VoteTypeHeader = styled.label<{ kind: string }>`
  display: grid;
  align-items: center;
  grid-template-columns: 128px 1fr auto;
  cursor: pointer;
  padding: 4px 4px 4px 8px;
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
  padding: 8px 16px;
`
