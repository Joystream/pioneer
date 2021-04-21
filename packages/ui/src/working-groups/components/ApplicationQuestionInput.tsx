import React from 'react'

import { InputComponent, InputText, InputTextarea } from '../../common/components/forms'
import { ApplicationQuestionType } from '../types'

interface ApplicationQuestionInputProps {
  type: ApplicationQuestionType
  question: string
}

export const ApplicationQuestionInput = ({ question, type }: ApplicationQuestionInputProps) => {
  return (
    <InputComponent label={question} required inputSize={type === 'TEXTAREA' ? 'l' : 'm'}>
      {type === 'TEXT' && <InputText />}
      {type === 'TEXTAREA' && <InputTextarea />}
    </InputComponent>
  )
}
