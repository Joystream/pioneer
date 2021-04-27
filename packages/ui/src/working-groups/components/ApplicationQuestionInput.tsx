import React from 'react'

import { CKEditor } from '../../common/components/CKEditor'
import { InputComponent, InputText } from '../../common/components/forms'
import { ApplicationQuestionType } from '../types'

interface ApplicationQuestionInputProps {
  type: ApplicationQuestionType
  index: number
  question: string
  onChange: (value: string) => void
}

export const ApplicationQuestionInput = ({ question, index, type, onChange }: ApplicationQuestionInputProps) => {
  const inputId = `field-${index}`

  return (
    <InputComponent label={question} required inputSize={type === 'TEXTAREA' ? 'auto' : 'm'} id={inputId}>
      {type === 'TEXT' && <InputText id={inputId} onChange={(event) => onChange(event.target.value)} />}
      {type === 'TEXTAREA' && <CKEditor onChange={(event, editor) => onChange(editor.getData())} />}
    </InputComponent>
  )
}
