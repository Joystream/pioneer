import React from 'react'

import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Label, TextInlineMedium, TextMedium, TokenValue } from '@/common/components/typography'
import { formatTokenValue } from '@/common/model/formatters'
import { ProposalConstants } from '@/proposals/types/constants'

export const ProposalConstantsWrapper = ({ constants }: { constants: ProposalConstants | null }) => (
  <RowGapBlock gap={24}>
    <Row>
      <RowGapBlock gap={8}>
        <h4>Parameters</h4>
      </RowGapBlock>
    </Row>
    <Row>
      <RowGapBlock gap={4}>
        <Label>Voting period</Label>
        <TextInlineMedium dark>{formatTokenValue(constants?.votingPeriod)} blocks</TextInlineMedium>
      </RowGapBlock>
    </Row>
    <Row>
      <RowGapBlock gap={4}>
        <Label>Gracing limit</Label>
        <TextInlineMedium dark>{formatTokenValue(constants?.gracePeriod)} blocks</TextInlineMedium>
      </RowGapBlock>
    </Row>
    <Row>
      <RowGapBlock gap={4}>
        <Label>Approval quorum</Label>
        <TextInlineMedium dark>{formatTokenValue(constants?.approvalQuorumPercentage)}%</TextInlineMedium>
      </RowGapBlock>
    </Row>
    <Row>
      <RowGapBlock gap={4}>
        <Label>Approval threshold</Label>
        <TextInlineMedium dark>{formatTokenValue(constants?.approvalThresholdPercentage)}%</TextInlineMedium>
      </RowGapBlock>
    </Row>
    <Row>
      <RowGapBlock gap={4}>
        <Label>Slashing quorum</Label>
        <TextInlineMedium dark>{formatTokenValue(constants?.slashingQuorumPercentage)}%</TextInlineMedium>
      </RowGapBlock>
    </Row>
    <Row>
      <RowGapBlock gap={4}>
        <Label>Slashing threshold</Label>
        <TextInlineMedium dark>{formatTokenValue(constants?.slashingThresholdPercentage)}%</TextInlineMedium>
      </RowGapBlock>
    </Row>
    <Row>
      <RowGapBlock gap={4}>
        <Label>Required Stake</Label>
        <TextInlineMedium dark>
          <TokenValue value={constants?.requiredStake} />
        </TextInlineMedium>
      </RowGapBlock>
    </Row>
    <Row>
      <RowGapBlock gap={4}>
        <Label>Constitutionality</Label>
        <TextInlineMedium dark>{formatTokenValue(constants?.constitutionality)}</TextInlineMedium>
      </RowGapBlock>
    </Row>
  </RowGapBlock>
)
