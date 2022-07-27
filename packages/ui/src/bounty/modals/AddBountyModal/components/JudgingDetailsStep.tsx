import React, { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'

import { AddBountyStates } from '@/bounty/modals/AddBountyModal/machine'
import { InputComponent, InputNumber } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextHuge } from '@/common/components/typography'
import { inBlocksDate } from '@/common/model/inBlocksDate'
import { SelectMember } from '@/memberships/components/SelectMember'
import { Member } from '@/memberships/types'

export const JudgingDetailsStep = () => {
  const form = useFormContext()
  const [judgingPeriodLength, oracle] = form.watch([
    `${AddBountyStates.judgingPeriodDetails}.judgingPeriodLength`,
    `${AddBountyStates.judgingPeriodDetails}.oracle`,
  ])

  const setOracle = useCallback(
    (member: Member) => {
      form.setValue(`${AddBountyStates.judgingPeriodDetails}.oracle`, member, { shouldValidate: true })
    },
    [form.setValue]
  )

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
            isInBN
            id="field-periodLength"
            placeholder="0"
            name={`${AddBountyStates.judgingPeriodDetails}.judgingPeriodLength`}
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
