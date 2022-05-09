import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { CKEditorProps } from '@/common/components/CKEditor'
import { Input } from '@/common/components/forms'

import { Editor, EventInfo } from '../../../../markdown-editor'

const BaseCKEditor = ({ id, onChange, onBlur }: CKEditorProps) => (
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
    onBlur={onBlur as any}
  />
)

const CKEditor = ({ name, ...props }: CKEditorProps) => {
  const formContext = useFormContext()

  if (!formContext || !name) {
    return <BaseCKEditor {...props} />
  }

  return (
    <Controller
      name={name}
      control={formContext.control}
      render={({ field }) => (
        <BaseCKEditor {...props} onBlur={field.onBlur} onChange={(_, editor) => field.onChange(editor.getData())} />
      )}
    />
  )
}

export const mockCKEditor = (props: CKEditorProps) => CKEditor(props)
