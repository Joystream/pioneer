import React, { useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'

import { CKEditor } from '@/common/components/CKEditor'
import { Tooltip, TooltipDefault } from '@/common/components/Tooltip'
import { Badge } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { spacing } from '@/common/utils/styles'
import { ForumComment, ForumCommentStyles } from '@/forum/components/ForumComment'
import { ProposalDiscussionThread } from '@/proposals/types'

interface Props {
  thread: ProposalDiscussionThread
  selected?: string
}

export const ProposalDiscussions = ({ thread, selected }: Props) => {
  const selectedElement = useRef<HTMLDivElement>(null)
  useEffect(() => {
    selectedElement.current?.scrollIntoView?.({ behavior: 'smooth' })
  }, [selected])

  return (
    <ProposalDiscussionsStyles mode={thread.mode}>
      <DiscussionsHeader>
        <h4>Discussion</h4>
        <Badge>
          {`${thread.mode} `}
          <Tooltip tooltipText="Dolore magna anim eu nisi qui.">
            <TooltipDefault />
          </Tooltip>
        </Badge>
      </DiscussionsHeader>
      {thread.discussionPosts.map((post, index) => {
        const isSelected = selected === post.id
        const ref = isSelected ? selectedElement : undefined
        return <ForumComment key={index} ref={ref} post={post} isSelected={isSelected} />
      })}

      <Editor>
        <CKEditor />
      </Editor>
    </ProposalDiscussionsStyles>
  )
}

const DiscussionsHeader = styled.header`
  display: inline-flex;
  align-items: center;
  padding-bottom: ${spacing(1)};

  ${Badge} {
    display: inline-flex;
    column-gap: ${spacing(1 / 2)};
    height: fit-content;
    margin-left: ${spacing(1)};
    padding: ${spacing(1 / 2, 1)};
    text-transform: uppercase;
  }
`

const Editor = styled.div`
  margin-top: 20px;
`

const ProposalDiscussionsStyles = styled.div<Pick<ProposalDiscussionThread, 'mode'>>`
  margin-top: ${spacing(1)};
  ${ForumCommentStyles} {
    margin-top: ${spacing(3)};
  }

  ${DiscussionsHeader} ${Badge} {
    ${({ mode }) =>
      mode === 'open'
        ? css`
            background-color: ${Colors.Green[50]};
            color: ${Colors.Green[500]};
          `
        : css`
            background-color: ${Colors.Black[75]};
            color: ${Colors.Black[500]};
          `}
  }
`
