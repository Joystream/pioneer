import React, { useMemo, useRef } from 'react'
import { useParams } from 'react-router-dom'

import { PageLayout } from '@/app/components/PageLayout'
import { BadgeStatus } from '@/common/components/BadgeStatus'
import { ButtonGhost } from '@/common/components/buttons/Buttons'
import { LinkIcon } from '@/common/components/icons/LinkIcon'
import { Loading } from '@/common/components/Loading'
import { MarkdownPreview } from '@/common/components/MarkdownPreview'
import { ContentWithSidepanel, ContentWithTabs, MainPanel, RowGapBlock } from '@/common/components/page/PageContent'
import { PageHeader } from '@/common/components/page/PageHeader'
import { PageTitle } from '@/common/components/page/PageTitle'
import { PreviousPage } from '@/common/components/page/PreviousPage'
import { SidePanel } from '@/common/components/page/SidePanel'
import { Statistics } from '@/common/components/statistics'
import { Label } from '@/common/components/typography'
import { camelCaseToText } from '@/common/helpers'
import { useCopyToClipboard } from '@/common/hooks/useCopyToClipboard'
import { MemberInfo } from '@/memberships/components'
import { useProposal } from '@/proposals/hooks/useProposal'

import { randomMarkdown } from '../../../../dev/scripts/generators/utils'

export const ProposalPreview = () => {
  const { id } = useParams<{ id: string }>()
  const { isLoading, proposal } = useProposal(id)
  const { copyValue } = useCopyToClipboard()
  const sideNeighborRef = useRef<HTMLDivElement>(null)

  const rationale = useMemo(randomMarkdown, [])

  if (isLoading || !proposal) {
    return (
      <PageLayout
        lastBreadcrumb={id}
        main={
          <RowGapBlock gap={24}>
            <ContentWithSidepanel>
              <Loading />
            </ContentWithSidepanel>
          </RowGapBlock>
        }
      />
    )
  }

  return (
    <PageLayout
      lastBreadcrumb={proposal.title}
      header={
        <PageHeader>
          <PreviousPage>
            <PageTitle>{proposal.title}</PageTitle>
          </PreviousPage>

          <ButtonGhost size="medium" onClick={() => copyValue(window.location.href)}>
            <LinkIcon />
            Copy link
          </ButtonGhost>
        </PageHeader>
      }
      main={
        <MainPanel ref={sideNeighborRef}>
          <RowGapBlock gap={24}>
            <div>
              <BadgeStatus inverted size="l">
                {camelCaseToText(proposal.status)}
              </BadgeStatus>
              {/* Time Left */}
            </div>

            {/* Statistics */}
            <Statistics></Statistics>

            {/* Proposal-specific dashboard */}
            <h3>{camelCaseToText(proposal.details)}</h3>

            {/* Rationale */}
            <RowGapBlock gap={8}>
              <h4>Rationale</h4>
              <MarkdownPreview markdown={rationale} />
            </RowGapBlock>

            {/* Discussion */}
            <div>
              <h4>Discussion</h4>
            </div>
          </RowGapBlock>
        </MainPanel>
      }
      sidebar={
        <SidePanel neighbor={sideNeighborRef}>
          <RowGapBlock gap={36}>
            {/* Voting dashboard */}

            {/* Proposal stages history */}

            {/* Proposer */}
            <ContentWithTabs>
              <Label>Proposer</Label>
              <MemberInfo member={proposal.proposer} />
            </ContentWithTabs>
          </RowGapBlock>
        </SidePanel>
      }
    />
  )
}
