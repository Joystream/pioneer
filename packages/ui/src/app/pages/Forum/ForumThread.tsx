import React, { useRef } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'

import { PageHeaderWrapper, PageHeaderRow } from '@/app/components/PageLayout'
import { BadgesRow, BadgeStatus } from '@/common/components/BadgeStatus'
import { BlockInfo } from '@/common/components/BlockTime/BlockInfo'
import { ButtonsGroup, CopyButtonTemplate } from '@/common/components/buttons'
import { LinkIcon } from '@/common/components/icons'
import { PinIcon } from '@/common/components/icons/PinIcon'
import { MainPanel, RowGapBlock } from '@/common/components/page/PageContent'
import { PreviousPage } from '@/common/components/page/PreviousPage'
import { SidePanel } from '@/common/components/page/SidePanel'
import { Colors } from '@/common/constants'
import { PostList } from '@/forum/components/PostList/PostList'
import { SuggestedThreads } from '@/forum/components/SuggestedThreads'
import { NewThreadPost } from '@/forum/components/Thread/NewThreadPost'
import { ThreadTitle } from '@/forum/components/Thread/ThreadTitle'
import { WatchlistButton } from '@/forum/components/Thread/WatchlistButton'
import { useForumThread } from '@/forum/hooks/useForumThread'

import { ForumPageLayout } from './components/ForumPageLayout'

export const ForumThread = () => {
  const { id } = useParams<{ id: string }>()
  const { isLoading, thread } = useForumThread(id)

  const sideNeighborRef = useRef<HTMLDivElement>(null)
  const history = useHistory()

  const isThreadActive = !!(thread && thread.status.__typename === 'ThreadStatusActive')

  if (!isLoading && !thread) {
    history.replace('/404')

    return null
  }

  const displayHeader = () => {
    if (isLoading || !thread) {
      return null
    }

    return (
      <PageHeaderWrapper>
        <PageHeaderRow showOverflow>
          <PreviousPage showOverflow>
            <ThreadTitle thread={thread} />
          </PreviousPage>
          <ButtonsGroup>
            <CopyButtonTemplate size="medium" textToCopy={window.location.href} icon={<LinkIcon />}>
              Copy link
            </CopyButtonTemplate>
            <WatchlistButton threadId={thread.id} />
          </ButtonsGroup>
        </PageHeaderRow>
        <RowGapBlock>
          <BadgesRow space={8}>
            {thread.isSticky && (
              <ThreadPinned>
                <PinIcon />
              </ThreadPinned>
            )}
            {thread.tags.map((tag, index) => (
              <BadgeStatus inverted size="l" key={index}>
                {tag}
              </BadgeStatus>
            ))}
            <BlockInfo block={thread.createdInBlock} />
          </BadgesRow>
        </RowGapBlock>
      </PageHeaderWrapper>
    )
  }

  const displayMain = () => (
    <MainPanel ref={sideNeighborRef}>
      <PostList threadId={id} isThreadActive={isThreadActive} isLoading={isLoading} />
      {thread && isThreadActive && <NewThreadPost thread={thread} />}
    </MainPanel>
  )

  const displaySidebar = () => {
    if (isLoading || !thread) {
      return null
    }

    return (
      <SidePanel neighbor={sideNeighborRef}>
        <SuggestedThreads />
      </SidePanel>
    )
  }

  return <ForumPageLayout isThread header={displayHeader()} main={displayMain()} sidebar={displaySidebar()} />
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
