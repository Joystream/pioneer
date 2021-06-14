import React from 'react'

import { Input } from '@/common/components/forms'

import { Editor, EventInfo } from '../../../../markdown-editor'
import { CKEditorProps } from '../imports/CKEditor'

const CKEditor = ({ id, onChange }: CKEditorProps) => (
  <Input
    id={id || 'ck-test'}
    name={id || 'ck-test'}
    type="text"
    autoComplete="off"
    onChange={(event) => {
      const mockEditor = { getData: () => event.target.value } as Editor
      const mockEvent = {} as EventInfo
      return onChange?.(mockEvent, mockEditor)
    }}
  />
)

export const mockCKEditor = (props: CKEditorProps) => CKEditor(props)
