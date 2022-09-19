import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { CloseButton } from '@/common/components/buttons'
import { Loading } from '@/common/components/Loading'
import {
  SidePane,
  SidePaneBody,
  SidePaneGlass,
  SidePaneHeader,
  SidePanelTop,
  SidePaneTable,
  SidePaneTitle,
} from '@/common/components/SidePane'
import { Tabs } from '@/common/components/Tabs'
import { useEscape } from '@/common/hooks/useEscape'
import { useModal } from '@/common/hooks/useModal'
import { useIsMyMembership } from '@/memberships/hooks/useIsMyMembership'
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
  const history = useHistory()
  const isMyMembership = useIsMyMembership(application?.applicant?.id || '')

  const onBackgroundClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      hideModal()
    }
  }

  useEscape(() => hideModal())

  const [currentTab, setCurrentTab] = useState<Tab>('GENERAL')

  useEffect(
    () =>
      history.listen((location) => {
        if (currentTab === 'GENERAL' && location.pathname.startsWith('/working-groups')) {
          hideModal()
        }
      }),
    [currentTab]
  )

  return (
    <SidePaneGlass onClick={onBackgroundClick}>
      <SidePane topSize="s">
        <SidePaneHeader>
          <SidePanelTop>
            <SidePaneTitle>{isMyMembership ? 'My Application' : 'Application'}</SidePaneTitle>
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
          {isLoading && (
            <SidePaneTable>
              <Loading />
            </SidePaneTable>
          )}
          {!isLoading && application && currentTab === 'GENERAL' && <GeneralDetails application={application} />}
          {!isLoading && application && currentTab === 'FORM' && <FormDetails applicationId={application.id} />}
        </SidePaneBody>
      </SidePane>
    </SidePaneGlass>
  )
})
