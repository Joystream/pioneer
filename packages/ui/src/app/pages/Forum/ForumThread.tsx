import React, { useRef } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { PageLayout } from '@/app/components/PageLayout'
import { ActivitiesBlock } from '@/common/components/Activities/ActivitiesBlock'
import { ButtonGhost, ButtonsGroup } from '@/common/components/buttons'
import { LinkIcon, WatchIcon } from '@/common/components/icons'
import { Loading } from '@/common/components/Loading'
import { PageHeader } from '@/common/components/page/PageHeader'
import { PageTitle } from '@/common/components/page/PageTitle'
import { PreviousPage } from '@/common/components/page/PreviousPage'
import { SidePanel } from '@/common/components/page/SidePanel'
import { useCopyToClipboard } from '@/common/hooks/useCopyToClipboard'
import { useForumThread } from '@/forum/hooks/useForumThread'

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
      </PageHeader>
    )
  }

  const displayMain = () => {
    if (isLoading) {
      return <Loading />
    }

    return <div>Thread content</div>
  }

  const displaySidebar = () => {
    if (isLoading) {
      return null
    }

    return (
      <SidePanel neighbor={sideNeighborRef}>
        <ActivitiesBlock activities={[]} label="Suggested Threads" />
      </SidePanel>
    )
  }

  return <PageLayout header={displayHeader()} main={displayMain()} sidebar={displaySidebar()} />
}
