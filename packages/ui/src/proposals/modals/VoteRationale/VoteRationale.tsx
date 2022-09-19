import React from 'react'
import styled from 'styled-components'

import { BlockTime } from '@/common/components/BlockTime'
import { CloseButton, CopyButtonTemplate } from '@/common/components/buttons'
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
import { useEscape } from '@/common/hooks/useEscape'
import { useModal } from '@/common/hooks/useModal'
import { getUrl } from '@/common/utils/getUrl'
import { MemberInfo } from '@/memberships/components'
import { ProposalsRoutes } from '@/proposals/constants/routes'
import { useProposalVote } from '@/proposals/hooks/useProposalVote'
import { VoteRationaleModalCall } from '@/proposals/modals/VoteRationale/types'

export const VoteRationale = React.memo(() => {
  const { hideModal, modalData } = useModal<VoteRationaleModalCall>()
  const voteId = modalData.id
  const { vote, isLoading } = useProposalVote(voteId)

  const onBackgroundClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      hideModal()
    }
  }

  useEscape(() => hideModal())

  const getVoteLink = getUrl({
    route: ProposalsRoutes.preview,
    params: { id: vote?.proposalId ?? 0 },
    query: { showVote: voteId },
  })

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
              <CopyButtonTemplate square size="small" textToCopy={getVoteLink} icon={<LinkIcon />} />
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
