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
        <Label>Required Stake</Label>
        <TextMedium lighter>
          <TextInlineMedium dark>
            <TokenValue value={constants?.requiredStake} />
          </TextInlineMedium>
        </TextMedium>
      </RowGapBlock>
    </Row>
    <Row>
      <RowGapBlock gap={4}>
        <Label>Constitutionality</Label>
        <TextMedium lighter>
          <TextInlineMedium dark>{formatTokenValue(constants?.constitutionality)}</TextInlineMedium>
        </TextMedium>
      </RowGapBlock>
    </Row>
    <Row>
      <RowGapBlock gap={4}>
        <Label>Voting period</Label>
        <TextMedium lighter>
          <TextInlineMedium dark>{formatTokenValue(constants?.votingPeriod)}</TextInlineMedium> blocks
        </TextMedium>
      </RowGapBlock>
    </Row>
    <Row>
      <RowGapBlock gap={4}>
        <Label>Gracing limit</Label>
        <TextMedium lighter>
          <TextInlineMedium dark>{formatTokenValue(constants?.gracePeriod)}</TextInlineMedium> blocks
        </TextMedium>
      </RowGapBlock>
    </Row>
    <Row>
      <RowGapBlock gap={4}>
        <Label>Approval quorum</Label>
        <TextMedium lighter>
          <TextInlineMedium dark>{formatTokenValue(constants?.approvalQuorumPercentage)}</TextInlineMedium>%
        </TextMedium>
      </RowGapBlock>
    </Row>
    <Row>
      <RowGapBlock gap={4}>
        <Label>Approval threshold</Label>
        <TextMedium lighter>
          <TextInlineMedium dark>{formatTokenValue(constants?.approvalThresholdPercentage)}</TextInlineMedium>%
        </TextMedium>
      </RowGapBlock>
    </Row>
    <Row>
      <RowGapBlock gap={4}>
        <Label>Slashing quorum</Label>
        <TextMedium lighter>
          <TextInlineMedium dark>{formatTokenValue(constants?.slashingQuorumPercentage)}</TextInlineMedium>%
        </TextMedium>
      </RowGapBlock>
    </Row>
    <Row>
      <RowGapBlock gap={4}>
        <Label>Slashing threshold</Label>
        <TextMedium lighter>
          <TextInlineMedium dark>{formatTokenValue(constants?.slashingThresholdPercentage)}</TextInlineMedium>%
        </TextMedium>
      </RowGapBlock>
    </Row>
  </RowGapBlock>
)
