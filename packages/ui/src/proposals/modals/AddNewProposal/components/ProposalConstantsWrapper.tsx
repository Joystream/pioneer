import React from 'react'

import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Label, TextInlineMedium, TextMedium } from '@/common/components/typography'
import { displayConstantValue } from '@/common/helpers'
import { ProposalConstants } from '@/proposals/types/constants'

export const ProposalConstantsWrapper = ({ constants }: { constants: ProposalConstants | null }) => (
  <RowGapBlock gap={24}>
    <Row>
      <RowGapBlock gap={8}>
        <h4>Constants</h4>
      </RowGapBlock>
    </Row>
    <Row>
      <RowGapBlock gap={4}>
        <Label>Voting period</Label>
        <TextMedium lighter>
          <TextInlineMedium dark>{displayConstantValue(constants?.votingPeriod)}</TextInlineMedium> blocks
        </TextMedium>
      </RowGapBlock>
    </Row>
    <Row>
      <RowGapBlock gap={4}>
        <Label>Gracing limit</Label>
        <TextMedium lighter>
          <TextInlineMedium dark>{displayConstantValue(constants?.gracePeriod)}</TextInlineMedium> blocks
        </TextMedium>
      </RowGapBlock>
    </Row>
    <Row>
      <RowGapBlock gap={4}>
        <Label>Approval quorum</Label>
        <TextMedium lighter>
          <TextInlineMedium dark>{displayConstantValue(constants?.approvalQuorumPercentage)}</TextInlineMedium>%
        </TextMedium>
      </RowGapBlock>
    </Row>
    <Row>
      <RowGapBlock gap={4}>
        <Label>Approval threshold</Label>
        <TextMedium lighter>
          <TextInlineMedium dark>{displayConstantValue(constants?.approvalThresholdPercentage)}</TextInlineMedium>%
        </TextMedium>
      </RowGapBlock>
    </Row>
    <Row>
      <RowGapBlock gap={4}>
        <Label>Slashing quorum</Label>
        <TextMedium lighter>
          <TextInlineMedium dark>{displayConstantValue(constants?.slashingQuorumPercentage)}</TextInlineMedium>%
        </TextMedium>
      </RowGapBlock>
    </Row>
    <Row>
      <RowGapBlock gap={4}>
        <Label>Slashing threshold</Label>
        <TextMedium lighter>
          <TextInlineMedium dark>{displayConstantValue(constants?.slashingThresholdPercentage)}</TextInlineMedium>%
        </TextMedium>
      </RowGapBlock>
    </Row>
    <Row>
      <RowGapBlock gap={4}>
        <Label>Required Stake</Label>
        <TextMedium lighter>
          <TextInlineMedium dark>{displayConstantValue(constants?.requiredStake)}</TextInlineMedium> JOY
        </TextMedium>
      </RowGapBlock>
    </Row>
    <Row>
      <RowGapBlock gap={4}>
        <Label>Constitutionality</Label>
        <TextMedium lighter>
          <TextInlineMedium dark>{displayConstantValue(constants?.constitutionality)}</TextInlineMedium>
        </TextMedium>
      </RowGapBlock>
    </Row>
  </RowGapBlock>
)
