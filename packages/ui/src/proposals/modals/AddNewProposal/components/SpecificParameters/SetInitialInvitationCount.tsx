import React from 'react'

import { InputComponent, TokenInput } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { useApi } from '@/common/hooks/useApi'
import { useObservable } from '@/common/hooks/useObservable'

export const SetInitialInvitationCount = () => {
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
          <InputComponent
            name="setInitialInvitationCount.invitationCount"
            label="New Count"
            tight
            required
            id="count-input"
          >
            <TokenInput
              id="count-input"
              isTokenValue
              isInBN
              name="setInitialInvitationCount.invitationCount"
              placeholder="0"
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
