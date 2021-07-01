import React, { useRef } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import { PageLayout } from '@/app/components/PageLayout'
import { BadgesRow, BadgeStatus } from '@/common/components/BadgeStatus'
import { ButtonGhost } from '@/common/components/buttons/Buttons'
import { LinkIcon } from '@/common/components/icons/LinkIcon'
import { Loading } from '@/common/components/Loading'
import { ContentWithSidepanel, ContentWithTabs, MainPanel, RowGapBlock } from '@/common/components/page/PageContent'
import { PageHeader } from '@/common/components/page/PageHeader'
import { PageTitle } from '@/common/components/page/PageTitle'
import { PreviousPage } from '@/common/components/page/PreviousPage'
import { SidePanel } from '@/common/components/page/SidePanel'
import { Label, TextInlineMedium, TextMedium } from '@/common/components/typography'
import { camelCaseToText } from '@/common/helpers'
import { useCopyToClipboard } from '@/common/hooks/useCopyToClipboard'
import { formatBlocksToDuration, formatTokenValue } from '@/common/model/formatters'
import { spacing } from '@/common/utils/styles'
import { MemberInfo } from '@/memberships/components'
import { RationalePreview } from '@/proposals/components/RationalePreview'
import { ProposalStatistics } from '@/proposals/components/StatisticsPreview'
import { VotesPreview } from '@/proposals/components/VotesPreview/VotesPreview'
import { useBlocksToProposalExecution } from '@/proposals/hooks/useBlocksToProposalExecution'
import { useConstants } from '@/proposals/hooks/useConstants'
import { useProposal } from '@/proposals/hooks/useProposal'
import { useProposalVotes } from '@/proposals/hooks/useProposalVotes'

export const ProposalPreview = () => {
  const { id } = useParams<{ id: string }>()
  const { isLoading, proposal } = useProposal(id)
  const constants = useConstants(proposal?.details)

  const { copyValue } = useCopyToClipboard()
  const sideNeighborRef = useRef<HTMLDivElement>(null)
  const blocksToProposalExecution = useBlocksToProposalExecution(proposal, constants)

  const votes = useProposalVotes(proposal?.votes)

  if (isLoading || !proposal || !votes) {
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

          <RowGapBlock gap={24}>
            <BadgeAndTime>
              <BadgeStatus inverted size="l">
                {camelCaseToText(proposal.status)}
              </BadgeStatus>
              {blocksToProposalExecution && (
                <TextMedium>
                  <TextInlineMedium lighter>Time left:</TextInlineMedium>{' '}
                  <TextInlineMedium bold>{formatBlocksToDuration(blocksToProposalExecution)}</TextInlineMedium>{' '}
                  <TextInlineMedium lighter>({formatTokenValue(blocksToProposalExecution)} blocks)</TextInlineMedium>
                </TextMedium>
              )}
            </BadgeAndTime>
          </RowGapBlock>
        </PageHeader>
      }
      main={
        <MainPanel ref={sideNeighborRef}>
          <RowGapBlock gap={24}>
            <ProposalStatistics voteCount={votes.count} constants={constants} />

            {/* Proposal-specific dashboard */}
            <h3>{camelCaseToText(proposal.details)}</h3>

            <RationalePreview rationale={proposal.rationale} />

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
            <VotesPreview votes={votes} />

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
const BadgeAndTime = styled(BadgesRow)`
  gap: ${spacing(2)};
`
