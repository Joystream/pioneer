import React from 'react'

export interface CKEditorProps {
  onChange?: (event: any, editor: any) => void
  onBlur?: (event: any, editor: any) => void
  onFocus?: (event: any, editor: any) => void
  onReady?: (editor: any) => void
  disabled?: boolean
}

export const CKEditor = () => {
  return <div />
}
