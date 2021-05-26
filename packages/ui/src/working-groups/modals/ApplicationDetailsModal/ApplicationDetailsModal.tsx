import React, { useState } from 'react'

import { CloseButton } from '@/common/components/buttons'
import { Loading } from '@/common/components/Loading'
import {
  SidePane,
  SidePaneBody,
  SidePaneGlass,
  SidePaneHeader,
  SidePanelTop,
  SidePaneTitle,
} from '@/common/components/SidePane'
import { Tabs } from '@/common/components/Tabs'
import { useModal } from '@/common/hooks/useModal'
import { useApplication } from '@/working-groups/hooks/useApplication'

import { FormDetails } from './FormDetails'
import { GeneralDetails } from './GeneralDetails'
import { ApplicationDetailsModalCall } from './types'

type Tab = 'GENERAL' | 'FORM'

export const ApplicationDetailsModal = React.memo(() => {
  const {
    hideModal,
    modalData: { applicationId },
  } = useModal<ApplicationDetailsModalCall>()
  const { isLoading, application } = useApplication(applicationId)

  const onBackgroundClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      hideModal()
    }
  }

  const [currentTab, setCurrentTab] = useState<Tab>('GENERAL')

  return (
    <SidePaneGlass onClick={onBackgroundClick}>
      <SidePane topSize="s">
        <SidePaneHeader>
          <SidePanelTop>
            <SidePaneTitle>My Application</SidePaneTitle>
            <CloseButton onClick={hideModal} />
          </SidePanelTop>
          <Tabs
            tabs={[
              { title: 'General details', active: currentTab === 'GENERAL', onClick: () => setCurrentTab('GENERAL') },
              { title: 'Form', active: currentTab === 'FORM', onClick: () => setCurrentTab('FORM') },
            ]}
            tabsSize="xs"
          />
        </SidePaneHeader>
        <SidePaneBody>
          {isLoading && <Loading />}
          {!isLoading && application && currentTab === 'GENERAL' && <GeneralDetails application={application} />}
          {!isLoading && application && currentTab === 'FORM' && <FormDetails applicationId={application.id} />}
        </SidePaneBody>
      </SidePane>
    </SidePaneGlass>
  )
})
