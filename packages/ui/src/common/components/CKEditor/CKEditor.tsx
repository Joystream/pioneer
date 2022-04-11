import MarkdownEditor, { Editor, EventInfo } from '@joystream/markdown-editor'
import React, { Ref, RefObject, useEffect, useRef } from 'react'
import { useFormContext, Controller } from 'react-hook-form'

import { useMentions } from '@/common/hooks/useMentions'

import { CKEditorStylesOverrides } from './CKEditorStylesOverrides'

export interface CKEditorProps {
  id?: string
  maxRows?: number
  minRows?: number
  onChange?: (event: EventInfo, editor: Editor) => void
  onBlur?: (event: EventInfo, editor: Editor) => void
  onFocus?: (event: EventInfo, editor: Editor) => void
  onReady?: (editor: Editor) => void
  disabled?: boolean
  inline?: boolean
}

const BaseCKEditor = React.forwardRef(
  (
    { maxRows = 20, minRows = 5, onChange, onBlur, onFocus, onReady, disabled, inline }: CKEditorProps,
    ref?: Ref<HTMLDivElement>
  ) => {
    const localRef = useRef<HTMLDivElement>(null)
    const elementRef: RefObject<HTMLDivElement> = (ref ?? localRef) as RefObject<HTMLDivElement>
    const editorRef = useRef<Editor | null>(null)

    const { mentionMembersFeed, mentionFeed, itemRenderer } = useMentions()

    useEffect(() => {
      if (!editorRef.current) {
        return
      }

      editorRef.current.isReadOnly = !!disabled
    }, [disabled])

    useEffect(() => {
      const createPromise: Promise<Editor> = (inline ? MarkdownEditor.InlineEditor : MarkdownEditor.ClassicEditor)
        .create(elementRef.current || '', {
          toolbar: {
            items: [
              'heading',
              '|',
              'bold',
              'italic',
              'link',
              'strikethrough',
              '|',
              'bulletedList',
              'numberedList',
              'outdent',
              'indent',
              '|',
              'blockQuote',
              'undo',
              'redo',
            ],
          },
          mention: {
            feeds: [
              { marker: '@', feed: mentionMembersFeed, minimumCharacters: 1 },
              { marker: '#', feed: mentionFeed, itemRenderer, dropdownLimit: 10 },
            ],
          },
          image: {
            toolbar: ['imageStyle:full', 'imageStyle:side', '|', 'imageTextAlternative'],
          },
          // This value must be kept in sync with the language defined in webpack.config.js.
          language: 'en',
        })
        .then((editor: any) => {
          if (onReady) {
            onReady(editor)
          }

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
            const displayData = editor.getData()
            editor.setData(displayData)
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
    }, [elementRef.current])

    return (
      <>
        <CKEditorStylesOverrides maxRows={maxRows} minRows={minRows} />
        <div ref={elementRef} />
      </>
    )
  }
)

interface ControlledCKEditorProps extends CKEditorProps {
  name?: string
}

export const CKEditor = ({ name, ...props }: ControlledCKEditorProps) => {
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
