import BN from 'bn.js'
import React from 'react'

import { InputComponent, InputNumber } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { useApi } from '@/common/hooks/useApi'
import { useObservable } from '@/common/hooks/useObservable'

export interface SetInitialInvitationCountParameters {
  invitationCount?: BN
}

interface InvitationCountProps extends SetInitialInvitationCountParameters {
  setNewCount: (count: BN | undefined) => void
}

export const SetInitialInvitationCount = ({ setNewCount, invitationCount }: InvitationCountProps) => {
  const { api } = useApi()
  const currentCount = useObservable(api?.query.members.initialInvitationCount(), [])

  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={8}>
          <h4>Specific parameters</h4>
          <TextMedium lighter>Set Initial Invitation Count</TextMedium>
        </RowGapBlock>
      </Row>
      <RowGapBlock gap={12}>
        <Row>
          <InputComponent label="New Count" tight required id="count-input">
            <InputNumber
              id="count-input"
              isTokenValue
              value={invitationCount?.toString()}
              placeholder="0"
              onChange={(_, value) => setNewCount(new BN(value))}
            />
          </InputComponent>
        </Row>
        <Row>
          <TextMedium lighter>The current initial invitation count is {currentCount?.toString()}.</TextMedium>
        </Row>
      </RowGapBlock>
    </RowGapBlock>
  )
}
