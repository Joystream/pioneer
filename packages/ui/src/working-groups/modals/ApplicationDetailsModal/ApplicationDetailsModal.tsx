import React from 'react'

import { SidePane, SidePaneBody, SidePaneGlass } from '../../../common/components/SidePane'
import { useModal } from '../../../common/hooks/useModal'
import { EmptyBody } from '../../../memberships/components/MemberProfile'

export const ApplicationDetailsModal = React.memo(() => {
  const { hideModal } = useModal()

  const onBackgroundClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      hideModal()
    }
  }

  return (
    <SidePaneGlass onClick={onBackgroundClick}>
      <SidePane>
        <SidePaneBody>
          <EmptyBody>Loading...</EmptyBody>
        </SidePaneBody>
      </SidePane>
    </SidePaneGlass>
  )
})
