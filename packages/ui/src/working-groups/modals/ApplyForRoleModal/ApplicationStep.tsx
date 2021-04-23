import React from 'react'

import { RowGapBlock } from '../../../common/components/page/PageContent'
import { ApplicationQuestionInput } from '../../components/ApplicationQuestionInput'
import { ApplicationQuestion } from '../../types'

interface ApplicationStepProps {
  questions: ApplicationQuestion[]
}

export const ApplicationStep = ({ questions }: ApplicationStepProps) => (
  <RowGapBlock gap={20}>
    <h4>Application</h4>
    {questions
      .sort((a, b) => a.index - b.index)
      .map((question) => (
        <ApplicationQuestionInput type={question.type} question={question.question} key={question.index} />
      ))}
  </RowGapBlock>
)
