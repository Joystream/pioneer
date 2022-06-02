import React from 'react'
import { useFormContext } from 'react-hook-form'

import EditableInputList from '@/common/components/EditableInputList/EditableInputList'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'

export const ApplicationForm = () => {
  const { watch, setValue } = useFormContext()
  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={8}>
          <h4>Specific parameters</h4>
          <TextMedium lighter>Create Working Group Lead Opening</TextMedium>
        </RowGapBlock>
      </Row>
      <Row>
        <EditableInputList
          title="Application form"
          buttonText="Add new question"
          value={watch('applicationForm.questions')}
          onChange={(questions) => setValue('applicationForm.questions', questions, { shouldValidate: true })}
        />
      </Row>
    </RowGapBlock>
  )
}
