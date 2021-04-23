import React from 'react'

import { CKEditor } from '../../common/components/CKEditor'
import { InputComponent, InputText } from '../../common/components/forms'
import { ApplicationQuestionType } from '../types'

interface ApplicationQuestionInputProps {
  type: ApplicationQuestionType
  question: string
  onChange: (value: string) => void
}

export const ApplicationQuestionInput = ({ question, type, onChange }: ApplicationQuestionInputProps) => {
  return (
    <InputComponent label={question} required inputSize={type === 'TEXTAREA' ? 'auto' : 'm'}>
      {type === 'TEXT' && <InputText onChange={(event) => onChange(event.target.value)} />}
      {type === 'TEXTAREA' && <CKEditor onChange={(event, editor) => onChange(editor.getData())} />}
    </InputComponent>
  )
}
