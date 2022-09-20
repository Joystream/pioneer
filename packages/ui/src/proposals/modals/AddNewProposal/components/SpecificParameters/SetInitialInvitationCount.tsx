import React from 'react'

import { useApi } from '@/api/hooks/useApi'
import { InputComponent, InputNumber } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { useFirstObservableValue } from '@/common/hooks/useFirstObservableValue'

export const SetInitialInvitationCount = () => {
  const { api } = useApi()
  const currentCount = useFirstObservableValue(() => api?.query.members.initialInvitationCount(), [api?.isConnected])

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
            <InputNumber id="count-input" isInBN name="setInitialInvitationCount.invitationCount" placeholder="0" />
          </InputComponent>
        </Row>
        <Row>
          <TextMedium lighter>The current initial invitation count is {currentCount?.toString()}.</TextMedium>
        </Row>
      </RowGapBlock>
    </RowGapBlock>
  )
}
