import React, { useEffect, useRef } from 'react'

import { CKEditorStylesOverrides } from './CKEditorStylesOverrides'
import { MarkdownEditor } from './MarkdownEditor'
import { Editor, EventInfo } from './types'

interface CKEditorProps {
  onChange?: (event: EventInfo, editor: Editor) => void
  onBlur?: (event: EventInfo, editor: Editor) => void
  onFocus?: (event: EventInfo, editor: Editor) => void
  onReady?: (editor: Editor) => void
  disabled?: boolean
}

export const CKEditor = ({ disabled, onBlur, onChange, onFocus }: CKEditorProps) => {
  const ref = useRef(null)
  const editorRef = useRef<Editor | null>(null)

  useEffect(() => {
    if (!editorRef.current) {
      return
    }

    editorRef.current.isReadOnly = !!disabled
  }, [disabled])

  useEffect(() => {
    const createPromise: Promise<Editor> = MarkdownEditor.create(ref.current, {
      toolbar: {
        items: [
          'heading',
          '|',
          'bold',
          'italic',
          'link',
          'bulletedList',
          'numberedList',
          '|',
          'outdent',
          'indent',
          '|',
          'uploadImage',
          'blockQuote',
          'insertTable',
          'mediaEmbed',
          'undo',
          'redo',
        ],
      },
      image: {
        toolbar: ['imageStyle:full', 'imageStyle:side', '|', 'imageTextAlternative'],
      },
      table: {
        contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
      },
      // This value must be kept in sync with the language defined in webpack.config.js.
      language: 'en',
    }).then((editor: Editor) => {
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
