import { useApolloClient } from '@apollo/client'
import React, { useCallback, useEffect, useRef } from 'react'

import { debounce } from '@/common/utils'
import { SearchMembersDocument, SearchMembersQuery, SearchMembersQueryVariables } from '@/memberships/queries'

import { CKEditorStylesOverrides } from './CKEditorStylesOverrides'
import { MarkdownEditor } from './MarkdownEditor.js'
import { Editor, EventInfo } from './types'

export interface CKEditorProps {
  id?: string
  onChange?: (event: EventInfo, editor: Editor) => void
  onBlur?: (event: EventInfo, editor: Editor) => void
  onFocus?: (event: EventInfo, editor: Editor) => void
  onReady?: (editor: Editor) => void
  disabled?: boolean
}

export const CKEditor = ({ disabled, onBlur, onChange, onFocus, onReady }: CKEditorProps) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const editorRef = useRef<Editor | null>(null)

  useEffect(() => {
    if (!editorRef.current) {
      return
    }

    editorRef.current.isReadOnly = !!disabled
  }, [disabled])

  const client = useApolloClient()
  const mentionFeed = useCallback(
    debounce(async (text: string) => {
      const { data } = await client.query<SearchMembersQuery, SearchMembersQueryVariables>({
        query: SearchMembersDocument,
        variables: { text, limit: 10 },
      })
      return data.memberships.map(({ id, handle }) => ({ id: `@${handle}`, memberId: id }))
    }),
    [client]
  )

  useEffect(() => {
    const createPromise: Promise<Editor> = MarkdownEditor.create(ref.current || '', {
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
          'uploadImage',
          'blockQuote',
          'undo',
          'redo',
        ],
      },
      mention: {
        feeds: [{ marker: '@', feed: mentionFeed, minimumCharacters: 1 }],
      },
      image: {
        toolbar: ['imageStyle:full', 'imageStyle:side', '|', 'imageTextAlternative'],
      },
      // This value must be kept in sync with the language defined in webpack.config.js.
      language: 'en',
    }).then((editor) => {
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
  }, [ref.current])

  return (
    <>
      <CKEditorStylesOverrides />
      <div ref={ref} />
    </>
  )
}
