import { AugmentedConst } from '@polkadot/api/types'
import { u32 } from '@polkadot/types'
import BN from 'bn.js'
import React, { useMemo } from 'react'
import styled from 'styled-components'
import * as Yup from 'yup'

import {
  FundingPeriodDetailsContext,
  WorkingPeriodDetailsContext,
  WorkingPeriodType,
} from '@/bounty/modals/AddBountyModal/machine'
import { CloseButton } from '@/common/components/buttons'
import { InlineToggleWrap, InputComponent, InputNumber, Label, ToggleCheckbox } from '@/common/components/forms'
import { getErrorMessage, hasError } from '@/common/components/forms/FieldError'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Tooltip, TooltipDefault } from '@/common/components/Tooltip'
import { TextHuge, TextMedium } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { useSchema } from '@/common/hooks/useSchema'
import { inBlocksDate } from '@/common/model/inBlocksDate'
import { MemberInfo } from '@/memberships/components'
import { SelectMember } from '@/memberships/components/SelectMember'
import { Member } from '@/memberships/types'

interface Props extends Omit<WorkingPeriodDetailsContext, keyof FundingPeriodDetailsContext> {
  setWorkingPeriodLength: (workingPeriodLength: BN) => void
  setWorkingPeriodWhitelist: (members: Member[]) => void
  setWorkingPeriodType: (type: WorkingPeriodType) => void
  setWorkingPeriodStake: (stake: BN) => void
  whitelistLimit?: u32 & AugmentedConst<'rxjs'>
  minEntrantStake?: BN
}

const baseSchema = Yup.object().shape({
  workingPeriodStake: Yup.number(),
})

export const WorkingDetailsStep = ({
  workingPeriodLength,
  workingPeriodWhitelist,
  workingPeriodType,
  workingPeriodStake,
  setWorkingPeriodLength,
  setWorkingPeriodStake,
  setWorkingPeriodType,
  setWorkingPeriodWhitelist,
  whitelistLimit,
  minEntrantStake,
}: Props) => {
  const onMemberAdd = (member: Member) => {
    setWorkingPeriodWhitelist([...workingPeriodWhitelist, member])
  }

  const whitelistFilter = (member: Member): boolean =>
    !workingPeriodWhitelist.some((oldMember) => member.id === oldMember.id)

  const removeMemberFromWhitelist = (member: Member) => () => {
    setWorkingPeriodWhitelist(workingPeriodWhitelist.filter((mapMember) => mapMember.id !== member.id))
  }

  const schema = useMemo(() => {
    baseSchema.fields.workingPeriodStake = baseSchema.fields.workingPeriodStake.min(
      minEntrantStake?.toNumber() ?? 0,
      'Entrant stake must be greater than minimum of ${min} JOY'
    )

    return baseSchema
  }, [workingPeriodStake])

  const { errors } = useSchema(
    {
      workingPeriodStake: workingPeriodStake?.toNumber(),
    },
    schema
  )

  return (
    <RowGapBlock gap={24}>
      <Row>
        <TextHuge bold>Working Period Details</TextHuge>
      </Row>

      <Row>
        <InlineToggleWrap>
          <Label>Bounty type:</Label>
          <ToggleCheckbox
            checked={workingPeriodType === 'open'}
            onChange={(isSet) => (isSet ? setWorkingPeriodType('open') : setWorkingPeriodType('closed'))}
            falseLabel={
              <CheckBoxLabelWrapper>
                Closed{' '}
                <Tooltip tooltipText="Lorem ipsum...">
                  <TooltipDefault />
                </Tooltip>
              </CheckBoxLabelWrapper>
            }
            trueLabel={<CheckBoxLabelWrapper>Open</CheckBoxLabelWrapper>}
          />
        </InlineToggleWrap>
      </Row>

      {workingPeriodType === 'closed' && (
        <RowGapBlock gap={10}>
          <TextMedium bold>Whitelist</TextMedium>
          <TextMedium>Maximum {whitelistLimit?.toHuman() || 0} members.</TextMedium>
          <InputComponent
            disabled={+(whitelistLimit?.toHuman() || 0) === workingPeriodWhitelist.length}
            tooltipText="Lorem ipsum dolor sit amet consectetur, adipisicing elit."
            inputSize="l"
          >
            <SelectMember
              id="select-whitelist"
              disabled={+(whitelistLimit?.toHuman() || 0) === workingPeriodWhitelist.length}
              filter={whitelistFilter}
              onChange={onMemberAdd}
            />
          </InputComponent>
          <WhitelistWrapper>
            {workingPeriodWhitelist?.map((member) => (
              <MemberWrapper key={member.id}>
                <MemberInfo member={member} />
                <CloseButton onClick={removeMemberFromWhitelist(member)} />
              </MemberWrapper>
            ))}
          </WhitelistWrapper>
        </RowGapBlock>
      )}

      <Row>
        <InputComponent
          label="Working period length"
          id="field-periodLength"
          required
          units="blocks"
          inputSize="m"
          tight
          message={workingPeriodLength ? `≈ ${inBlocksDate(workingPeriodLength)}` : ''}
        >
          <InputNumber
            id="field-periodLength"
            placeholder="0"
            value={workingPeriodLength?.toString()}
            onChange={(_, numberValue) => setWorkingPeriodLength(new BN(numberValue))}
          />
        </InputComponent>
      </Row>

      <InputComponent
        id="field-periodStake"
        label="Entrant stake"
        units="JOY"
        inputSize="m"
        tight
        required
        message={
          hasError('workingPeriodStake', errors)
            ? getErrorMessage('workingPeriodStake', errors)
            : `Minimal entrant stake is ${minEntrantStake?.toNumber() ?? 0} JOY`
        }
        validation={hasError('workingPeriodStake', errors) ? 'invalid' : undefined}
      >
        <InputNumber
          isTokenValue
          id="field-periodStake"
          placeholder="0"
          value={workingPeriodStake?.toString()}
          onChange={(_, value) => setWorkingPeriodStake(new BN(value))}
        />
      </InputComponent>
    </RowGapBlock>
  )
}

const CheckBoxLabelWrapper = styled.div`
  display: flex;
  column-gap: 4px;
  align-items: center;
`

const WhitelistWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 15px;
  row-gap: 10px;
  max-height: 160px;
  overflow-y: auto;
`

const MemberWrapper = styled.div`
  display: flex;
  column-gap: 5px;
  height: min-content;
  padding: 10px;
  max-width: min-content;
  min-width: 180px;
  align-items: center;
  border: 1px solid ${Colors.Black[300]};
  background-color: ${Colors.White};
`
