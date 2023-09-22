import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'

import { PageHeaderRow, PageHeaderWrapper, PageLayout } from '@/app/components/PageLayout'
import { BadgesRow, BadgeStatus } from '@/common/components/BadgeStatus'
import { ButtonsGroup, CopyButtonTemplate } from '@/common/components/buttons'
import { LinkIcon } from '@/common/components/icons'
import { Loading } from '@/common/components/Loading'
import { MainPanel, RowGapBlock } from '@/common/components/page/PageContent'
import { PageTitle } from '@/common/components/page/PageTitle'
import { PreviousPage } from '@/common/components/page/PreviousPage'
import { getUrl } from '@/common/utils/getUrl'
import { PastElectionStats } from '@/council/components/election/pastElection/PastElectionStats'
import { PastElectionTabs } from '@/council/components/election/pastElection/PastElectionTabs'
import { ElectionRoutes } from '@/council/constants'
import { useCandidatePreviewViaUrlParameter } from '@/council/hooks/useCandidatePreviewViaUrlParameter'
import { usePastElection } from '@/council/hooks/usePastElection'

export const PastElection = () => {
  useCandidatePreviewViaUrlParameter()
  const history = useHistory()

  const { id } = useParams<{ id: string }>()
  const { isLoading, election } = usePastElection(id)

  useEffect(() => {
    if (!isLoading && !election) {
      history.replace('/404')
    }
  }, [isLoading, election])

  const displayHeader = () => {
    if (isLoading || !election) {
      return null
    }

    return (
      <PageHeaderWrapper>
        <HeaderWrapper showOverflow>
          <PreviousPage showOverflow>
            <PageTitle>Election #{election.cycleId}</PageTitle>
          </PreviousPage>
          <ButtonsGroup>
            <CopyButtonTemplate
              size="medium"
              textToCopy={getUrl({ route: ElectionRoutes.pastElection, params: { id: election.id } })}
              icon={<LinkIcon />}
            >
              Copy link
            </CopyButtonTemplate>
          </ButtonsGroup>
        </HeaderWrapper>
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
        {!isLoading && election && (
          <>
            <PastElectionStats {...election} />
            <PastElectionTabs election={election} />
          </>
        )}
      </MainPanel>
    )
  }

  return <PageLayout header={displayHeader()} main={displayMain()} lastBreadcrumb={'Election #' + id} />
}

const HeaderWrapper = styled(PageHeaderRow)`
  @media (max-width: 767px) {
    display: flex;
    flex-direction: column;
    gap: 16px;

    ${ButtonsGroup} {
      grid-auto-flow: row;
      grid-row-gap: 8px;
      width: 100%;

      button {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center:
        gap: 4px;
      }
    }
  }
`
