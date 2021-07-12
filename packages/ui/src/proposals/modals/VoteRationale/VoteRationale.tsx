import React from 'react'
import styled from 'styled-components'

import { ButtonGhost, CloseButton } from '@/common/components/buttons'
import { LinkIcon } from '@/common/components/icons/LinkIcon'
import { Loading } from '@/common/components/Loading'
import {
  SidePane,
  SidePaneBody,
  SidePaneGlass,
  SidePaneHeader,
  SidePanelTop,
  SidePaneTitle,
  SidePaneTopButtonsGroup,
} from '@/common/components/SidePane'
import { useModal } from '@/common/hooks/useModal'

export const VoteRationale = React.memo(() => {
  const { hideModal } = useModal()

  const onBackgroundClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      hideModal()
    }
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
          <Loading />
        </SidePaneBody>
      </SidePane>
    </SidePaneGlass>
  )
})

export const EmptyBody = styled.div`
  padding: 24px;
`
