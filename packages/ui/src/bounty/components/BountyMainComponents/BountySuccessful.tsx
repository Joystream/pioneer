import React, { useMemo, useState } from 'react'

import { BountyFooter } from '@/bounty/components/BountyFooter'
import { BountySidebar } from '@/bounty/components/BountySidebar/BountySidebar'
import { ResultsTiles } from '@/bounty/components/BountyTiles/ResultsTiles'
import { BountyTab } from '@/bounty/components/tabs/BountyTab'
import { SlashedTab } from '@/bounty/components/tabs/SlashedTab'
import { WinnersTab } from '@/bounty/components/tabs/WinnersTab'
import { WorkTab } from '@/bounty/components/tabs/WorkTab'
import { ResultsTabs, ResultsTabsState } from '@/bounty/components/tabsSets/ResultsTabs'
import { statusToEntrantResult } from '@/bounty/helpers'
import { useBountyEntrants } from '@/bounty/hooks/useBountyEntrants'
import { useBountyPreviewTabViaUrlParameter } from '@/bounty/hooks/useBountyPreviewTabViaUrlParameter'
import { useBountyWithdrawns } from '@/bounty/hooks/useBountyWithdrawns'
import { Bounty } from '@/bounty/types/Bounty'
import { ContentWithSidePanel, MainPanel, RowGapBlock } from '@/common/components/page/PageContent'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { RationalePreview } from '@/proposals/components/RationalePreview'

interface Props {
  bounty: Bounty
}

export const BountySuccessful = React.memo(({ bounty }: Props) => {
  const [active, setActive] = useState<ResultsTabsState>('Bounty')
  const entrants = useBountyEntrants(bounty)
  const withdrawns = useBountyWithdrawns(bounty)
  const [wasSearched, setWasSearched] = useState<boolean>(false)
  const { active: activeMember } = useMyMemberships()
  const { status } =
    useMemo(() => bounty.entries?.find((entry) => entry.worker.id === activeMember?.id), [bounty]) || {}
  const entrantResult = status ? statusToEntrantResult(status) : undefined

  useBountyPreviewTabViaUrlParameter((tab) => {
    setActive(tab)
  })

  return (
    <>
      <MainPanel>
        <ResultsTiles bounty={bounty} />
        {bounty.judgement?.rationale && <RationalePreview rationale={bounty.judgement.rationale} />}
        <ResultsTabs setActive={setActive} active={active} />
        <ContentWithSidePanel>
          {active === 'Bounty' && <BountyTab bounty={bounty} />}
          {active === 'Slashed' && <SlashedTab bounty={bounty} />}
          {active === 'Winners' && <WinnersTab bounty={bounty} />}
          {active === 'Works' && (
            <WorkTab bountyId={bounty.id} wasSearched={wasSearched} setWasSearched={setWasSearched} />
          )}
          <RowGapBlock gap={4}>
            <BountySidebar
              contributors={bounty.contributors}
              entrants={entrants}
              withdrawals={withdrawns}
              entrantResult={entrantResult}
              stage="successful"
            />
          </RowGapBlock>
        </ContentWithSidePanel>
      </MainPanel>
      <BountyFooter bounty={bounty} />
    </>
  )
})
