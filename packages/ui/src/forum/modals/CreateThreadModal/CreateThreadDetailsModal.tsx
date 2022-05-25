import React, { useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { ButtonPrimary, ButtonsGroup } from '@/common/components/buttons'
import { CKEditor } from '@/common/components/CKEditor'
import { InputComponent, InputText } from '@/common/components/forms'
import { Arrow } from '@/common/components/icons'
import {
  ScrolledModal,
  ScrolledModalBody,
  ScrolledModalContainer,
  ModalFooter,
  ModalHeader,
} from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { useModal } from '@/common/hooks/useModal'
import { enhancedGetErrorMessage, enhancedHasError, useYupValidationResolver } from '@/common/utils/validation'
import { ForumBreadcrumbsList } from '@/forum/components/ForumBreadcrumbsList'
import { PreviewPostButton } from '@/forum/components/PreviewPostButton'
import { CategoryBreadcrumb } from '@/forum/types'
import { Member } from '@/memberships/types'

interface Props {
  topic: string
  description: string
  setTopic: (t: string) => void
  setDescription: (d: string) => void
  onSubmit: (params: ThreadFormFields) => void
  breadcrumbs?: CategoryBreadcrumb[]
  author: Member
}

const CreateThreadSchema = Yup.object().shape({
  topic: Yup.string().required('This field is required'),
  description: Yup.string().required('This field is required'),
})

export interface ThreadFormFields {
  topic: string
  description: string
}

const formDefaultValues = {
  topic: '',
  description: '',
}

export const CreateThreadDetailsModal = ({ description, onSubmit, breadcrumbs, author }: Props) => {
  const { hideModal } = useModal()

  const form = useForm<ThreadFormFields>({
    resolver: useYupValidationResolver(CreateThreadSchema),
    mode: 'onChange',
    defaultValues: formDefaultValues,
  })

  const hasError = enhancedHasError(form.formState.errors)
  const getErrorMessage = enhancedGetErrorMessage(form.formState.errors)
  const onCreate = () => onSubmit(form.getValues())

  return (
    <>
      <ScrolledModal onClose={hideModal} modalSize="l">
        <ModalHeader title="Create a thread" onClick={hideModal} />
        <ScrolledModalBody>
          <FormProvider {...form}>
            <ScrolledModalContainer>
              <RowGapBlock gap={24}>
                <ForumBreadcrumbsList
                  categoryBreadcrumbs={breadcrumbs ?? []}
                  threadBreadcrumb={{ id: '-1', title: 'New Thread' }}
                  nonInteractive
                />
                <RowGapBlock gap={16}>
                  <TextMedium light>Please make sure your title will be clear for users</TextMedium>
                  <InputComponent
                    label="Topic of the thread"
                    id="field-topic"
                    validation={hasError('topic') ? 'invalid' : undefined}
                    message={hasError('topic') ? getErrorMessage('topic') : ''}
                  >
                    <InputText id="field-topic" name="topic" />
                  </InputComponent>
                  <InputComponent
                    label="Description"
                    required
                    inputSize="auto"
                    id="field-description"
                    validation={hasError('description') ? 'invalid' : undefined}
                    message={hasError('description') ? getErrorMessage('description') : ''}
                  >
                    <CKEditor id="field-description" name="description" />
                  </InputComponent>
                </RowGapBlock>
              </RowGapBlock>
            </ScrolledModalContainer>
          </FormProvider>
        </ScrolledModalBody>
        <ModalFooter>
          <ButtonsGroup align="right">
            <PreviewPostButton author={author} postText={description} />
            <ButtonPrimary onClick={onCreate} size="medium" disabled={!form.formState.isValid}>
              Next step
              <Arrow direction="right" />
            </ButtonPrimary>
          </ButtonsGroup>
        </ModalFooter>
      </ScrolledModal>
    </>
  )
}
