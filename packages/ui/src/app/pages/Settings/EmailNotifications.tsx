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
import { useModal } from '@/common/hooks/useModal'

export const EmailNotifications = () => {
  const [state, setState] = useState({ email: '', verified: false, notifyset: false }) //mocking states

  const { hasMembers } = useMyMemberships()

  const [subscribed, setSubscribed] = useState(!!state.email)
  const [_email, setEmail] = useState(state.email)
  const initState = !state.email ? 'active' : state.verified ? 'verified' : 'unverified'
  const [emailState, changeEmailState] = useState<InputEmailState>(initState)
  const [notifiedCheck, setNotifiedCheck] = useToggle(state.notifyset)
  const { showModal } = useModal()

  const subscribe = () => {
    if (!hasMembers)
      try {
        showModal({ modal: 'memberModal' })
      } catch (err) {
        if (!err) {
          setEmail(prompt('Email notifications verify modal', 'default@email.com') ?? '')
          setSubscribed(true)
        }
      }
    else {
      setEmail(prompt('Email notifications verify modal', 'default@email.com') ?? '')
      setSubscribed(true)
    }
  }

  const inputEmailChange = (e: any) => {
    changeEmailState(e.target.value == state.email ? initState : 'active')
    setEmail(e.target.value)
  }

  const saveChanges = () => {
    setState((state) => ({ ...state, email: _email, notifyset: notifiedCheck })) //save settings
  }

  return (
    <PageLayout
      header={
        <PageHeader
          title="Settings"
          tabs={<SettingsTabs />}
          buttons={<SaveChangesButton disabled={!subscribed || !_email || !notifiedCheck} saveChanges={saveChanges} />}
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
