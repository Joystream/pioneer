import React, { useCallback, useEffect, useMemo, useRef, useState, RefObject } from 'react'
import InView from 'react-intersection-observer'
import styled from 'styled-components'

import { BlockTime } from '@/common/components/BlockTime'
import { Loading } from '@/common/components/Loading'
import { MarkdownPreview } from '@/common/components/MarkdownPreview'
import { Modal, ModalHeader } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Stepper, StepperBody, StepperModalBody, StepperModalWrapper } from '@/common/components/StepperModal'
import { useModal } from '@/common/hooks/useModal'
import { formatDateString } from '@/common/model/formatters'
import { asBlock } from '@/common/types'
import { ForumPostAuthor, ForumPostRow, ForumPostStyles } from '@/forum/components/PostList/PostListItem'
import { useForumPostEdits } from '@/forum/hooks/useForumPostEdits'
import { PostEdit } from '@/forum/types'
import { MemberInfo } from '@/memberships/components'
import { Member } from '@/memberships/types'

import { PostHistoryModalCall } from '.'

export const PostHistoryModal = React.memo(() => {
  const {
    hideModal,
    modalData: { postId, author },
  } = useModal<PostHistoryModalCall>()
  const { isLoading, edits } = useForumPostEdits(postId)
  const [activeEdit, setActiveEdit] = useState(0)

  const editsInView = useMemo(() => new Array<boolean>(edits?.length ?? 0), [edits?.length])
  const editsRefs = useMemo(() => new Array<RefObject<HTMLDivElement>>(edits?.length ?? 0), [edits?.length])

  const pickActiveEdit = useCallback(
    (index: number) => (isCurrentInView: boolean) => {
      editsInView[index] = isCurrentInView
      const newActiveEdit = editsInView.findIndex((value) => value)
      setActiveEdit(newActiveEdit)
    },
    [editsInView]
  )

  const getInsertRef = (index: number) => (ref: RefObject<HTMLDivElement>) => (editsRefs[index] = ref)

  const viewport = useRef<HTMLDivElement>(null)

  const getStepType = (index: number) => {
    if (index === activeEdit) {
      return 'active'
    }

    return index > activeEdit ? 'next' : 'past'
  }

  const displayEdits = () => (
    <>
      <Stepper
        steps={
          edits?.map((edit, index) => ({ title: formatDateString(edit.createdAt), type: getStepType(index) })) ?? []
        }
      />
      <StepperBody ref={viewport}>
        {isLoading ? (
          <Loading text="Loading versions..." />
        ) : (
          <RowGapBlock gap={32}>
            {edits?.map((edit, index) => (
              <HistoryPost
                edit={edit}
                author={author}
                onChange={pickActiveEdit(index)}
                root={viewport.current}
                insertRef={getInsertRef(index)}
              />
            ))}
          </RowGapBlock>
        )}
      </StepperBody>
    </>
  )

  return (
    <Modal onClose={hideModal} modalSize="l" modalHeight="xl">
      <ModalHeader onClick={hideModal} title="All edited versions" />
      <StepperModalBody>
        <HistoryModalWrapper>{displayEdits()}</HistoryModalWrapper>
      </StepperModalBody>
    </Modal>
  )
})

interface HistoryPostProps {
  edit: PostEdit
  author: Member
  onChange: (inView: boolean) => void
  root: HTMLDivElement | null
  insertRef: (ref: RefObject<HTMLDivElement>) => void
}

const HistoryPost = ({ edit, author, onChange, root, insertRef }: HistoryPostProps) => {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    !!ref.current && insertRef(ref)
  }, [ref.current])
  return (
    <InView onChange={onChange} root={root} rootMargin="-32px 0px 0px">
      <ForumPostStyles ref={ref}>
        <ForumPostRow>
          <ForumPostAuthor>{author && <MemberInfo member={author} />}</ForumPostAuthor>
          <BlockTime block={asBlock(edit)} layout="reverse" />
        </ForumPostRow>
        <ForumPostRow>
          <MarkdownPreview markdown={edit.newText} />
        </ForumPostRow>
      </ForumPostStyles>
    </InView>
  )
}

const HistoryModalWrapper = styled(StepperModalWrapper)`
  grid-template-columns: 300px 1fr;
`
