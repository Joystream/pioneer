import React, { useRef } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'

import { PageLayout } from '@/app/components/PageLayout'
import { BadgesRow, BadgeStatus } from '@/common/components/BadgeStatus'
import { BlockInfo } from '@/common/components/BlockTime/BlockInfo'
import { ButtonGhost, ButtonsGroup } from '@/common/components/buttons'
import { LinkIcon, WatchIcon } from '@/common/components/icons'
import { PinIcon } from '@/common/components/icons/PinIcon'
import { Loading } from '@/common/components/Loading'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { PageHeader } from '@/common/components/page/PageHeader'
import { PageTitle } from '@/common/components/page/PageTitle'
import { PreviousPage } from '@/common/components/page/PreviousPage'
import { SidePanel } from '@/common/components/page/SidePanel'
import { Colors } from '@/common/constants'
import { useCopyToClipboard } from '@/common/hooks/useCopyToClipboard'
import { Block } from '@/common/types'
import { SuggestedThreads } from '@/forum/components/SuggestedThreads'
import { useForumPosts } from '@/forum/hooks/useForumPosts'
import { useForumThread } from '@/forum/hooks/useForumThread'

export const ForumThread = () => {
  const { id } = useParams<{ id: string }>()
  const { isLoading, thread } = useForumThread(id)
  const { posts } = useForumPosts(id)

  const { copyValue } = useCopyToClipboard()
  const sideNeighborRef = useRef<HTMLDivElement>(null)
  const history = useHistory()

  if (!isLoading && !thread) {
    history.push('/404')

    return null
  }

  const displayHeader = () => {
    if (isLoading) {
      return null
    }

    return (
      <PageHeader>
        <PreviousPage>
          <PageTitle>{thread?.title}</PageTitle>
        </PreviousPage>
        <ButtonsGroup>
          <ButtonGhost size="medium" onClick={() => copyValue(window.location.href)}>
            <LinkIcon />
            Copy link
          </ButtonGhost>
          <ButtonGhost size="medium">
            <WatchIcon />
            Watch thread
          </ButtonGhost>
        </ButtonsGroup>
        <RowGapBlock>
          <BadgesRow>
            {thread?.isSticky && (
              <ThreadPinned>
                <PinIcon />
              </ThreadPinned>
            )}
            <BadgeStatus inverted size="l" separated>
              Tag
            </BadgeStatus>
            <BlockInfo block={thread?.createdInBlock as Block} />
          </BadgesRow>
        </RowGapBlock>
      </PageHeader>
    )
  }

  const displayMain = () => {
    if (isLoading) {
      return <Loading />
    }

    return (
      <div>
        {posts.map((post) => (
          <div>
            {post.id} | {post.text} | by {post.authorId}
          </div>
        ))}
      </div>
    )
  }

  const displaySidebar = () => {
    if (isLoading) {
      return null
    }

    return (
      <SidePanel neighbor={sideNeighborRef}>
        <SuggestedThreads />
      </SidePanel>
    )
  }

  return <PageLayout header={displayHeader()} main={displayMain()} sidebar={displaySidebar()} />
}

const ThreadPinned = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  padding-left: 3px;

  & > svg {
    color: ${Colors.Black['500']};
  }
`
