import React, { useEffect } from 'react'
import { generatePath, Link, useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'

import { PageHeaderWithButtons, PageHeaderWrapper, PageLayout } from '@/app/components/PageLayout'
import { BadgesRow, BadgeStatus, BadgeStatusCss } from '@/common/components/BadgeStatus'
import { ButtonsGroup, CopyButtonTemplate } from '@/common/components/buttons'
import { LinkIcon } from '@/common/components/icons'
import { Loading } from '@/common/components/Loading'
import { MainPanel, RowGapBlock } from '@/common/components/page/PageContent'
import { PageTitle } from '@/common/components/page/PageTitle'
import { PreviousPage } from '@/common/components/page/PreviousPage'
import { Tooltip, TooltipDefault } from '@/common/components/Tooltip'
import { getUrl } from '@/common/utils/getUrl'
import { PastElectionStats } from '@/council/components/election/pastElection/PastElectionStats'
import { PastElectionTabs } from '@/council/components/election/pastElection/PastElectionTabs'
import { CouncilRoutes, ElectionRoutes } from '@/council/constants'
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
        <PageHeaderWithButtons showOverflow>
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
        </PageHeaderWithButtons>
        <RowGapBlock>
          <BadgesRow space={8}>
            <BadgeStatus inverted size="l">
              Past Election
            </BadgeStatus>
            {election.result == 'successful' ? (
              <StyledBadge to={generatePath(CouncilRoutes.pastCouncil, { id: election.id })} succeeded>
                Successful
              </StyledBadge>
            ) : (
              <TooltipBadge ended size="l">
                <span>Failed</span>
                <Tooltip
                  tooltipText={
                    "The process didn't complete because there weren't enough candidates, votes cast or revealed, or the voting stage was missing"
                  }
                  tooltipTitle={'Election Failed'}
                >
                  <TooltipDefault />
                </Tooltip>
              </TooltipBadge>
            )}
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
const StyledBadge = styled(Link)`
  ${BadgeStatusCss}
`
const TooltipBadge = styled(BadgeStatus)`
  display: flex;
  align-items: center;
  gap: 4px;
`
