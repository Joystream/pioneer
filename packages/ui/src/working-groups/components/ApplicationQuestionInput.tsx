// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { CKEditor } from '@ckeditor/ckeditor5-react'
import React from 'react'

import { InputComponent, InputText } from '../../common/components/forms'
import { ApplicationQuestionType } from '../types'

interface ApplicationQuestionInputProps {
  type: ApplicationQuestionType
  question: string
}

export const ApplicationQuestionInput = ({ question, type }: ApplicationQuestionInputProps) => {
  return (
    <InputComponent label={question} required inputSize={type === 'TEXTAREA' ? 'l' : 'm'}>
      {type === 'TEXT' && <InputText />}
      {type === 'TEXTAREA' && (
        <CKEditor
          editor={ClassicEditor}
          onChange={(event: any, editor: any) => {
            const data = editor.getData()
            console.log({ event, editor, data })
          }}
        />
      )}
    </InputComponent>
  )
}
