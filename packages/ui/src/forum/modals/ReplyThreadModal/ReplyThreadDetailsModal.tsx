import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import * as Yup from 'yup'

import { ButtonPrimary, ButtonsGroup } from '@/common/components/buttons'
import { CKEditor } from '@/common/components/CKEditor'
import { Checkbox, InputComponent, InputText } from '@/common/components/forms'
import { Arrow } from '@/common/components/icons'
import {
  ModalFooter,
  ModalHeader,
  ScrolledModal,
  ScrolledModalBody,
  ScrolledModalContainer,
} from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { useModal } from '@/common/hooks/useModal'
import { enhancedGetErrorMessage, enhancedHasError } from '@/common/utils/validation'
import { ForumBreadcrumbsList } from '@/forum/components/ForumBreadcrumbsList'
import { ForumPostAuthor } from '@/forum/components/PostList/PostListItem'
import { PreviewPostButton } from '@/forum/components/PreviewPostButton'
import { ReplyThreadEvent } from '@/forum/modals/ReplyThreadModal/machine'
import { CategoryBreadcrumb, ForumPost } from '@/forum/types'
import { MemberInfo } from '@/memberships/components'
import { Member } from '@/memberships/types'

interface Props {
  breadcrumbs?: CategoryBreadcrumb[]
  author: Member
  post: ForumPost
  send: (event: ReplyThreadEvent['type']) => void
}

export const ReplyThreadSchema = Yup.object().shape({
  editable: Yup.bool().default(false),
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

export const ReplyThreadDetailsModal = ({ breadcrumbs, author, post, send }: Props) => {
  const { hideModal } = useModal()
  const { formState, getValues } = useFormContext()
  const [editable, setEditable] = useState(false)
  // console.log("post---", post);
  const hasError = enhancedHasError(formState.errors)
  const getErrorMessage = enhancedGetErrorMessage(formState.errors)

  return (
    <>
      <ScrolledModal onClose={hideModal} modalSize="l">
        <ModalHeader title="Reply" onClick={hideModal} />
        <ScrolledModalBody>
          <ScrolledModalContainer>
            <RowGapBlock gap={24}>
              <ForumPostAuthor>{post?.author && <MemberInfo size="s" member={post?.author} />}</ForumPostAuthor>
              <TextMedium light italic>
                {post?.text}
              </TextMedium>
              <RowGapBlock gap={16}>
                {/*     <InputComponent
                  label="Topic of the thread"
                  id="field-topic"
                  validation={hasError('topic') ? 'invalid' : undefined}
                  message={hasError('topic') ? getErrorMessage('topic') : ''}
                >
                  <InputText id="field-topic" name="topic" />
                </InputComponent> */}
                <InputComponent
                  label="Description"
                  required
                  inputSize="auto"
                  id="field-description"
                  validation={hasError('description') ? 'invalid' : undefined}
                  message={hasError('description') ? getErrorMessage('description') : ''}
                >
                  <CKEditor id="field-description" name="description" minRows={10} />
                </InputComponent>
              </RowGapBlock>
            </RowGapBlock>
          </ScrolledModalContainer>
        </ScrolledModalBody>
        <ModalFooter>
          <ButtonsGroup align="left">
            <Checkbox
              // label="Keep Editable"
              id="keep-editable"
              isRequired={false}
              isChecked={editable}
              onChange={() => setEditable(!editable)}
            />{' '}
            Keep Editable
          </ButtonsGroup>
          {/* <InputComponent
            label="Keep Editable"
            id="keep-editable"
            type={"checkbox"}
            validation={hasError('editable') ? 'invalid' : undefined}
            message={hasError('editable') ? getErrorMessage('editable') : ''}>
            <InputText id="keep-editable" name="editable" />
          </InputComponent> */}
          <ButtonsGroup align="right">
            <PreviewPostButton author={author} postText={getValues().description} />
            <ButtonPrimary onClick={() => send('NEXT')} size="medium" disabled={!formState.isValid}>
              Post a Reply
              <Arrow direction="right" />
            </ButtonPrimary>
          </ButtonsGroup>
        </ModalFooter>
      </ScrolledModal>
    </>
  )
}
