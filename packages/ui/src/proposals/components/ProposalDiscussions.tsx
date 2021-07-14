import React from 'react'
import styled, { css } from 'styled-components'

import { ForumComment, ForumCommentStyles } from '@/common/components/Forum/ForumComment'
import { Tooltip, TooltipDefault } from '@/common/components/Tooltip'
import { Badge } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { spacing } from '@/common/utils/styles'
import { ProposalDiscussionThread } from '@/proposals/types'

interface Props {
  thread: ProposalDiscussionThread
}

export const ProposalDiscussions = ({ thread }: Props) => (
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
    {thread.discussionPosts.map((post, index) => (
      <ForumComment key={index} post={post} />
    ))}
  </ProposalDiscussionsStyles>
)

const DiscussionsHeader = styled.header`
  display: inline-flex;
  padding-bottom: ${spacing(1)};

  ${Badge} {
    display: inline-flex;
    column-gap: ${spacing(1 / 2)};
    height: unset;
    margin-left: ${spacing(1)};
    padding: ${spacing(1 / 2, 1)};
    text-transform: uppercase;
  }
`

interface ProposalDiscussionsStylesProps {
  mode: ProposalDiscussionThread['mode']
}
const ProposalDiscussionsStyles = styled.div<ProposalDiscussionsStylesProps>`
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
            background-color: ${Colors.Red[50]};
            color: ${Colors.Red[200]};
          `}
  }
`
