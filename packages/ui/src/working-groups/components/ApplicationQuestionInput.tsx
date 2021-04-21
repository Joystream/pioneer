import React from 'react'

import { ApplicationQuestionType } from '../types'

interface ApplicationQuestionInputProps {
  type: ApplicationQuestionType
  question: string
}

export const ApplicationQuestionInput = ({ question, type }: ApplicationQuestionInputProps) => (
  <div>
    <p>
      <strong>Type</strong>: {type}
    </p>
    <p>
      <strong>Question</strong>: {question}
    </p>
  </div>
)
