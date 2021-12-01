import BN from 'bn.js'
import React, { useEffect } from 'react'

import { InputComponent, InputNumber } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { useNumberInput } from '@/common/hooks/useNumberInput'
import { formatTokenValue } from '@/common/model/formatters'

export interface SetInitialInvitationCountParameters {
  invitationCount?: BN
}

interface InvitationCountProps {
  setNewCount: (count: BN) => void
}

export const SetInitialInvitationCount = ({ setNewCount }: InvitationCountProps) => {
  const [count, setCount] = useNumberInput(0)

  useEffect(() => {
    setNewCount(new BN(count))
  }, [count])

  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={8}>
          <h4>Specific parameters</h4>
          <TextMedium lighter>Set Initial Invitation Count</TextMedium>
        </RowGapBlock>
      </Row>
      <Row>
        <InputComponent label="New Count" tight required>
          <InputNumber
            id="count-input"
            value={formatTokenValue(new BN(count))}
            placeholder="0"
            onChange={(event) => setCount(event.target.value)}
          />
        </InputComponent>
      </Row>
    </RowGapBlock>
  )
}
