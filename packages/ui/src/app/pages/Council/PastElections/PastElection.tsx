import React from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { PageHeaderRow, PageHeaderWrapper, PageLayout } from '@/app/components/PageLayout'
import { BadgesRow, BadgeStatus } from '@/common/components/BadgeStatus'
import { BlockInfo } from '@/common/components/BlockTime/BlockInfo'
import { ButtonsGroup, CopyButtonTemplate } from '@/common/components/buttons'
import { LinkIcon } from '@/common/components/icons'
import { PinIcon } from '@/common/components/icons/PinIcon'
import { Loading } from '@/common/components/Loading'
import { MainPanel, RowGapBlock } from '@/common/components/page/PageContent'
import { PageTitle } from '@/common/components/page/PageTitle'
import { PreviousPage } from '@/common/components/page/PreviousPage'
import { getUrl } from '@/common/utils/getUrl'
import { CouncilRoutes } from '@/council/constants'
import { usePastElection } from '@/council/hooks/usePastElection'
import { ThreadTitle } from '@/forum/components/Thread/ThreadTitle'
import { WatchlistButton } from '@/forum/components/Thread/WatchlistButton'
import { ForumRoutes } from '@/forum/constant'

import { CouncilTabs } from '../components/CouncilTabs'

export const PastElection = () => {
  const { id } = useParams<{ id: string }>()
  const { isLoading, election } = usePastElection(id)

  const history = useHistory()

  if (!isLoading && !election) {
    history.replace('/404')

    return null
  }

  const displayHeader = () => {
    if (isLoading || !election) {
      return null
    }

    return (
      <PageHeaderWrapper>
        <PageHeaderRow showOverflow>
          <PreviousPage showOverflow>
            <PageTitle>Election #{election.cycleId}</PageTitle>
          </PreviousPage>
          <ButtonsGroup>
            <CopyButtonTemplate
              size="medium"
              textToCopy={getUrl({ route: CouncilRoutes.pastElection, params: { id: election.id } })}
              icon={<LinkIcon />}
            >
              Copy link
            </CopyButtonTemplate>
          </ButtonsGroup>
        </PageHeaderRow>
        <RowGapBlock>
          <BadgesRow space={8}>
            <BadgeStatus inverted size="l">
              Past Election
            </BadgeStatus>
          </BadgesRow>
        </RowGapBlock>
      </PageHeaderWrapper>
    )
  }

  const displayMain = () => {
    return (
      <MainPanel>
        {isLoading && <Loading />}
        {!isLoading && <>Something</>}
      </MainPanel>
    )
  }

  return <PageLayout header={displayHeader()} main={displayMain()} />
}
