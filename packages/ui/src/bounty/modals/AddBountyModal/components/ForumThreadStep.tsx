import React from 'react'

import { ForumThreadDetailsContext, JudgingPeriodDetailsContext } from '@/bounty/modals/AddBountyModal/machine'
import { CKEditor } from '@/common/components/CKEditor'
import { InputComponent, InputText } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextHuge } from '@/common/components/typography'

interface Props extends Omit<ForumThreadDetailsContext, keyof JudgingPeriodDetailsContext> {
  setForumThreadTopic: (topic: string) => void
  setForumThreadDescription: (description: string) => void
}

export const ForumThreadStep = ({
  forumThreadDescription,
  forumThreadTopic,
  setForumThreadTopic,
  setForumThreadDescription,
}: Props) => {
  return (
    <RowGapBlock gap={24}>
      <Row>
        <TextHuge bold>Create forum thread for this bounty</TextHuge>
      </Row>

      <Row>
        <InputComponent id="forum-title" label="Topic of the Thread" required inputSize="m">
          <InputText
            id="forum-title"
            value={forumThreadTopic}
            required
            max={70}
            onChange={(event) => setForumThreadTopic(event.target.value)}
          />
        </InputComponent>
      </Row>

      <Row>
        <InputComponent label="Thread description" required inputSize="auto" id="forum-description">
          <CKEditor
            id="forum-description"
            onReady={(editor) => editor.setData(forumThreadDescription || '')}
            onChange={(event, editor) => setForumThreadDescription(editor.getData())}
            minRows={3}
          />
        </InputComponent>
      </Row>
    </RowGapBlock>
  )
}
