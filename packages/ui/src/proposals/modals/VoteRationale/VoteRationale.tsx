import React from 'react'
import styled from 'styled-components'

import { BlockTime } from '@/common/components/BlockTime'
import { ButtonGhost, CloseButton } from '@/common/components/buttons'
import { LinkIcon } from '@/common/components/icons/LinkIcon'
import { Loading } from '@/common/components/Loading'
import { MarkdownPreview } from '@/common/components/MarkdownPreview'
import {
  SidePane,
  SidePaneBody,
  SidePaneColumn,
  SidePaneGlass,
  SidePaneHeader,
  SidePaneLabel,
  SidePanelTop,
  SidePaneRow,
  SidePaneTable,
  SidePaneText,
  SidePaneTitle,
  SidePaneTopButtonsGroup,
} from '@/common/components/SidePane'
import { useCopyToClipboard } from '@/common/hooks/useCopyToClipboard'
import { useModal } from '@/common/hooks/useModal'
import { MemberInfo } from '@/memberships/components'
import { ProposalsRoutes } from '@/proposals/constants/routes'
import { useProposalVote } from '@/proposals/hooks/useProposalVote'
import { VoteRationaleModalCall } from '@/proposals/modals/VoteRationale/types'

export const VoteRationale = React.memo(() => {
  const { hideModal, modalData } = useModal<VoteRationaleModalCall>()
  const { copyValue } = useCopyToClipboard()
  const voteId = modalData.id
  const { vote, isLoading } = useProposalVote(voteId)

  const onBackgroundClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      hideModal()
    }
  }

  const getVoteLink = () =>
    copyValue(`${window.location.origin}/#${ProposalsRoutes.preview}/${vote?.proposalId}?showVote=${voteId}`)

  if (isLoading || !vote) {
    return (
      <EmptyBody>
        <Loading />
      </EmptyBody>
    )
  }

  return (
    <SidePaneGlass onClick={onBackgroundClick}>
      <SidePane>
        <SidePaneHeader>
          <SidePanelTop>
            <SidePaneTitle>Voting result</SidePaneTitle>
            <SidePaneTopButtonsGroup>
              <ButtonGhost size="small" onClick={getVoteLink}>
                <LinkIcon />
              </ButtonGhost>
            </SidePaneTopButtonsGroup>
            <CloseButton onClick={hideModal} />
          </SidePanelTop>
          <MemberInfo member={vote.voter} memberSize="l" size="l" />
        </SidePaneHeader>
        <SidePaneBody>
          <SidePaneTable>
            <SidePaneRow>
              <SidePaneLabel text="Status" />
              <SidePaneText>{vote?.voteKind}</SidePaneText>
            </SidePaneRow>
            <SidePaneRow>
              <SidePaneLabel text="Voted on" />
              <BlockTime block={vote.block} />
            </SidePaneRow>
            <SidePaneColumn>
              <SidePaneLabel text="Rationale" />
              <MarkdownPreview markdown={vote.rationale} size="s" />
            </SidePaneColumn>
          </SidePaneTable>
        </SidePaneBody>
      </SidePane>
    </SidePaneGlass>
  )
})

export const EmptyBody = styled.div`
  padding: 24px;
`
