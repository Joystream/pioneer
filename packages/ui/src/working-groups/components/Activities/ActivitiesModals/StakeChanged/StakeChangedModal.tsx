import React from 'react'

import { CloseButton } from '@/common/components/buttons'
import {
  SidePane,
  SidePaneBody,
  SidePaneGlass,
  SidePaneHeader,
  SidePanelTop,
  SidePaneTitle,
} from '@/common/components/SidePane'
import { useModal } from '@/common/hooks/useModal'

import { StakeChangedModalCall } from './types'

export const StakeChangedModal = React.memo(() => {
  const { hideModal } = useModal<StakeChangedModalCall>()

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
            <SidePaneTitle>Your stake has been changed</SidePaneTitle>
            <CloseButton onClick={hideModal} />
          </SidePanelTop>
        </SidePaneHeader>
        <SidePaneBody>{/* <MemberDetails member={member} /> */}</SidePaneBody>
      </SidePane>
    </SidePaneGlass>
  )
})
