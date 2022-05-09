import React from 'react'

import { CKEditor } from '@/common/components/CKEditor'

import { InputComponent, InputText } from '../../common/components/forms'
import { ApplicationQuestionType } from '../types'

interface ApplicationQuestionInputProps {
  type: ApplicationQuestionType
  index: number
  question: string
  name: string
}

export const ApplicationQuestionInput = ({ question, index, type, name }: ApplicationQuestionInputProps) => {
  const inputId = `field-${index}`

  return (
    <InputComponent label={question} required inputSize={type === 'TEXTAREA' ? 'auto' : 'm'} id={inputId}>
      {type === 'TEXT' && <InputText id={inputId} name={name} />}
      {type === 'TEXTAREA' && <CKEditor name={name} />}
    </InputComponent>
  )
}
