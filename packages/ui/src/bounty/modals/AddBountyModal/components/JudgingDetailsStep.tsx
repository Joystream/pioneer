import BN from 'bn.js'
import React, { useCallback } from 'react'

import { JudgingPeriodDetailsContext, WorkingPeriodDetailsContext } from '@/bounty/modals/AddBountyModal/machine'
import { InputComponent, InputNumber } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextHuge } from '@/common/components/typography'
import { inBlocksDate } from '@/common/model/inBlocksDate'
import { SelectMember } from '@/memberships/components/SelectMember'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { Member } from '@/memberships/types'

interface Props extends Omit<JudgingPeriodDetailsContext, keyof WorkingPeriodDetailsContext> {
  setJudgingPeriodLength: (length: number) => void
  setOracle: (oracle: Member) => void
}

export const JudgingDetailsStep = ({ judgingPeriodLength, oracle, setOracle, setJudgingPeriodLength }: Props) => {
  const { active } = useMyMemberships()

  const oracleFilter = useCallback((member) => member.id !== active?.id, [active])

  return (
    <RowGapBlock gap={24}>
      <Row>
        <TextHuge bold>Judging Period Details</TextHuge>
      </Row>

      <Row>
        <InputComponent
          label="Judging period length"
          required
          inputSize="s"
          tight
          units="blocks"
          message={judgingPeriodLength ? `≈ ${inBlocksDate(new BN(judgingPeriodLength))}` : ''}
        >
          <InputNumber
            placeholder="0"
            onChange={(event) => setJudgingPeriodLength(Number(event.target.value))}
            value={judgingPeriodLength?.toString()}
          />
        </InputComponent>
      </Row>

      <Row>
        <InputComponent label="Oracle" required inputSize="l">
          <SelectMember onChange={(newOracle) => setOracle(newOracle)} selected={oracle} filter={oracleFilter} />
        </InputComponent>
      </Row>
    </RowGapBlock>
  )
}
