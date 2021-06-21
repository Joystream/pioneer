import React from 'react'

import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Label, TextInlineMedium, TextMedium } from '@/common/components/typography'

export const Constants = () => {
  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={8}>
          <h4>Constants</h4>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={4}>
          <Label>Deciding period</Label>
          <TextMedium lighter>
            <TextInlineMedium dark>-</TextInlineMedium> blocks
          </TextMedium>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={4}>
          <Label>Gracing limit</Label>
          <TextMedium lighter>
            <TextInlineMedium dark>-</TextInlineMedium> blocks
          </TextMedium>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={4}>
          <Label>Approval quorum</Label>
          <TextMedium lighter>
            <TextInlineMedium dark>-</TextInlineMedium> votes
          </TextMedium>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={4}>
          <Label>Approval threshold</Label>
          <TextMedium lighter>
            <TextInlineMedium dark>-</TextInlineMedium> %
          </TextMedium>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={4}>
          <Label>Slashing quorum</Label>
          <TextMedium lighter>
            <TextInlineMedium dark>-</TextInlineMedium> votes
          </TextMedium>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={4}>
          <Label>Stake</Label>
          <TextMedium lighter>
            <TextInlineMedium dark>-</TextInlineMedium> JOY
          </TextMedium>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={4}>
          <Label>Constitutionality</Label>
          <TextMedium lighter>
            <TextInlineMedium dark>-</TextInlineMedium> JOY
          </TextMedium>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}
