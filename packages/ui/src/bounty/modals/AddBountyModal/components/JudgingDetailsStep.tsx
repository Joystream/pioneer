import BN from 'bn.js'
import React  from 'react'

import { JudgingPeriodDetailsContext, WorkingPeriodDetailsContext } from '@/bounty/modals/AddBountyModal/machine'
import { InputComponent, InputNumber } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextHuge } from '@/common/components/typography'
import { inBlocksDate } from '@/common/model/inBlocksDate'
import { SelectMember } from '@/memberships/components/SelectMember'
import { Member } from '@/memberships/types'

interface Props extends Omit<JudgingPeriodDetailsContext, keyof WorkingPeriodDetailsContext> {
  setJudgingPeriodLength: (length: BN) => void
  setOracle: (oracle: Member) => void
}

export const JudgingDetailsStep = ({ judgingPeriodLength, oracle, setOracle, setJudgingPeriodLength }: Props) => {

  return (
    <RowGapBlock gap={24}>
      <Row>
        <TextHuge bold>Judging Period Details</TextHuge>
      </Row>

      <Row>
        <InputComponent
          label="Judging period length"
          required
          inputSize="m"
          tight
          units="blocks"
          id="field-periodLength"
          message={judgingPeriodLength ? `≈ ${inBlocksDate(judgingPeriodLength)}` : ''}
        >
          <InputNumber
            isTokenValue
            id="field-periodLength"
            placeholder="0"
            onChange={(_, value) => setJudgingPeriodLength(new BN(value))}
            value={judgingPeriodLength?.toString()}
          />
        </InputComponent>
      </Row>
      <Row>
        <InputComponent label="Oracle" required inputSize="l">
          <SelectMember onChange={(newOracle) => setOracle(newOracle)} selected={oracle} />
        </InputComponent>
      </Row>
    </RowGapBlock>
  )
}
