import React, { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'

import { PageHeaderRow, PageHeaderWrapper, PageLayout } from '@/app/components/PageLayout'
import { BadgesRow, BadgeStatus } from '@/common/components/BadgeStatus'
import { CopyButtonTemplate } from '@/common/components/buttons'
import { ButtonPrimary, ButtonsGroup } from '@/common/components/buttons/Buttons'
import { LinkIcon } from '@/common/components/icons/LinkIcon'
import { Loading } from '@/common/components/Loading'
import { ContentWithSidePanel, MainPanel, RowGapBlock } from '@/common/components/page/PageContent'
import { PageTitle } from '@/common/components/page/PageTitle'
import { PreviousPage } from '@/common/components/page/PreviousPage'
import { SidePanel } from '@/common/components/page/SidePanel'
import { Label, TextInlineMedium, TextMedium } from '@/common/components/typography'
import { camelCaseToText } from '@/common/helpers'
import { useModal } from '@/common/hooks/useModal'
import { useRefetchQueries } from '@/common/hooks/useRefetchQueries'
import { formatBlocksToDuration, formatTokenValue, MILLISECONDS_PER_BLOCK } from '@/common/model/formatters'
import { getUrl } from '@/common/utils/getUrl'
import { useElectedCouncil } from '@/council/hooks/useElectedCouncil'
import { MemberInfo } from '@/memberships/components'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { ProposalDetails } from '@/proposals/components/ProposalDetails/ProposalDetails'
import { ProposalDiscussions } from '@/proposals/components/ProposalDiscussions'
import { ProposalHistory } from '@/proposals/components/ProposalHistory'
import { ProposalStages } from '@/proposals/components/ProposalStages'
import { RationalePreview } from '@/proposals/components/RationalePreview'
import { ProposalStatistics } from '@/proposals/components/StatisticsPreview'
import { VoteForProposalButton } from '@/proposals/components/VoteForProposalButton'
import { VotesContainer, VotesPreview } from '@/proposals/components/VotesPreview'
import { getVoteStatusComponent } from '@/proposals/components/VoteStatusComponent'
import { ProposalsRoutes } from '@/proposals/constants/routes'
import { useBlocksToProposalExecution } from '@/proposals/hooks/useBlocksToProposalExecution'
import { useProposal } from '@/proposals/hooks/useProposal'
import { useProposalConstants } from '@/proposals/hooks/useProposalConstants'
import { useVotingRounds } from '@/proposals/hooks/useVotingRounds'
import { VoteRationaleModalCall } from '@/proposals/modals/VoteRationale/types'
import { proposalPastStatuses } from '@/proposals/model/proposalStatus'

export const ProposalPreview = () => {
  const { id } = useParams<{ id: string }>()
  const history = useHistory()
  const { isLoading, proposal } = useProposal(id)
  const { council } = useElectedCouncil()
  const constants = useProposalConstants(proposal?.details.type)
  const loc = useLocation()
  const voteId = new URLSearchParams(loc.search).get('showVote')
  const blocksToProposalExecution = useBlocksToProposalExecution(proposal, constants)

  const votingRounds = useVotingRounds(proposal?.votes, proposal?.proposalStatusUpdates)
  const [currentVotingRound, setVotingRound] = useState(0)

  const votes = votingRounds[currentVotingRound] ?? votingRounds[0]
  useRefetchQueries({ interval: MILLISECONDS_PER_BLOCK, include: ['getProposal', 'GetProposalVotes'] }, [proposal])
  const notVoted = useMemo(() => {
    if (
      !proposal ||
      !['deciding', 'dormant'].includes(proposal.status) ||
      currentVotingRound < votingRounds.length - 1
    ) {
      return
    }

    const votedMembers = Array.from(votes.map.values())
      .flat()
      .map((vote) => vote.voter)
    const councilMembers = council?.councilors.map((councilor) => councilor.member)
    return councilMembers?.filter((member) => !votedMembers.some((voted) => voted.id === member.id)) ?? []
  }, [council, proposal])

  useEffect(() => setVotingRound(Math.max(0, votingRounds.length - 1)), [votingRounds.length])
  const { showModal } = useModal()

  useEffect(() => {
    if (voteId) {
      showModal<VoteRationaleModalCall>({ modal: 'VoteRationaleModal', data: { id: voteId } })
    }
  }, [voteId])

  const { active } = useMyMemberships()
  const hasVoted = proposal?.votes.some(
    (vote) => vote.voter.id === active?.id && proposal?.councilApprovals === vote.votingRound - 1
  )

  const myVote =
    active && proposal?.votes.find((vote) => vote.voter.id === active.id && vote.votingRound === currentVotingRound + 1)
  const myVoteStatus = myVote?.voteKind

  if (!proposal || !votes) {
    if (!proposal && !isLoading) {
      history.replace('/404')
    }
    return (
      <PageLayout
        lastBreadcrumb={id}
        main={
          <RowGapBlock gap={24}>
            <ContentWithSidePanel>
              <Loading />
            </ContentWithSidePanel>
          </RowGapBlock>
        }
      />
    )
  }
  return (
    <PageLayout
      lastBreadcrumb={proposal.title}
      sidebarScrollable
      header={
        <PageHeaderWrapper>
          <PageHeaderRow>
            <PreviousPage>
              <PageTitle>{proposal.title}</PageTitle>
            </PreviousPage>
            <ButtonsGroup>
              {active?.isCouncilMember &&
                proposal.status === 'deciding' &&
                (!hasVoted ? (
                  <VoteForProposalButton id={id}>Vote on Proposal</VoteForProposalButton>
                ) : (
                  <ButtonPrimary size="medium" disabled>
                    Already voted
                  </ButtonPrimary>
                ))}
              <CopyButtonTemplate
                size="medium"
                textToCopy={getUrl({ route: ProposalsRoutes.preview, params: { id: proposal.id } })}
                icon={<LinkIcon />}
              >
                Copy link
              </CopyButtonTemplate>
            </ButtonsGroup>
          </PageHeaderRow>

          <RowGapBlock gap={24}>
            <BadgeAndTime>
              <BadgeStatus
                ended={proposalPastStatuses.includes(proposal.status)}
                succeeded={proposal.status === 'executed'}
                inverted
                size="l"
              >
                {camelCaseToText(proposal.status)}
              </BadgeStatus>
              <TextMedium>
                <TextInlineMedium lighter>ID: </TextInlineMedium>
                <TextInlineMedium bold>{proposal.id}</TextInlineMedium>{' '}
              </TextMedium>
              {blocksToProposalExecution && (
                <TextMedium>
                  <TextInlineMedium lighter>Time left:</TextInlineMedium>{' '}
                  <TextInlineMedium bold>{formatBlocksToDuration(blocksToProposalExecution)}</TextInlineMedium>{' '}
                  <TextInlineMedium lighter>({formatTokenValue(blocksToProposalExecution)} blocks)</TextInlineMedium>
                </TextMedium>
              )}
            </BadgeAndTime>
          </RowGapBlock>

          {constants?.constitutionality
            ? constants?.constitutionality > 1 && (
                <ProposalStages
                  status={proposal.status}
                  updates={proposal.proposalStatusUpdates}
                  constitutionality={constants?.constitutionality}
                  value={currentVotingRound}
                  onChange={setVotingRound}
                />
              )
            : ''}
        </PageHeaderWrapper>
      }
      main={
        <MainPanel>
          <RowGapBlock gap={24}>
            <ProposalStatistics voteCount={votes.count} constants={constants} />

            {/* Proposal-specific dashboard */}
            <h3>{camelCaseToText(proposal.type)}</h3>

            <ProposalDetails proposalDetails={proposal.details} />

            <RationalePreview rationale={proposal.rationale} />
            <ProposalDiscussions thread={proposal.discussionThread} proposalId={id} />
          </RowGapBlock>
        </MainPanel>
      }
      sidebar={
        <SidePanel scrollable>
          <RowGapBlock gap={36}>
            {myVoteStatus && <VotesContainer>You voted for: {getVoteStatusComponent(myVoteStatus)}</VotesContainer>}
            <VotesPreview votes={votes} notVoted={notVoted} />

            <ProposalHistory proposal={proposal} />

            <RowGapBlock gap={16}>
              <Label>Proposer</Label>
              <MemberInfo member={proposal.proposer} />
            </RowGapBlock>
          </RowGapBlock>
        </SidePanel>
      }
    />
  )
}
const BadgeAndTime = styled(BadgesRow)`
  gap: 16px;
`
