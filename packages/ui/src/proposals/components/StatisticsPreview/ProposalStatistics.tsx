import React from 'react'

import { StatisticBar, Statistics, TwoRowStatistic } from '@/common/components/statistics'
import { VoteCount } from '@/proposals/hooks/useVoteCount'
import { ProposalConstants } from '@/proposals/types'

const tooltipLinkURL = 'https://joystream.gitbook.io/joystream-handbook/governance/proposals#concepts'

interface ProposalStatisticsProps {
  voteCount: VoteCount
  constants: ProposalConstants
}
export const ProposalStatistics = ({ voteCount, constants }: ProposalStatisticsProps) => {
  const { approve, slash, total, remain } = voteCount
  const councilSize = total + remain
  const {
    approvalQuorumPercentage,
    approvalThresholdPercentage,
    slashingQuorumPercentage,
    slashingThresholdPercentage,
  } = constants

  const approvalQuorumRatio = approvalQuorumPercentage / 100
  const approvalThresholdRatio = approvalThresholdPercentage / 100
  const slashingQuorumRatio = slashingQuorumPercentage / 100
  const slashingThresholdRatio = slashingThresholdPercentage / 100

  // NOTE: use ceil since these are minimums to reach
  const approvalQuorum = Math.ceil(councilSize * approvalQuorumRatio)
  const slashingQuorum = Math.ceil(councilSize * slashingQuorumRatio)

  const quorumRatio = councilSize && total / councilSize
  const approvalRatio = total && approve / total
  const slashingRatio = total && slash / total

  return (
    <Statistics>
      <TwoRowStatistic>
        <StatisticBar
          title="Approva Quorum"
          tooltipText="Number of votes cast below which the proposal cannot be approved"
          tooltipLinkURL={tooltipLinkURL}
          value={quorumRatio}
          threshold={approvalQuorumRatio}
          numerator={total}
          denominator={`${approvalQuorum} votes`}
        />
        <StatisticBar
          title="Approval Threshold"
          tooltipText="Minimum percentage of approval votes as a share of all cast votes that result in approval"
          tooltipLinkURL={tooltipLinkURL}
          value={approvalRatio}
          threshold={approvalThresholdRatio}
          numerator={`${Math.floor(approvalRatio * 100)}%`}
          denominator={`${approvalThresholdPercentage}%`}
        />
      </TwoRowStatistic>

      <TwoRowStatistic>
        <StatisticBar
          title="Slashing Quorum"
          tooltipText="Number of votes cast below which the proposal cannot be slashed"
          tooltipLinkURL={tooltipLinkURL}
          value={quorumRatio}
          threshold={slashingQuorumRatio}
          numerator={total}
          denominator={`max ${slashingQuorum} votes`}
        />
        <StatisticBar
          title="Slashing Threshold"
          tooltipText="Minimum percentage of cast votes as share that slash relative to those that vote approve, abstain or reject"
          tooltipLinkURL={tooltipLinkURL}
          value={slashingRatio}
          threshold={slashingThresholdRatio}
          numerator={`${Math.floor(slashingRatio * 100)}%`}
          denominator={`max ${slashingThresholdPercentage}%`}
        />
      </TwoRowStatistic>
    </Statistics>
  )
}
