import React from 'react'

import { CKEditorProps } from '@/common/components/CKEditor'
import { Input } from '@/common/components/forms'

const CKEditor = ({ id, onChange }: CKEditorProps) => (
  <Input
    id={id || 'ck-test'}
    name={id || 'ck-test'}
    type="text"
    autoComplete="off"
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    onChange={(event) => onChange(event, { getData: () => event.target.value })}
  />
)

export const mockCKEditor = (props: any) => CKEditor(props)
