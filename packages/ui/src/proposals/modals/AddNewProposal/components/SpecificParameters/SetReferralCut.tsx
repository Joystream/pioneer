import React from 'react'

import { InputComponent, InputNumber } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'

export interface SetReferralCutParameters {
  referralCut?: number
}

interface Props extends SetReferralCutParameters {
  setReferralCut: (amount: number) => void
}

export const SetReferralCut = ({ referralCut, setReferralCut }: Props) => {
  const onChange = (_: any, value: number) => {
    if (Number(value) > 255) return

    setReferralCut(value)
  }

  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={8}>
          <h4>Specific parameters</h4>
          <TextMedium lighter>Set Referral Cut</TextMedium>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={20}>
          <InputComponent
            label="Referral Cut"
            tight
            units="JOY"
            message="Maximal value for referral is 255 JOY"
            required
          >
            <InputNumber
              id="amount-input"
              isTokenValue
              value={referralCut?.toString()}
              placeholder="0"
              onChange={onChange}
            />
          </InputComponent>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}
