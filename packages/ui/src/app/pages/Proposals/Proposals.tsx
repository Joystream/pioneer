import React from 'react'
import { css } from 'styled-components'

import { PageHeaderWithHint } from '@/app/components/PageHeaderWithHint'
import { PageLayout } from '@/app/components/PageLayout'
import { ProposalOrderByInput } from '@/common/api/queries'
import { ActivitiesBlock } from '@/common/components/Activities/ActivitiesBlock'
import { EmptyPagePlaceholder } from '@/common/components/EmptyPagePlaceholder/EmptyPagePlaceholder'
import { MainPanel } from '@/common/components/page/PageContent'
import { SidePanel } from '@/common/components/page/SidePanel'
import { Pagination } from '@/common/components/Pagination'
import { useRefetchQueries } from '@/common/hooks/useRefetchQueries'
import { useSort } from '@/common/hooks/useSort'
import { MILLISECONDS_PER_BLOCK } from '@/common/model/formatters'
import { AddProposalButton } from '@/proposals/components/AddProposalButton'
import { ProposalList } from '@/proposals/components/ProposalList'
import { useProposals } from '@/proposals/hooks/useProposals'
import { useProposalsActivities } from '@/proposals/hooks/useProposalsActivities'

import { ProposalsTabs } from './components/ProposalsTabs'

export const Proposals = () => {
  const { order, getSortProps } = useSort<ProposalOrderByInput>('statusSetAtTime')

  const { proposals, isLoading, pagination } = useProposals({ order: order, status: 'active' })
  useRefetchQueries({ interval: MILLISECONDS_PER_BLOCK, include: ['getProposals'] })
  const { activities } = useProposalsActivities()

  return (
    <PageLayout
      header={
        <PageHeaderWithHint
          title="Proposals"
          hintType="proposals"
          tabs={<ProposalsTabs />}
          buttons={<AddProposalButton />}
        />
      }
      main={
        proposals.length || isLoading ? (
          <MainPanel>
            <ProposalList getSortProps={getSortProps} proposals={proposals} isLoading={isLoading} />
            <Pagination {...pagination} />
          </MainPanel>
        ) : (
          <EmptyPagePlaceholder
            title="There are no current proposals yet"
            copy="The proposal system is the way changes to the platform state and policy are suggested, discussed, voted on by the
      council, and finalized as accepted or rejected."
            button={<AddProposalButton />}
          />
        )
      }
      sidebar={
        proposals.length > 0 && (
          <SidePanel>
            <ActivitiesBlock activities={activities} label="Proposals Activities" />
          </SidePanel>
        )
      }
      responsiveStyle={proposals.length > 0 ? ProposalsPageResponsiveStyle : undefined}
    />
  )
}

export const ProposalsPageResponsiveStyle = css`
  @media (min-width: 768px) {
    grid-template-columns: 7fr 5fr;
    grid-template-rows: auto 1fr;
    grid-template-areas:
      'header header'
      'main sidebar';

    aside {
      position: absolute;
      top: 0;
      bottom: 0;
      padding-left: 16px;

      > div {
        min-height: 184px;
        overflow: hidden;
      }
    }
  }
`
