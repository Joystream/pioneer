import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { BadgeStatus } from '@/common/components/BadgeStatus'
import { CheckboxIcon } from '@/common/components/icons'
import { Loading } from '@/common/components/Loading'
import { formatDuration } from '@/common/components/statistics/BlockDurationStatistics'
import { TextBig, TextInlineMedium, TextInlineSmall, TextSmall } from '@/common/components/typography'
import { DurationValue } from '@/common/components/typography/DurationValue'
import { BorderRad, Colors, Shadows, Transitions } from '@/common/constants'
import { useBlocksToProposalExecution } from '@/proposals/hooks/useBlocksToProposalExecution'
import { useProposal } from '@/proposals/hooks/useProposal'
import { useProposalConstants } from '@/proposals/hooks/useProposalConstants'
import { ProposalVote } from '@/proposals/types'

interface TileProps {
  proposalId: string
}

export const ProposalTile = React.memo(({ proposalId }: TileProps) => {
  const { t } = useTranslation('overview')
  const { isLoading, proposal } = useProposal(proposalId)
  const constants = useProposalConstants(proposal?.details.type)
  const blocksToEnd = useBlocksToProposalExecution(proposal, constants)

  const content = useMemo(() => {
    switch (proposal?.status) {
      case 'deciding':
        return <DecidingContent votes={proposal.votes} />
      case 'dormant':
        return <DormantContent />
      default:
        // TODO: figure out content for Gracing stage
        return null
    }
  }, [proposal?.status])

  if (isLoading || !proposal) {
    return <Loading />
  }
  return (
    <Wrapper>
      <Title bold black value>
        {proposal.title}
      </Title>
      <Badge>{proposal.status}</Badge>
      {blocksToEnd && (
        <TimeLabel lighter as="div">
          {t('proposals.timeLeft')} {<DurationValue value={formatDuration(blocksToEnd)} />}
        </TimeLabel>
      )}
      <LabelsWrapper>{content}</LabelsWrapper>
    </Wrapper>
  )
})

interface DecidingProps {
  votes: ProposalVote[]
}

const DecidingContent = ({ votes }: DecidingProps) => {
  const { t } = useTranslation('overview')
  const approvedCount = useMemo(() => votes.filter((vote) => vote.voteKind === 'APPROVE').length, [votes])
  const rejectedCount = useMemo(() => votes.filter((vote) => vote.voteKind === 'REJECT').length, [votes])
  return (
    <>
      <VoteWrapper>
        <VoteLabel>{t('proposals.approvedVotes')}</VoteLabel>
        <VotesValue value={approvedCount} />
      </VoteWrapper>
      <VoteWrapper>
        <VoteLabel>{t('proposals.rejectedVotes')}</VoteLabel>
        <VotesValue value={rejectedCount} />
      </VoteWrapper>
    </>
  )
}

const VotesValue = ({ value }: { value: number }) => {
  const { t } = useTranslation('overview')
  return (
    <VotesValueWrapper>
      <TextInlineMedium bold>{value}</TextInlineMedium>{' '}
      <TextInlineMedium value lighter>
        {value === 1 ? t('proposals.vote') : t('proposals.votes')}
      </TextInlineMedium>
    </VotesValueWrapper>
  )
}

const DormantContent = () => {
  const { t } = useTranslation('overview')
  return (
    <DormantContentWrapper>
      <div>
        <StageNumber lighter>1/2</StageNumber>
        <ApprovedLabel>
          <CheckboxIcon />
          {t('proposals.approvedVotes')}
        </ApprovedLabel>
      </div>
      <div>
        <StageNumber lighter>2/2</StageNumber>
        <WaitingLabel lighter>...{t('proposals.waiting')}</WaitingLabel>
      </div>
    </DormantContentWrapper>
  )
}

const Wrapper = styled.div`
  width: 215px;
  height: 175px;
  padding: 24px 16px;
  border-radius: ${BorderRad.m};
  box-shadow: ${Shadows.light};
`

const Title = styled(TextBig)`
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: ${Transitions.all};
`

const TimeLabel = styled(TextSmall)`
  & div {
    grid-column-gap: 2px;
    font-size: 12px;
    font-weight: 700;
    color: ${Colors.Black[500]};
  }
  & span {
    margin: 0 2px 0 0;
  }
`

const Badge = styled(BadgeStatus)`
  margin: 8px 0;
  color: ${Colors.Blue[500]};
  background-color: ${Colors.Blue[50]};
`

const VoteWrapper = styled.div`
  display: flex;
`

const LabelsWrapper = styled.div`
  margin-top: 12px;
`

const VoteLabel = styled(TextSmall)`
  width: 70px;
  font-weight: 600;
`

const VotesValueWrapper = styled.span`
  margin-left: 12px;
`

const DormantContentWrapper = styled.div`
  margin-top: 24px;
`

const StageNumber = styled(TextInlineSmall)`
  &::first-letter {
    font-weight: 700;
  }
`

const ApprovedLabel = styled(TextInlineSmall)`
  font-weight: 600;
  margin-left: 26px;
  & svg {
    height: 12px;
    width: 12px;
    vertical-align: middle;
    margin-right: 10px;
  }
`

const WaitingLabel = styled(TextInlineSmall)`
  margin-left: 48px;
`
