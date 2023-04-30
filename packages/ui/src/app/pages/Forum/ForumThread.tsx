import { ForumPostMetadata } from '@joystream/metadata-protobuf'
import React, { useEffect, useRef } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'

import { useApi } from '@/api/hooks/useApi'
import { PageHeaderRow, PageHeaderWrapper } from '@/app/components/PageLayout'
import { BadgesRow, BadgeStatus } from '@/common/components/BadgeStatus'
import { BlockTime } from '@/common/components/BlockTime'
import { ButtonsGroup, CopyButtonTemplate } from '@/common/components/buttons'
import { EmptyPagePlaceholder } from '@/common/components/EmptyPagePlaceholder/EmptyPagePlaceholder'
import { LinkIcon } from '@/common/components/icons'
import { PinIcon } from '@/common/components/icons/PinIcon'
import { MainPanel, RowGapBlock } from '@/common/components/page/PageContent'
import { PreviousPage } from '@/common/components/page/PreviousPage'
import { Colors } from '@/common/constants'
import { createType } from '@/common/model/createType'
import { metadataToBytes } from '@/common/model/JoystreamNode'
import { getUrl } from '@/common/utils/getUrl'
import { PostList } from '@/forum/components/PostList/PostList'
import { NewThreadPost } from '@/forum/components/Thread/NewThreadPost'
import { ThreadTitle } from '@/forum/components/Thread/ThreadTitle'
import { WatchlistButton } from '@/forum/components/Thread/WatchlistButton'
import { ForumRoutes } from '@/forum/constant'
import { useForumThread } from '@/forum/hooks/useForumThread'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

import { ForumPageLayout } from './components/ForumPageLayout'

export const ForumThread = () => {
  const { id } = useParams<{ id: string }>()
  const { isLoading, thread, hasError } = useForumThread(id)
  const { api } = useApi()
  const { active } = useMyMemberships()

  const sideNeighborRef = useRef<HTMLDivElement>(null)
  const newPostRef = useRef<HTMLDivElement>(null)
  const history = useHistory()

  const isThreadActive = !!(thread && thread.status.__typename === 'ThreadStatusActive')

  const getTransaction = (postText: string, isEditable: boolean) => {
    if (api && active && thread) {
      const { categoryId, id: threadId } = thread
      return api.tx.forum.addPost(
        createType('ForumUserId', Number.parseInt(active.id)),
        categoryId,
        threadId,
        metadataToBytes(ForumPostMetadata, { text: postText, repliesTo: undefined }),
        isEditable
      )
    }
  }

  useEffect(() => {
    if (!isLoading && !thread && !hasError) {
      history.replace('/404')
    }
  }, [isLoading, thread])

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
            <CopyButtonTemplate
              size="medium"
              textToCopy={getUrl({ route: ForumRoutes.thread, params: { id: thread.id } })}
              icon={<LinkIcon />}
            >
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
                {tag.title}
              </BadgeStatus>
            ))}
            <BlockTime block={thread.createdInBlock} layout="reverse" position="end" />
          </BadgesRow>
        </RowGapBlock>
      </PageHeaderWrapper>
    )
  }

  const displayMain = () => (
    <ThreadPanel ref={sideNeighborRef}>
      {hasError ? (
        <EmptyPagePlaceholder title="Something went wrong fetching this thread." copy="" button={null} />
      ) : (
        <>
          <PostList threadId={id} isThreadActive={isThreadActive} isLoading={isLoading} />
          {thread && isThreadActive && <NewThreadPost ref={newPostRef} getTransaction={getTransaction} />}
        </>
      )}
    </ThreadPanel>
  )

  return <ForumPageLayout isThread header={displayHeader()} main={displayMain()} />
}

const ThreadPanel = styled(MainPanel)`
  margin: 0 auto;
  max-width: 1280px;
`

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
