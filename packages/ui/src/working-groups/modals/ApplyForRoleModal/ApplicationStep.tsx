import React, { useMemo, useState } from 'react'

import { RowGapBlock } from '../../../common/components/page/PageContent'
import { ApplicationQuestionInput } from '../../components/ApplicationQuestionInput'
import { ApplicationQuestion } from '../../types'

interface ApplicationStepProps {
  questions: ApplicationQuestion[]
  onChange: (isValid: boolean, answers: string[]) => void
}

export const ApplicationStep = ({ questions, onChange }: ApplicationStepProps) => {
  const [answers, setAnswers] = useState<string[]>(questions.map(() => ''))

  useMemo(() => onChange(true, [...answers]), [JSON.stringify(answers)])

  return (
    <RowGapBlock gap={20}>
      <h4>Application</h4>
      {questions
        .sort((a, b) => a.index - b.index)
        .map((question) => (
          <ApplicationQuestionInput
            type={question.type}
            question={question.question}
            key={question.index}
            onChange={(value) =>
              setAnswers((answers) => {
                answers.splice(question.index, 1, value)
                return [...answers]
              })
            }
          />
        ))}
    </RowGapBlock>
  )
}
