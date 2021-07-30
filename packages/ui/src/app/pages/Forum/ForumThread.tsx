import React, { useRef } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'

import { PageLayout } from '@/app/components/PageLayout'
import { BadgesRow, BadgeStatus } from '@/common/components/BadgeStatus'
import { BlockInfo } from '@/common/components/BlockTime/BlockInfo'
import { ButtonGhost, ButtonsGroup } from '@/common/components/buttons'
import { CKEditor } from '@/common/components/CKEditor'
import { LinkIcon, WatchIcon } from '@/common/components/icons'
import { PinIcon } from '@/common/components/icons/PinIcon'
import { Loading } from '@/common/components/Loading'
import { MainPanel, RowGapBlock } from '@/common/components/page/PageContent'
import { PageHeader } from '@/common/components/page/PageHeader'
import { PageTitle } from '@/common/components/page/PageTitle'
import { PreviousPage } from '@/common/components/page/PreviousPage'
import { SidePanel } from '@/common/components/page/SidePanel'
import { Colors } from '@/common/constants'
import { useCopyToClipboard } from '@/common/hooks/useCopyToClipboard'
import { PostList } from '@/forum/components/PostList/PostList'
import { SuggestedThreads } from '@/forum/components/SuggestedThreads/SuggestedThreads'
import { useForumThread } from '@/forum/hooks/useForumThread'
import { PostMessageForm } from '@/proposals/components/ProposalDiscussions'

export const ForumThread = () => {
  const { id } = useParams<{ id: string }>()
  const { isLoading, thread } = useForumThread(id)

  const { copyValue } = useCopyToClipboard()
  const sideNeighborRef = useRef<HTMLDivElement>(null)
  const history = useHistory()

  if (!isLoading && !thread) {
    history.push('/404')

    return null
  }

  const displayHeader = () => {
    if (isLoading || !thread) {
      return null
    }

    return (
      <PageHeader>
        <PreviousPage>
          <PageTitle>{thread.title}</PageTitle>
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
            {thread.isSticky && (
              <ThreadPinned>
                <PinIcon />
              </ThreadPinned>
            )}
            <BadgeStatus inverted size="l" separated>
              Tag
            </BadgeStatus>
            <BlockInfo block={thread.createdInBlock} />
          </BadgesRow>
        </RowGapBlock>
      </PageHeader>
    )
  }

  const displayMain = () => {
    if (isLoading || !thread) {
      return <Loading />
    }

    return (
      <MainPanel ref={sideNeighborRef}>
        <PostList threadId={thread.id} />
        <PostMessageForm>
          <CKEditor />
        </PostMessageForm>
      </MainPanel>
    )
  }

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
