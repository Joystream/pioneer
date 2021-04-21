import React, { useEffect, useRef } from 'react'
import { createGlobalStyle } from 'styled-components'

import { Colors, ZIndex } from '../constants'

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
    width: 100%;
  }

  .ck.ck-content {
    line-height: 1.5em;
  }

  .ck.ck-content p,
  .ck.ck-content ul,
  .ck.ck-content ol {
    margin: 1em 0;
  }


  .ck.ck-content ol {
    padding-inline-start: 2em;
  }

  .ck.ck-content ul {
    padding-inline-start: 2em;
    list-style-type: initial;
  }

  :root {
    --ck-focus-ring: 1px solid ${Colors.Blue[300]};
    --ck-z-modal: calc(${ZIndex.Modal} + 10);
  }
`

export const CKEditor = ({ disabled, EditorClass, onBlur, onChange, onFocus }: CKEditorProps) => {
  const ref = useRef(null)
  const editorRef = useRef<Editor | null>(null)

  useEffect(() => {
    if (!editorRef.current) {
      return
    }

    editorRef.current.isReadOnly = !!disabled
  }, [disabled])

  useEffect(() => {
    const createPromise: Promise<Editor> = EditorClass.create(ref.current, {}).then((editor: Editor) => {
      editorRef.current = editor
      editor.isReadOnly = disabled ?? false

      const modelDocument = editor.model.document
      const viewDocument = editor.editing.view.document

      modelDocument.on('change:data', (event: EventInfo) => {
        if (onChange) {
          onChange(event, editor)
        }
      })

      viewDocument.on('focus', (event: EventInfo) => {
        if (onFocus) {
          onFocus(event, editor)
        }
      })

      viewDocument.on('blur', (event: EventInfo) => {
        if (onBlur) {
          onBlur(event, editor)
        }
      })

      return editor
    })

    return () => {
      createPromise.then((editor) => editor.destroy())
    }
  }, [])

  return (
    <>
      <CKEditorStylesOverrides />
      <div ref={ref} />
    </>
  )
}
