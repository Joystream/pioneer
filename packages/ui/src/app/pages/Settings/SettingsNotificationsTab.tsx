import React, { FC, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { ButtonGhost, ButtonPrimary } from '@/common/components/buttons'
import { EmptyPagePlaceholder } from '@/common/components/EmptyPagePlaceholder/EmptyPagePlaceholder'
import { InputComponent, InputText, ToggleCheckbox } from '@/common/components/forms'
import { ColumnGapBlock, MainPanel, RowGapBlock } from '@/common/components/page/PageContent'
import { SuccessModal } from '@/common/components/SuccessModal'
import { TextBig, TextMedium } from '@/common/components/typography'
import { Warning } from '@/common/components/Warning'
import { useModal } from '@/common/hooks/useModal'
import { useYupValidationResolver } from '@/common/utils/validation'
import { useNotificationSettings } from '@/memberships/hooks/useNotificationSettings'
import { EmailSubscriptionModalCall } from '@/memberships/modals/EmailSubscriptionModal'
import {
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
  const {
    activeMemberExistBackendData,
    activeMemberExistBackendError,
    activeMemberExistBackendLoading,
    activeMemberExistBackendRefetch,
    backendClient,
    activeMemberSettings,
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

  const { data: meData, refetch: meRefetch } = useGetBackendMeQuery({
    client: backendClient,
    onCompleted: (data) => {
      reset({
        email: data.me?.unverifiedEmail ?? data.me?.email ?? '',
        receiveEmailNotifications: data.me?.receiveEmails ?? true,
      })
    },
    skip: !activeMemberSettings?.accessToken,
  })

  const [sendUpdateMemberMutation] = useUpdateBackendMemberMutation({
    client: backendClient,
  })
  const [newLinkGenerated, setNewLinkGenerated] = useState(false)
  const [showSettingsUpdatedModal, setShowSettingsUpdatedModal] = useState(false)

  const handleSubscribeClick = () => {
    // TODO: this will show member select if there is no active membership.
    // However, if the user selects a membership that's already registered, the subscription modal will still show.
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
    await sendUpdateMemberMutation({
      variables: {
        email: dirtyFields.email ? data.email : undefined,
        receiveEmails: dirtyFields.receiveEmailNotifications ? data.receiveEmailNotifications : undefined,
      },
    })
    setShowSettingsUpdatedModal(true)
  })

  const loadingContent = 'Loading notification settings'
  const errorContent = 'Error loading notification settings'
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
  const mainContent = (
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
            />
          </ColumnGapBlock>
          <InputComponent inputSize="l" name="email" label="Email">
            <InputText name="email" placeholder="Email for notifications here" />
          </InputComponent>
        </FormProvider>
        {!meData?.me?.unverifiedEmail ? (
          <Warning
            title="Customizing notifications is not available yet"
            content="We are working on delivering the solution for customizing your notifications. For now you will receive a default set of notifications."
            isYellow
            icon="info"
            isClosable={false}
          />
        ) : (
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
        )}
      </RowGapBlock>
    </MainPanel>
  )

  return (
    <>
      {showSettingsUpdatedModal && (
        <SuccessModal text="Settings saved successfully" onClose={() => setShowSettingsUpdatedModal(false)} />
      )}
      <SettingsLayout
        saveButton={{
          isVisible: true,
          disabled: !isDirty,
          onClick: handleSaveChangesClick,
        }}
      >
        {activeMemberExistBackendLoading
          ? loadingContent
          : activeMemberExistBackendError
          ? errorContent
          : activeMemberExistBackendData?.memberExist === true
          ? mainContent
          : unregisteredContent}
      </SettingsLayout>
    </>
  )
}
