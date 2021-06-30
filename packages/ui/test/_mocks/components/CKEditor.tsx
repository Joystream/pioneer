import React from 'react'

import { CKEditorProps, Editor, EventInfo } from '@/common/components/CKEditor'
import { Input } from '@/common/components/forms'

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

export const mockCKEditor = (props: any) => CKEditor(props)
