import React, { useCallback, useEffect, useMemo, useRef, useState, RefObject } from 'react'
import { InView } from 'react-intersection-observer'
import styled, { css } from 'styled-components'

import { BlockTime, BlockTimeWrapper } from '@/common/components/BlockTime'
import { ButtonLink } from '@/common/components/buttons'
import { Loading } from '@/common/components/Loading'
import { MarkdownPreview } from '@/common/components/MarkdownPreview'
import { Modal, ModalHeader } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Stepper, StepperBody, StepperModalBody, StepperModalWrapper } from '@/common/components/StepperModal'
import { Colors } from '@/common/constants'
import { useModal } from '@/common/hooks/useModal'
import { useToggle } from '@/common/hooks/useToggle'
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

  const getScrollToEdit = (index: number) => () =>
    editsRefs[index]?.current?.scrollIntoView({ behavior: 'smooth', inline: 'start' })

  const getInsertRef = (index: number) => (ref: RefObject<HTMLDivElement>) => (editsRefs[index] = ref)

  const viewport = useRef<HTMLDivElement>(null)

  const getStepType = (index: number) => {
    if (index === activeEdit) {
      return 'active'
    }

    return 'hideNumber'
  }

  const displayEdits = () => (
    <>
      <Stepper
        steps={
          edits?.map((edit, index) => ({
            title: formatDateString(edit.createdAt),
            type: getStepType(index),
            onClick: getScrollToEdit(index),
          })) ?? []
        }
      />
      <StepperBody ref={viewport}>
        {isLoading ? (
          <Loading text="Loading versions..." />
        ) : (
          <HistoryPostSpacing gap={32}>
            {edits?.map((edit, index) => (
              <HistoryPost
                key={index}
                edit={edit}
                author={author}
                onChange={pickActiveEdit(index)}
                root={viewport.current}
                insertRef={getInsertRef(index)}
              />
            ))}
          </HistoryPostSpacing>
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
  const contentRef = useRef<HTMLDivElement>(null)
  const limitedPostHeight = 300
  const [postLong, setPostLong] = useState(false)
  useEffect(() => {
    !!ref.current && insertRef(ref)
    contentRef.current && contentRef.current.getBoundingClientRect().height > limitedPostHeight && setPostLong(true)
  }, [ref.current, contentRef.current])
  const [expanded, toggleExpanded] = useToggle()

  return (
    <InView onChange={onChange} root={root} rootMargin="-32px 0px 0px">
      <HistoryModalPost ref={ref}>
        <ForumPostRow>
          <ForumPostAuthor>{author && <MemberInfo member={author} />}</ForumPostAuthor>
          <BlockTime block={asBlock(edit)} layout="reverse" lessInfo />
        </ForumPostRow>
        <ContentRow ref={contentRef} postLong={postLong} limitedPostHeight={limitedPostHeight} expanded={expanded}>
          <MarkdownPreview markdown={edit.newText} />
        </ContentRow>
        {postLong && (
          <ShowMoreButton size="small" onClick={toggleExpanded}>
            {expanded ? 'Show less' : 'Show more'}
          </ShowMoreButton>
        )}
      </HistoryModalPost>
    </InView>
  )
}

const HistoryModalWrapper = styled(StepperModalWrapper)`
  grid-template-columns: 300px 1fr;
`

const HistoryModalPost = styled(ForumPostStyles)`
  padding-bottom: 52px;

  ${BlockTimeWrapper} {
    grid-row-gap: 2px;
  }
`

const HistoryPostSpacing = styled(RowGapBlock)`
  & > div:not(:last-child) {
    position: relative;

    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 1px;
      background-color: ${Colors.Black[200]};
    }

    ${ForumPostStyles} {
      padding-bottom: 52px;
    }
  }
`

const ContentRow = styled(ForumPostRow)<{ postLong?: boolean; limitedPostHeight?: number; expanded?: boolean }>`
  overflow: hidden;

  ${({ postLong, limitedPostHeight, expanded }) => {
    if (postLong) {
      return css`
        max-height: ${expanded ? 'unset' : limitedPostHeight + 'px'};
      `
    }
  }};
`

const ShowMoreButton = styled(ButtonLink)`
  margin-top: 22px;
`
