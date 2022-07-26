import BN from 'bn.js'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import styled from 'styled-components'

import { CurrencyName } from '@/app/constants/currency'
import { AddBountyStates } from '@/bounty/modals/AddBountyModal/machine'
import { CloseButton } from '@/common/components/buttons'
import {
  TokenInput,
  ToggleCheckbox,
  InlineToggleWrap,
  InputComponent,
  Label,
  InputNumber,
} from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Tooltip, TooltipDefault } from '@/common/components/Tooltip'
import { TextHuge, TextMedium } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { inBlocksDate } from '@/common/model/inBlocksDate'
import { ValidationHelpers } from '@/common/utils/validation'
import { MemberInfo } from '@/memberships/components'
import { SelectMember } from '@/memberships/components/SelectMember'
import { Member } from '@/memberships/types'

interface Props extends ValidationHelpers {
  whitelistLimit?: number
  minEntrantStake?: BN
}

export const WorkingDetailsStep = ({ whitelistLimit, minEntrantStake, errorChecker, errorMessageGetter }: Props) => {
  const form = useFormContext()
  const [isWorkingPeriodOpen, workingPeriodWhitelist, workingPeriodLength] = form.watch([
    `${AddBountyStates.workingPeriodDetails}.isWorkingPeriodOpen`,
    `${AddBountyStates.workingPeriodDetails}.workingPeriodWhitelist`,
    `${AddBountyStates.workingPeriodDetails}.workingPeriodLength`,
  ])

  const onMemberAdd = (member: Member) => {
    form.setValue(
      `${AddBountyStates.workingPeriodDetails}.workingPeriodWhitelist`,
      [...workingPeriodWhitelist, member],
      {
        shouldValidate: true,
      }
    )
  }

  const removeMemberFromWhitelist = (member: Member) => () => {
    form.setValue(
      `${AddBountyStates.workingPeriodDetails}.workingPeriodWhitelist`,
      workingPeriodWhitelist.filter((mapMember: Member) => mapMember.id !== member.id),
      { shouldValidate: true }
    )
  }

  const whitelistFilter = (member: Member): boolean =>
    !workingPeriodWhitelist.some((oldMember: Member) => member.id === oldMember.id)

  return (
    <RowGapBlock gap={24}>
      <Row>
        <TextHuge bold>Working Period Details</TextHuge>
      </Row>

      <Row>
        <InlineToggleWrap>
          <Label>Bounty type:</Label>
          <ToggleCheckbox
            falseLabel={
              <CheckBoxLabelWrapper>
                Closed{' '}
                <Tooltip tooltipText="There are open bounties, where any member can participate, and closed bounties, where the creator can pre-select a set of members who can participate.">
                  <TooltipDefault />
                </Tooltip>
              </CheckBoxLabelWrapper>
            }
            trueLabel={<CheckBoxLabelWrapper>Open</CheckBoxLabelWrapper>}
            name="workingPeriodDetails.isWorkingPeriodOpen"
          />
        </InlineToggleWrap>
      </Row>

      {!isWorkingPeriodOpen && (
        <RowGapBlock gap={10}>
          <TextMedium bold>Whitelist</TextMedium>
          <TextMedium>Maximum {whitelistLimit ?? 0} members.</TextMedium>
          <InputComponent
            disabled={+(whitelistLimit ?? 0) === workingPeriodWhitelist.length}
            tooltipText="Lorem ipsum dolor sit amet consectetur, adipisicing elit."
            inputSize="l"
          >
            <SelectMember
              id="select-whitelist"
              disabled={+(whitelistLimit ?? 0) === workingPeriodWhitelist.length}
              filter={whitelistFilter}
              onChange={onMemberAdd}
            />
          </InputComponent>
          <WhitelistWrapper>
            {workingPeriodWhitelist?.map((member: Member) => (
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
          <InputNumber isInBN name="workingPeriodDetails.workingPeriodLength" id="field-periodLength" placeholder="0" />
        </InputComponent>
      </Row>

      <InputComponent
        id="field-periodStake"
        label="Entrant stake"
        units={CurrencyName.integerValue}
        inputSize="m"
        tight
        required
        message={
          errorChecker('workingPeriodStake')
            ? errorMessageGetter('workingPeriodStake')
            : `Minimal entrant stake is ${minEntrantStake?.toNumber() ?? 0} ${CurrencyName.integerValue}`
        }
        validation={errorChecker('workingPeriodStake') ? 'invalid' : undefined}
      >
        <TokenInput name="workingPeriodDetails.workingPeriodStake" id="field-periodStake" placeholder="0" />
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
