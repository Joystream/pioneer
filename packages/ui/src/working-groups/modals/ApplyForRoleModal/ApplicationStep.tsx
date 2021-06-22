import React, { useEffect, useMemo } from 'react'
import * as Yup from 'yup'

import { RowGapBlock } from '../../../common/components/page/PageContent'
import { useForm } from '../../../common/hooks/useForm'
import { ApplicationQuestionInput } from '../../components/ApplicationQuestionInput'
import { ApplicationQuestion } from '../../types'

interface ApplicationStepProps {
  questions: ApplicationQuestion[]
  onChange: (isValid: boolean, answers: Record<number, string>) => void
}

const validationSchemaFromQuestions = (questions: ApplicationQuestion[]) => {
  const shapeDefinition = questions.reduce(
    (schema, question, index) => ({
      [index]: Yup.string().required(),
      ...schema,
    }),
    {}
  )
  return Yup.object().shape(shapeDefinition)
}

export const ApplicationStep = ({ questions, onChange }: ApplicationStepProps) => {
  const schema = useMemo(() => validationSchemaFromQuestions(questions), [JSON.stringify(questions)])
  const { fields, changeField, validation } = useForm<Record<number, string>>({}, schema)
  useEffect(() => onChange(validation.isValid, fields), [JSON.stringify(fields), validation.isValid])

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
              onChange={(value) => changeField(index, value)}
            />
          ))}
      </RowGapBlock>
    </RowGapBlock>
  )
}
