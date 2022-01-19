import { useApolloClient } from '@apollo/client'
import MarkdownEditor, { Editor, EventInfo } from '@joystream/markdown-editor'
import React, { Ref, RefObject, useCallback, useEffect, useRef } from 'react'

import { debounce } from '@/common/utils'
import { SearchMembersDocument, SearchMembersQuery, SearchMembersQueryVariables } from '@/memberships/queries'
import { GetProposalsDocument, GetProposalsQuery, GetProposalsQueryVariables } from '@/proposals/queries'

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

const MentionTypes = ['general', 'proposal', 'member'] as const
type MentionType = typeof MentionTypes[number]

interface MentionItem {
  id: string
  itemId: string
  name: string
  type: MentionType
}

export const CKEditor = React.forwardRef(
  (
    { maxRows = 20, minRows = 5, onChange, onBlur, onFocus, onReady, disabled, inline }: CKEditorProps,
    ref?: Ref<HTMLDivElement>
  ) => {
    const localRef = useRef<HTMLDivElement>(null)
    const elementRef: RefObject<HTMLDivElement> = (ref ?? localRef) as RefObject<HTMLDivElement>
    const editorRef = useRef<Editor | null>(null)

    const fetchMembers = useCallback(async (text: string) => {
      const { data } = await client.query<SearchMembersQuery, SearchMembersQueryVariables>({
        query: SearchMembersDocument,
        variables: { text, limit: 10 },
        fetchPolicy: 'cache-first',
      })
      return data.memberships.map<MentionItem>(({ id, handle }) => ({
        id: `@${handle}`,
        itemId: id,
        type: 'member',
        name: handle,
      }))
    }, [])

    const fetchProposals = useCallback(async (text: string) => {
      const { data } = await client.query<GetProposalsQuery, GetProposalsQueryVariables>({
        query: GetProposalsDocument,
        variables: {
          where: { title_contains: text },
        },
        fetchPolicy: 'cache-first',
      })
      return data.proposals.map<MentionItem>(({ id, title }) => ({
        id: `@${title}`,
        itemId: id,
        type: 'proposal',
        name: title,
      }))
    }, [])

    const fetchAll = useCallback(async (text: string) => {
      const data = await Promise.all([fetchMembers(text), fetchProposals(text)])
      return data.flat().sort(sortMentions)
    }, [])

    useEffect(() => {
      if (!editorRef.current) {
        return
      }

      editorRef.current.isReadOnly = !!disabled
    }, [disabled])

    const client = useApolloClient()
    const mentionFeed = useCallback(
      debounce(async (text: string) => {
        const proposal = text.match(/proposal:(.+)$/)
        if (proposal) {
          return await fetchProposals(proposal[1])
        }
        const member = text.match(/member:(.+)$/)
        if (member) {
          return await fetchMembers(member[1])
        }
        if (text.length > 0) {
          return await fetchAll(text)
        }
        return generalItems
      }),
      [client]
    )

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
            feeds: [{ marker: '@', feed: mentionFeed, itemRenderer: mentionItemRenderer, dropdownLimit: 10 }],
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

const generalItems: MentionItem[] = [
  { id: '@member:', type: 'general', itemId: 'member', name: 'member' },
  { id: '@proposal:', type: 'general', itemId: 'proposal', name: 'proposal' },
]

const mentionItemRenderer = ({ id, itemId, type }: MentionItem) => {
  const itemElement = document.createElement('div')

  itemElement.classList.add('custom-item')
  itemElement.id = `mention-list-item-id-${itemId}`
  itemElement.textContent = `${id}${type === 'general' ? '<name>' : ''}`

  if (type !== 'general') {
    const typeElement = document.createElement('span')

    typeElement.classList.add('custom-item-type')
    typeElement.textContent = type

    itemElement.appendChild(typeElement)
  }

  return itemElement
}

const sortMentions = (a: MentionItem, b: MentionItem) => {
  if (a.name > b.name) {
    return 1
  }
  if (b.name > a.name) {
    return -1
  }
  return 0
}
