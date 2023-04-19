import React, { useState, useEffect, EventHandler } from 'react'

import { PageHeader } from '@/app/components/PageHeader'
import { PageLayout } from '@/app/components/PageLayout'
import { SettingsTabs } from './components/SettingsTabs'
import { EmptyPagePlaceholder } from '@/common/components/EmptyPagePlaceholder/EmptyPagePlaceholder'
import { TransactionButton } from '@/common/components/buttons/TransactionButton'

import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { MainPanel } from '@/common/components/page/PageContent'

export const EmailNotifications = () => {
  const { members, active, hasMembers } = useMyMemberships()
  // The informations related to notification setttings like EmailAddress
  //   can be in the MembershipsContext
  /*
  const { email, verified, notifyset } = active.email
 */
  ///////////////////////////////////////////////////////////////////////       mock      /////////////////
  const { email, verified, notifyset } = { email: null, verified: true, notifyset: true }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////

  const [subscribed, setSubscribed] = useState(!!email)
  const [_email, setEmail] = useState(email ?? '')

  const subscribe = () => {
    let inputstr
    !hasMembers
      ? (alert('here openModal function comes'), //here openModal function comes
        (inputstr = prompt('Email notifications verify modal', 'default@email.com')), //here email verify modal comes
        setEmail(inputstr ?? ''))
      : ((inputstr = prompt('Email notifications verify modal', 'default@email.com')), //here email verify modal comes
        setEmail(inputstr ?? ''))
    setSubscribed(true)
  }
	
  return (
    <PageLayout
      header={<PageHeader title="Settings" tabs={<SettingsTabs />} />}
      main={
        !subscribed ? (
          <EmptyPagePlaceholder
            title="Subscribe to email notifications"
            copy="We use your email only to send you important notifications.
      You can customize what kind of notifications you receive anytime in settings."
            button={
              <TransactionButton style="primary" size="medium" onClick={subscribe}>
                Subscribe
              </TransactionButton>
            }
          />
        ) : (
          <MainPanel>
          </MainPanel>
        )
      }
    />
  )
}
