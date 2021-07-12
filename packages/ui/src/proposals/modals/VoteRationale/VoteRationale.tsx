import React from 'react'
import styled from 'styled-components'

import { BlockTime } from '@/common/components/BlockTime'
import { ButtonGhost, CloseButton } from '@/common/components/buttons'
import { LinkIcon } from '@/common/components/icons/LinkIcon'
import { Loading } from '@/common/components/Loading'
import {
  SidePane,
  SidePaneBody,
  SidePaneGlass,
  SidePaneHeader,
  SidePaneLabel,
  SidePanelTop,
  SidePaneRow,
  SidePaneText,
  SidePaneTitle,
  SidePaneTopButtonsGroup,
} from '@/common/components/SidePane'
import { useModal } from '@/common/hooks/useModal'
import { useProposalVote } from '@/proposals/hooks/useProposalVote'
import { VoteRationaleModalCall } from '@/proposals/modals/VoteRationale/types'

export const VoteRationale = React.memo(() => {
  const { hideModal, modalData } = useModal<VoteRationaleModalCall>()
  const { vote, isLoading } = useProposalVote(modalData.id)

  const onBackgroundClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      hideModal()
    }
  }

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
              <ButtonGhost size="small">
                <LinkIcon />
              </ButtonGhost>
            </SidePaneTopButtonsGroup>
            <CloseButton onClick={hideModal} />
          </SidePanelTop>
        </SidePaneHeader>
        <SidePaneBody>
          <SidePaneRow>
            <SidePaneLabel text="Voted on" />
            <BlockTime block={vote.block} />
          </SidePaneRow>
          <SidePaneRow>
            <SidePaneLabel text="Status" />
            <SidePaneText>{vote?.voteKind}</SidePaneText>
          </SidePaneRow>
        </SidePaneBody>
      </SidePane>
    </SidePaneGlass>
  )
})

export const EmptyBody = styled.div`
  padding: 24px;
`
