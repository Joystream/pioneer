import React from 'react'

import { CKEditor } from '../../common/components/CKEditor'
import { InputComponent, InputText } from '../../common/components/forms'
import { ApplicationQuestionType } from '../types'

interface ApplicationQuestionInputProps {
  type: ApplicationQuestionType
  question: string
}

export const ApplicationQuestionInput = ({ question, type }: ApplicationQuestionInputProps) => {
  return (
    <InputComponent label={question} required inputSize={type === 'TEXTAREA' ? 'auto' : 'm'}>
      {type === 'TEXT' && <InputText />}
      {type === 'TEXTAREA' && (
        <CKEditor
          onChange={(event, editor) => {
            console.log(editor.getData())
          }}
        />
      )}
    </InputComponent>
  )
}
