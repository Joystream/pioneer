import React, { useMemo } from 'react'

import { ButtonPrimary, ButtonsGroup } from '@/common/components/buttons'
import { CKEditor } from '@/common/components/CKEditor'
import { InputComponent, InputText } from '@/common/components/forms'
import { Arrow } from '@/common/components/icons'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { useModal } from '@/common/hooks/useModal'
import { ForumBreadcrumbsList } from '@/forum/components/ForumBreadcrumbsList'
import { PreviewPostButton } from '@/forum/components/PreviewPostButton'
import { CategoryBreadcrumb } from '@/forum/types'
import { Member } from '@/memberships/types'

interface Props {
  topic: string
  description: string
  setTopic: (t: string) => void
  setDescription: (d: string) => void
  onSubmit: () => void
  breadcrumbs?: CategoryBreadcrumb[]
  author: Member
}

export const CreateThreadDetailsModal = ({
  topic,
  description,
  setTopic,
  setDescription,
  onSubmit,
  breadcrumbs,
  author,
}: Props) => {
  const isValid = useMemo(() => !!(topic && description), [topic, description])
  const { hideModal } = useModal()

  return (
    <>
      <Modal onClose={hideModal} modalSize="l">
        <ModalHeader title="Create a thread" onClick={hideModal} />
        <ModalBody>
          <RowGapBlock gap={24}>
            <ForumBreadcrumbsList
              categoryBreadcrumbs={breadcrumbs ?? []}
              threadBreadcrumb={{ id: '', title: 'New Thread' }}
              nonInteractive
            />
            <RowGapBlock gap={16}>
              <TextMedium light>Please make sure your title will be clear for users</TextMedium>
              <InputComponent label="Topic of the thread" id="field-topic">
                <InputText id="field-topic" value={topic} onChange={(event) => setTopic(event.target.value)} />
              </InputComponent>
              <InputComponent label="Description" required inputSize="auto" id="field-description">
                <CKEditor
                  id="field-description"
                  onChange={(_, editor) => setDescription(editor.getData())}
                  onReady={(editor) => editor.setData(description ?? '')}
                />
              </InputComponent>
            </RowGapBlock>
          </RowGapBlock>
        </ModalBody>
        <ModalFooter>
          <ButtonsGroup align="right">
            <PreviewPostButton author={author} postText={description} />
            <ButtonPrimary onClick={onSubmit} size="medium" disabled={!isValid}>
              Next step
              <Arrow direction="right" />
            </ButtonPrimary>
          </ButtonsGroup>
        </ModalFooter>
      </Modal>
    </>
  )
}
