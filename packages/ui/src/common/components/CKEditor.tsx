import React, { useEffect, useRef } from 'react'
import { createGlobalStyle } from 'styled-components'

import { Colors } from '../constants'

interface EventInfo {
  name: string
  path: any[]
  return: any
  source: any
}

interface Editor {
  getData: () => string
  setData: (data: string) => void
  isReadOnly: boolean
  model: any
  editing: any
  destroy: () => Promise<undefined>
}

interface CKEditorProps {
  EditorClass: any
  onChange?: (event: EventInfo, editor: Editor) => void
  onBlur?: (event: EventInfo, editor: Editor) => void
  onFocus?: (event: EventInfo, editor: Editor) => void
  onReady?: (editor: Editor) => void
  disabled?: boolean
}

const CKEditorStylesOverrides = createGlobalStyle`
  .ck.ck-editor {
    width: 100%
  }

  :root{
    --ck-focus-ring: 1px solid ${Colors.Blue[300]}
  }
`

export const CKEditor = ({ disabled, EditorClass, onBlur, onChange, onFocus }: CKEditorProps) => {
  const ref = useRef(null)
  const editorRef = useRef<Editor | null>(null)

  useEffect(() => {
    const current: any = editorRef?.current
    current && (current.isReadOnly = !!disabled)
  }, [disabled])

  useEffect(() => {
    EditorClass.create(ref.current, {}).then((editor: Editor) => {
      editorRef.current = editor
      editor.isReadOnly = disabled ?? false

      const modelDocument = editor.model.document
      const viewDocument = editor.editing.view.document

      modelDocument.on('change:data', (event: any) => {
        if (onChange) {
          onChange(event, editor)
        }
      })

      viewDocument.on('focus', (event: any) => {
        if (onFocus) {
          onFocus(event, editor)
        }
      })

      viewDocument.on('blur', (event: any) => {
        if (onBlur) {
          onBlur(event, editor)
        }
      })

      return editor
    })

    return () => {
      editorRef.current?.destroy()
    }
  }, [])

  return (
    <>
      <CKEditorStylesOverrides />
      <div ref={ref} />
    </>
  )
}
