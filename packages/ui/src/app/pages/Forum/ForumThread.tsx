import React, { useRef } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'

import { PageLayout, PageHeaderWrapper, PageHeaderRow } from '@/app/components/PageLayout'
import { BadgesRow, BadgeStatus } from '@/common/components/BadgeStatus'
import { BlockInfo } from '@/common/components/BlockTime/BlockInfo'
import { ButtonGhost, ButtonsGroup, CopyButtonTemplate } from '@/common/components/buttons'
import { CKEditor } from '@/common/components/CKEditor'
import { InputComponent } from '@/common/components/forms'
import { LinkIcon, WatchIcon } from '@/common/components/icons'
import { PinIcon } from '@/common/components/icons/PinIcon'
import { Loading } from '@/common/components/Loading'
import { MainPanel, RowGapBlock } from '@/common/components/page/PageContent'
import { PageTitle } from '@/common/components/page/PageTitle'
import { PreviousPage } from '@/common/components/page/PreviousPage'
import { SidePanel } from '@/common/components/page/SidePanel'
import { Colors } from '@/common/constants'
import { PostList } from '@/forum/components/PostList/PostList'
import { SuggestedThreads } from '@/forum/components/SuggestedThreads'
import { useForumThread } from '@/forum/hooks/useForumThread'

export const ForumThread = () => {
  const { id } = useParams<{ id: string }>()
  const { isLoading, thread } = useForumThread(id)

  const sideNeighborRef = useRef<HTMLDivElement>(null)
  const history = useHistory()

  const isThreadActive = thread?.status === 'ThreadStatusActive'

  if (!isLoading && !thread) {
    history.push('/404')

    return null
  }

  const displayHeader = () => {
    if (isLoading || !thread) {
      return null
    }

    return (
      <PageHeaderWrapper>
        <PageHeaderRow>
          <PreviousPage>
            <PageTitle>{thread.title}</PageTitle>
          </PreviousPage>
          <ButtonsGroup>
            <CopyButtonTemplate size="medium" textToCopy={window.location.href} icon={<LinkIcon />}>
              Copy link
            </CopyButtonTemplate>
            <ButtonGhost size="medium">
              <WatchIcon />
              Watch thread
            </ButtonGhost>
          </ButtonsGroup>
        </PageHeaderRow>
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
      </PageHeaderWrapper>
    )
  }

  const displayMain = () => {
    if (isLoading || !thread) {
      return <Loading />
    }

    return (
      <MainPanel ref={sideNeighborRef}>
        <PostList threadId={thread.id} isThreadActive={isThreadActive} />
        {isThreadActive && (
          <InputComponent inputSize="auto">
            <CKEditor />
          </InputComponent>
        )}
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
