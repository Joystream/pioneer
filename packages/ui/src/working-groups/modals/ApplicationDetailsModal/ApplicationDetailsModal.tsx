import React from 'react'

import { CloseButton } from '../../../common/components/buttons'
import {
  SidePane,
  SidePaneBody,
  SidePaneGlass,
  SidePaneHeader,
  SidePanelTop,
  SidePaneTitle,
} from '../../../common/components/SidePane'
import { Tabs } from '../../../common/components/Tabs'
import { useModal } from '../../../common/hooks/useModal'

import { GeneralDetails } from './GeneralDetails'
import { ApplicationDetailsModalCall } from './types'

export const ApplicationDetailsModal = React.memo(() => {
  const {
    hideModal,
    modalData: { application },
  } = useModal<ApplicationDetailsModalCall>()

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
            <SidePaneTitle>My Application</SidePaneTitle>
            <CloseButton onClick={hideModal} />
          </SidePanelTop>
          <Tabs
            tabs={[
              { title: 'General details', active: true, onClick: () => null },
              { title: 'Form', active: false, onClick: () => null },
            ]}
            tabsSize="xs"
          />
        </SidePaneHeader>
        <SidePaneBody>
          <GeneralDetails application={application} />
        </SidePaneBody>
      </SidePane>
    </SidePaneGlass>
  )
})
