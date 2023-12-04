import React, { FC, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import styled from 'styled-components'
import * as Yup from 'yup'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { ButtonGhost, ButtonPrimary } from '@/common/components/buttons'
import { EmptyPagePlaceholder } from '@/common/components/EmptyPagePlaceholder/EmptyPagePlaceholder'
import { InputComponent, InputText, ToggleCheckbox } from '@/common/components/forms'
import { Loading } from '@/common/components/Loading'
import { ColumnGapBlock, MainPanel, RowGapBlock } from '@/common/components/page/PageContent'
import { SuccessModal } from '@/common/components/SuccessModal'
import { TextBig, TextMedium } from '@/common/components/typography'
import { Warning } from '@/common/components/Warning'
import { useModal } from '@/common/hooks/useModal'
import { error } from '@/common/logger'
import { useYupValidationResolver } from '@/common/utils/validation'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { useNotificationSettings } from '@/memberships/hooks/useNotificationSettings'
import { BackendErrorModal } from '@/memberships/modals/BackendErrorModal'
import { EmailSubscriptionModalCall } from '@/memberships/modals/EmailSubscriptionModal'
import { getBackendAuthSignature } from '@/memberships/model/backendAuth'
import {
  useBackendSigninMutation,
  useGetBackendMeQuery,
  useUpdateBackendMemberMutation,
} from '@/memberships/queries/__generated__/backend.generated'

import { SettingsLayout } from './SettingsLayout'

type SettingsNotificationsTabFormData = {
  email: string
  receiveEmailNotifications: boolean
}

const SettingsNotificationsTabFormSchema = Yup.object().shape({
  email: Yup.string().email().required('This field is required.'),
  receiveEmailNotifications: Yup.boolean(),
})

export const SettingsNotificationsTab: FC = () => {
  const { active: activeMember } = useMyMemberships()
  const { wallet } = useMyAccounts()

  const {
    activeMemberExistBackendData,
    activeMemberExistBackendError,
    activeMemberExistBackendLoading,
    activeMemberExistBackendRefetch,
    backendClient,
    authToken,
    setMemberSettings,
  } = useNotificationSettings()
  const { showModal } = useModal()

  const form = useForm<SettingsNotificationsTabFormData>({
    defaultValues: {
      email: '',
      receiveEmailNotifications: true,
    },
    resolver: useYupValidationResolver<SettingsNotificationsTabFormData>(SettingsNotificationsTabFormSchema),
  })
  const {
    handleSubmit,
    reset,
    formState: { isDirty, dirtyFields },
    watch,
  } = form

  const {
    data: meData,
    refetch: meRefetch,
    error: meError,
  } = useGetBackendMeQuery({
    client: backendClient,
    onCompleted: (data) => {
      reset({
        email: data.me?.unverifiedEmail ?? data.me?.email ?? '',
        receiveEmailNotifications: data.me?.receiveEmails ?? true,
      })
    },
    skip: !authToken,
  })

  const isRegistered = activeMemberExistBackendData?.memberExist ?? false

  const isUnauthorized = (!!activeMember && !authToken) || meError?.message.includes('Unauthorized')

  const [sendUpdateMemberMutation, { error: mutationError }] = useUpdateBackendMemberMutation({
    client: backendClient,
  })
  const [sendSigninMutation] = useBackendSigninMutation({
    client: backendClient,
  })
  const [newLinkGenerated, setNewLinkGenerated] = useState(false)
  const [showSettingsUpdatedModal, setShowSettingsUpdatedModal] = useState(false)
  const [reauthorizationStatus, setReauthorizationStatus] = useState<null | 'signature' | 'loading' | 'error'>(null)

  const handleSubscribeClick = () => {
    showModal<EmailSubscriptionModalCall>({
      modal: 'EmailSubscriptionModal',
      data: {
        onSubscribe: () => {
          meRefetch()
          activeMemberExistBackendRefetch()
        },
      },
    })
  }

  const handleGenerateNewLinkClick = () => {
    sendUpdateMemberMutation({
      variables: {
        email: meData?.me?.unverifiedEmail ?? meData?.me?.email ?? '',
      },
    })
    setNewLinkGenerated(true)
  }

  const handleSaveChangesClick = handleSubmit(async (data) => {
    try {
      await sendUpdateMemberMutation({
        variables: {
          email: dirtyFields.email ? data.email : undefined,
          receiveEmails: dirtyFields.receiveEmailNotifications ? data.receiveEmailNotifications : undefined,
        },
      })
    } catch (e) {
      error(e)
    }

    setShowSettingsUpdatedModal(true)
  })

  const handleAuthorizeAgainClick = async () => {
    if (!activeMember || !wallet) {
      error('No active member or wallet')
      setReauthorizationStatus('error')
      return
    }

    try {
      setReauthorizationStatus('signature')
      const { signature, timestamp } = await getBackendAuthSignature(activeMember, wallet)
      setReauthorizationStatus('loading')
      const { data } = await sendSigninMutation({
        variables: {
          memberId: parseInt(activeMember.id),
          signature,
          timestamp: timestamp.toString(),
        },
      })
      if (!data?.signin) {
        error('Missing signin result')
        setReauthorizationStatus('error')
        return
      }
      setMemberSettings(activeMember.id, { accessToken: data.signin })
      await meRefetch()
      setReauthorizationStatus(null)
    } catch (e) {
      error('Failed to reauthorize with backend', e)
      setReauthorizationStatus('error')
    }
  }

  const loadingContent = <Loading text="Loading notification settings" />
  const errorContent = (
    <Warning
      title="Failed to load notifications settings"
      content="Something went wrong. Please try again later."
      isClosable={false}
    />
  )
  const unregisteredContent = (
    <EmptyPagePlaceholder
      title="Subscribe to email notifications"
      copy="We use your email only to send you important notifications.
You can customize what kind of notifications you receive anytime in settings."
      button={
        <ButtonPrimary size="medium" onClick={handleSubscribeClick}>
          Subscribe
        </ButtonPrimary>
      }
    />
  )

  const renderMainContentWarning = () => {
    if (meData?.me?.unverifiedEmail) {
      return (
        <Warning
          title="Verify your email account"
          content="We've sent you an email with instructions on how to confirm your email address. If you don't see the message, please check the spam folder. If you still cannot find it, you can request a new email with the button below."
          additionalContent={
            <ButtonGhost size="small" onClick={handleGenerateNewLinkClick} disabled={newLinkGenerated}>
              {newLinkGenerated ? 'Link generated' : 'Generate new link'}
            </ButtonGhost>
          }
          icon="alert"
          isClosable={false}
        />
      )
    }

    if (isUnauthorized) {
      return (
        <Warning
          title="Authentication token expired"
          content="You have to generate a new signature to be able to update your notification settings."
          isClosable={false}
          additionalContent={
            <UnauthorizedWarningAdditionalContent>
              <ButtonGhost
                size="small"
                onClick={handleAuthorizeAgainClick}
                disabled={!!reauthorizationStatus && reauthorizationStatus !== 'error'}
              >
                Authorize again
              </ButtonGhost>
              <TextMedium>
                {reauthorizationStatus === 'signature' && 'Waiting for your signature...'}
                {reauthorizationStatus === 'loading' && 'Please wait...'}
                {reauthorizationStatus === 'error' && 'Unexpected error'}
              </TextMedium>
            </UnauthorizedWarningAdditionalContent>
          }
        />
      )
    }

    return (
      <Warning
        title="Customizing notifications is not available yet"
        content="We are working on delivering the solution for customizing your notifications. For now you will receive a default set of notifications."
        isYellow
        icon="info"
        isClosable={false}
      />
    )
  }

  const mainContent = () => (
    <MainPanel>
      <RowGapBlock gap={16}>
        <FormProvider {...form}>
          <ColumnGapBlock gap={12}>
            <TextBig value bold>
              I want to be notified by email:
            </TextBig>

            <ToggleCheckbox
              name="receiveEmailNotifications"
              trueLabel={
                watch('receiveEmailNotifications') ? <TextMedium bold>Yes</TextMedium> : <TextMedium>Yes</TextMedium>
              }
              falseLabel={
                watch('receiveEmailNotifications') ? <TextMedium>No</TextMedium> : <TextMedium bold>No</TextMedium>
              }
              disabled={isUnauthorized}
            />
          </ColumnGapBlock>
          <InputComponent inputSize="l" name="email" label="Email">
            <InputText name="email" placeholder="Email for notifications here" disabled={isUnauthorized} />
          </InputComponent>
        </FormProvider>
        {renderMainContentWarning()}
      </RowGapBlock>
    </MainPanel>
  )

  const renderContent = () => {
    if (activeMemberExistBackendLoading) {
      return loadingContent
    }

    if (activeMemberExistBackendError || (meError && !isUnauthorized)) {
      return errorContent
    }

    if (isRegistered) {
      return mainContent()
    }

    return unregisteredContent
  }

  return (
    <>
      {showSettingsUpdatedModal &&
        (mutationError ? (
          <BackendErrorModal onClose={() => setShowSettingsUpdatedModal(false)} />
        ) : (
          <SuccessModal text="Settings saved successfully" onClose={() => setShowSettingsUpdatedModal(false)} />
        ))}
      <SettingsLayout
        fullWidth={!isRegistered}
        saveButton={{
          isVisible: true,
          disabled: !isDirty,
          onClick: handleSaveChangesClick,
        }}
      >
        {renderContent()}
      </SettingsLayout>
    </>
  )
}

const UnauthorizedWarningAdditionalContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`
