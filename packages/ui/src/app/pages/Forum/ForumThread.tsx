import React from 'react'
import { useParams } from 'react-router-dom'

import { PageLayout } from '@/app/components/PageLayout'
import { ButtonGhost, ButtonsGroup } from '@/common/components/buttons'
import { LinkIcon, WatchIcon } from '@/common/components/icons'
import { Loading } from '@/common/components/Loading'
import { PageHeader } from '@/common/components/page/PageHeader'
import { PageTitle } from '@/common/components/page/PageTitle'
import { PreviousPage } from '@/common/components/page/PreviousPage'
import { useCopyToClipboard } from '@/common/hooks/useCopyToClipboard'
import { useForumThread } from '@/forum/hooks/useForumThread'

export const ForumThread = () => {
  const { id } = useParams<{ id: string }>()
  const { isLoading, thread } = useForumThread(id)

  const { copyValue } = useCopyToClipboard()

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
      </PageHeader>
    )
  }

  const displayMain = () => {
    if (isLoading) {
      return <Loading />
    }
    if (!thread) {
      return <h1>404 Not Found</h1>
    }

    return <div>Thread content</div>
  }

  return <PageLayout header={displayHeader()} main={displayMain()} />
}
