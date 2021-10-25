import { BN_ZERO } from '@polkadot/util'
import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { PageHeaderRow, PageHeaderWrapper, PageLayout } from '@/app/components/PageLayout'
import { BadgesRow, BadgeStatus } from '@/common/components/BadgeStatus'
import { BlockTime } from '@/common/components/BlockTime'
import { ButtonsGroup, CopyButtonTemplate } from '@/common/components/buttons'
import { LinkIcon } from '@/common/components/icons'
import { Loading } from '@/common/components/Loading'
import { MainPanel, RowGapBlock } from '@/common/components/page/PageContent'
import { PageTitle } from '@/common/components/page/PageTitle'
import { PreviousPage } from '@/common/components/page/PreviousPage'
import { getUrl } from '@/common/utils/getUrl'
import { PastCouncilStats } from '@/council/components/pastCouncil/PastCouncilStats'
import { PastCouncilTabs } from '@/council/components/pastCouncil/PastCouncilTabs/PastCouncilTabs'
import { CouncilRoutes } from '@/council/constants'
import { usePastCouncil } from '@/council/hooks/usePastCouncil'

export const PastCouncil = () => {
  const history = useHistory()

  const { id } = useParams<{ id: string }>()
  const { isLoading, council } = usePastCouncil(id)

  useEffect(() => {
    if (!isLoading && !council) {
      history.replace('/404')
    }
  }, [isLoading, council])

  const displayHeader = () => {
    if (isLoading || !council) {
      return null
    }

    return (
      <PageHeaderWrapper>
        <PageHeaderRow showOverflow>
          <PreviousPage showOverflow>
            <PageTitle>Council #{council.id}</PageTitle>
          </PreviousPage>
          <ButtonsGroup>
            <CopyButtonTemplate
              size="medium"
              textToCopy={getUrl({ route: CouncilRoutes.pastCouncil, params: { id: council.id } })}
              icon={<LinkIcon />}
            >
              Copy link
            </CopyButtonTemplate>
          </ButtonsGroup>
        </PageHeaderRow>
        <RowGapBlock>
          <BadgesRow space={8}>
            <BadgeStatus inverted size="l">
              Past Council
            </BadgeStatus>
            <BlockTime
              block={{
                network: 'OLYMPIA',
                timestamp: new Date().toString(),
                number: council.endedAtBlock,
              }}
              lessInfo
              dateLabel="Term ended at"
              layout="row"
            />
          </BadgesRow>
        </RowGapBlock>
      </PageHeaderWrapper>
    )
  }

  const displayMain = () => {
    return (
      <MainPanel>
        {isLoading && <Loading />}
        {!isLoading && council && (
          <>
            <PastCouncilStats
              totalSpent={BN_ZERO}
              totalMissedRewards={council.totalMissedRewards}
              totalPaidRewards={council.totalPaidRewards}
              totalSpentOnProposals={BN_ZERO}
            />
            <PastCouncilTabs council={council} />
          </>
        )}
      </MainPanel>
    )
  }

  return <PageLayout header={displayHeader()} main={displayMain()} />
}
