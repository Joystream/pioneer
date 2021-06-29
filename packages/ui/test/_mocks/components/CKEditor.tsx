import React, { ChangeEventHandler } from 'react'

import { CKEditorProps } from '@/common/components/CKEditor'
import { Input } from '@/common/components/forms'

const CKEditor = (props: CKEditorProps) => (
  <Input
    id={props.id || 'ck-test'}
    name={props.id}
    type="text"
    autoComplete="off"
    onChange={(props.onChange as unknown) as ChangeEventHandler<Element>}
  />
)

export const mockCKEditor = (props: any) => CKEditor(props)
