import React from 'react'

import { RowGapBlock } from '@/common/components/page/PageContent'
import { ValidationHelpers } from '@/common/utils/validation'

import { ApplicationQuestionInput } from '../../components/ApplicationQuestionInput'
import { ApplicationQuestion } from '../../types'

interface ApplicationStepProps extends ValidationHelpers {
  questions: ApplicationQuestion[]
}

export const ApplicationStep = ({ questions }: ApplicationStepProps) => {
  return (
    <RowGapBlock gap={24}>
      <h4>Application</h4>
      <RowGapBlock gap={20}>
        {questions
          .sort((a, b) => a.index - b.index)
          .map((question, index) => (
            <ApplicationQuestionInput
              type={question.type}
              question={question.question}
              index={question.index}
              key={question.index}
              name={`form.${index}`}
            />
          ))}
      </RowGapBlock>
    </RowGapBlock>
  )
}
