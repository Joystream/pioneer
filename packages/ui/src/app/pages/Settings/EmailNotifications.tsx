import React, { useState, useEffect, EventHandler } from 'react'

import { PageHeader } from '@/app/components/PageHeader'
import { PageLayout } from '@/app/components/PageLayout'
import { SettingsTabs } from './components/SettingsTabs'
import { EmptyPagePlaceholder } from '@/common/components/EmptyPagePlaceholder/EmptyPagePlaceholder'
import { TransactionButton } from '@/common/components/buttons/TransactionButton'

import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { ColumnGapBlock, MainPanel, RowGapBlock } from '@/common/components/page/PageContent'
import { InputComponent, InputText, ToggleCheckbox } from '@/common/components/forms'
import { TextBig, TextMedium } from '@/common/components/typography'
import { useToggle } from '@/common/hooks/useToggle'
import { InformationBanner, InputEmailState } from './components/InformationBanner'
import { SaveChangesButton } from './components/SaveChangesButton'

export const EmailNotifications = () => {
  const { email, verified, notifyset } = { email: 'test@email.com', verified: true, notifyset: true } //mocking states

  const { hasMembers } = useMyMemberships()

  const [subscribed, setSubscribed] = useState(!!email)
  const [_email, setEmail] = useState(email ?? '')
  const initState = !email ? 'active' : verified ? 'verified' : 'unverified'
  const [emailState, changeEmailState] = useState<InputEmailState>(initState)
  const [notifiedCheck, setNotifiedCheck] = useToggle(notifyset)
  const [saveBtnEnabled, setSaveBtnEnabled] = useState(true)

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

  const inputEmailChange = (e: any) => {
    changeEmailState(e.target.value == email ? initState : 'active')
    setEmail(e.target.value)
  }

  useEffect(() => {
    if (!notifiedCheck) {
      setSaveBtnEnabled(true)
      return
    }
    setSaveBtnEnabled(!!_email ?? false)
  })

  return (
    <PageLayout
      header={
        <PageHeader
          title="Settings"
          tabs={<SettingsTabs />}
          buttons={<SaveChangesButton disabled={!saveBtnEnabled} />}
        />
      }
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
            <RowGapBlock gap={16}>
              <ColumnGapBlock gap={12}>
                <TextBig value bold>
                  I want to be notified by email:
                </TextBig>
                <ToggleCheckbox
                  name="Notification setting checktoggle"
                  trueLabel={notifiedCheck ? <TextMedium bold>Yes</TextMedium> : <TextMedium>Yes</TextMedium>}
                  falseLabel={notifiedCheck ? <TextMedium>No</TextMedium> : <TextMedium bold>No</TextMedium>}
                  checked={notifiedCheck}
                  onChange={setNotifiedCheck}
                />
              </ColumnGapBlock>
              <InputComponent inputSize="l" label="Email">
                <InputText value={_email} placeholder="Add email for notifications here" onChange={inputEmailChange} />
              </InputComponent>
              <InformationBanner emailState={emailState} />
            </RowGapBlock>
          </MainPanel>
        )
      }
    />
  )
}
