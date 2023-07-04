import MarkdownEditor, { Editor, EventInfo } from '@joystream/markdown-editor'
import React, { Ref, RefObject, useEffect, useRef } from 'react'
import { useFormContext } from 'react-hook-form'

import { useMentions } from '@/common/hooks/useMentions'

import { CKEditorStylesOverrides } from './CKEditorStylesOverrides'

export interface BaseCKEditorProps {
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

export const BaseCKEditor = React.forwardRef(
  (
    { id, maxRows = 20, minRows = 5, onChange, onBlur, onFocus, onReady, disabled, inline }: BaseCKEditorProps,
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
              '|',
              // 'insertTable',
              'specialCharacters',
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
          table: {
            contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
          },
          // This value must be kept in sync with the language defined in webpack.config.js.
          language: 'en',
        })
        .then((editor: Editor) => {
          // The component might be unmounted by the time it's initialize
          // In this case the editor will be cleaned up when the promise resolves
          if (!elementRef.current) return editor

          Object.defineProperty(elementRef.current, 'setData', {
            configurable: true,
            value: (data: any) => editor.setData(data),
          })

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
        <CKEditorStylesOverrides maxRows={maxRows} minRows={minRows} />
        <div id={id} className="ckeditor-anchor" ref={elementRef} />
      </>
    )
  }
)

export interface CKEditorProps extends BaseCKEditorProps {
  name?: string
}

export const CKEditor = React.memo(({ name, ...props }: CKEditorProps) => {
  const formContext = useFormContext()

  if (!formContext || !name) {
    return <BaseCKEditor {...props} />
  }
  const value = formContext.watch(name)
  return (
    <BaseCKEditor
      {...props}
      onReady={(editor) => editor.setData(value ?? '')}
      onChange={(_, editor) => formContext.setValue(name, editor.getData(), { shouldValidate: true })}
    />
  )
})
