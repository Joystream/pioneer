import React from 'react'
import { useFormContext } from 'react-hook-form'
import * as Yup from 'yup'

import { CKEditor } from '@/common/components/CKEditor'
import { InputComponent, InputText } from '@/common/components/forms'
import {
  ModalHeader,
  ModalTransactionFooter,
  ScrolledModal,
  ScrolledModalBody,
  ScrolledModalContainer,
} from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { useModal } from '@/common/hooks/useModal'
import { enhancedGetErrorMessage, enhancedHasError } from '@/common/utils/validation'
import { ForumBreadcrumbsList } from '@/forum/components/ForumBreadcrumbsList'
import { PreviewPostButton } from '@/forum/components/PreviewPostButton'
import { CreateThreadEvent } from '@/forum/modals/CreateThreadModal/machine'
import { CategoryBreadcrumb } from '@/forum/types'
import { Member } from '@/memberships/types'

interface Props {
  breadcrumbs?: CategoryBreadcrumb[]
  author: Member
  send: (event: CreateThreadEvent['type']) => void
}

export const CreateThreadSchema = Yup.object().shape({
  topic: Yup.string().required('This field is required'),
  description: Yup.string().required('This field is required'),
})

export interface ThreadFormFields {
  topic: string
  description: string
}

export const formDefaultValues = {
  topic: '',
  description: '',
}

export const CreateThreadDetailsModal = ({ breadcrumbs, author, send }: Props) => {
  const { hideModal } = useModal()
  const { formState, getValues } = useFormContext()

  const hasError = enhancedHasError(formState.errors)
  const getErrorMessage = enhancedGetErrorMessage(formState.errors)

  return (
    <>
      <ScrolledModal onClose={hideModal} modalSize="l">
        <ModalHeader title="Create a thread" onClick={hideModal} />
        <ScrolledModalBody>
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
        </ScrolledModalBody>
        <ModalTransactionFooter
          extraButtons={<PreviewPostButton author={author} postText={getValues().description} />}
          next={{ disabled: !formState.isValid, label: 'Next step', onClick: () => send('NEXT') }}
        />
      </ScrolledModal>
    </>
  )
}
