import React from 'react'

import { StatisticBar, Statistics, TwoRowStatistic } from '@/common/components/statistics'
import { plural } from '@/common/helpers'
import { isDefined } from '@/common/utils'
import { VoteCount } from '@/proposals/hooks/useVotingRounds'
import { ProposalConstants } from '@/proposals/types'

const tooltipLinkURL = 'https://joystream.gitbook.io/joystream-handbook/governance/proposals#concepts'

interface ProposalStatisticsProps {
  voteCount: VoteCount
  constants: ProposalConstants | null
}
export const ProposalStatistics = ({ voteCount, constants }: ProposalStatisticsProps) => {
  const { approve, slash, total, remain, abstain } = voteCount
  const councilSize = isDefined(remain) ? total + remain : undefined
  const {
    approvalQuorumPercentage = undefined,
    approvalThresholdPercentage = undefined,
    slashingQuorumPercentage = undefined,
    slashingThresholdPercentage = undefined,
  } = constants ?? {}

  const approvalQuorumRatio = approvalQuorumPercentage && approvalQuorumPercentage / 100
  const approvalThresholdRatio = approvalThresholdPercentage && approvalThresholdPercentage / 100
  const slashingQuorumRatio = slashingQuorumPercentage && slashingQuorumPercentage / 100
  const slashingThresholdRatio = slashingThresholdPercentage && slashingThresholdPercentage / 100

  // NOTE: use ceil since these are minimums to reach
  const approvalQuorum = councilSize && approvalQuorumRatio && Math.ceil(councilSize * approvalQuorumRatio)
  const slashingQuorum = councilSize && slashingQuorumRatio && Math.ceil(councilSize * slashingQuorumRatio)

  const quorumRatio = councilSize ? total / councilSize : 0
  const approvalRatio = total - abstain && approve / (total - abstain)
  const slashingRatio = total - abstain && slash / (total - abstain)

  return (
    <Statistics>
      <TwoRowStatistic>
        <StatisticBar
          title="Approval Quorum"
          tooltipText="Number of votes cast below which the proposal cannot be approved"
          tooltipLinkURL={tooltipLinkURL}
          value={quorumRatio}
          threshold={approvalQuorumRatio}
          numerator={total}
          denominator={`${councilSize ?? '-'} vote${plural(approvalQuorum)}`}
        />
        <StatisticBar
          title="Approval Threshold"
          tooltipText="Minimum percentage of approval votes as a share of all cast votes that result in approval"
          tooltipLinkURL={tooltipLinkURL}
          value={approvalRatio}
          threshold={approvalThresholdRatio}
          numerator={`${Math.floor(approvalRatio * 100)}%`}
          denominator={approvalThresholdRatio?.toLocaleString('en', { style: 'percent' }) ?? '-'}
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
          denominator={`${councilSize ?? '-'} vote${plural(slashingQuorum)}`}
        />
        <StatisticBar
          title="Slashing Threshold"
          tooltipText="Minimum percentage of cast votes as share that slash relative to those that vote approve, abstain or reject"
          tooltipLinkURL={tooltipLinkURL}
          value={slashingRatio}
          threshold={slashingThresholdRatio}
          numerator={`${Math.floor(slashingRatio * 100)}%`}
          denominator={`${slashingThresholdRatio?.toLocaleString('en', { style: 'percent' }) ?? '-'}`}
        />
      </TwoRowStatistic>
    </Statistics>
  )
}
