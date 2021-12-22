import BN from 'bn.js'
import React from 'react'
import styled from 'styled-components'

import {
  FundingPeriodDetailsContext,
  WorkingPeriodDetailsContext,
  WorkingPeriodType,
} from '@/bounty/modals/AddBountyModal/machine'
import { CloseButton } from '@/common/components/buttons'
import { InlineToggleWrap, InputComponent, InputNumber, Label, ToggleCheckbox } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Tooltip, TooltipDefault } from '@/common/components/Tooltip'
import { TextHuge, TextMedium } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { inBlocksDate } from '@/common/model/inBlocksDate'
import { MemberInfo } from '@/memberships/components'
import { SelectMember } from '@/memberships/components/SelectMember'
import { Member } from '@/memberships/types'

interface Props extends Omit<WorkingPeriodDetailsContext, keyof FundingPeriodDetailsContext> {
  setWorkingPeriodLength: (workingPeriodLength: number) => void
  setWorkingPeriodWhitelist: (members: Member[]) => void
  setWorkingPeriodType: (type: WorkingPeriodType) => void
  setWorkingPeriodStake: (stake: BN) => void
  setWorkingPeriodStakeAllowance: (allowance: boolean) => void
}

export const WorkingDetailsStep = ({
  workingPeriodLength,
  workingPeriodWhitelist,
  workingPeriodType,
  workingPeriodStake,
  workingPeriodStakeAllowance,
  setWorkingPeriodLength,
  setWorkingPeriodStake,
  setWorkingPeriodStakeAllowance,
  setWorkingPeriodType,
  setWorkingPeriodWhitelist,
}: Props) => {
  const onMemberAdd = (member: Member) => {
    setWorkingPeriodWhitelist([...workingPeriodWhitelist, member])
  }

  const whitelistFilter = (member: Member): boolean =>
    !workingPeriodWhitelist.some((oldMember) => member.id === oldMember.id)

  const removeMemberFromWhitelist = (member: Member) => () => {
    setWorkingPeriodWhitelist(workingPeriodWhitelist.filter((mapMember) => mapMember.id !== member.id))
  }

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
            trueLabel={
              <CheckBoxLabelWrapper>
                Open
                <Tooltip tooltipText="Lorem ipsum...">
                  <TooltipDefault />
                </Tooltip>
              </CheckBoxLabelWrapper>
            }
          />
        </InlineToggleWrap>
      </Row>

      {workingPeriodType === 'closed' && (
        <RowGapBlock gap={10}>
          <TextMedium bold>Whitelist</TextMedium>
          <TextMedium>The upper bound for whitelist is 15.</TextMedium>
          <InputComponent tooltipText="Lorem ipsum dolor sit amet consectetur, adipisicing elit." inputSize="l">
            <SelectMember filter={whitelistFilter} onChange={onMemberAdd} />
          </InputComponent>
          <WhitelistWrapper>
            {workingPeriodWhitelist?.map((member) => (
              <MemberWrapper>
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
          required
          units="blocks"
          inputSize="m"
          tight
          message={workingPeriodLength ? `≈ ${inBlocksDate(new BN(workingPeriodLength))}` : ''}
        >
          <InputNumber
            id="periodLength"
            placeholder="0"
            value={workingPeriodLength?.toString()}
            onChange={(_, numberValue) => setWorkingPeriodLength(numberValue)}
          />
        </InputComponent>
      </Row>

      <Row>
        <InlineToggleWrap>
          <Label>Stake </Label>
          <ToggleCheckbox
            checked={workingPeriodStakeAllowance}
            onChange={(isSet) => setWorkingPeriodStakeAllowance(isSet)}
            trueLabel={
              <CheckBoxLabelWrapper>
                Yes{' '}
                <Tooltip tooltipText="Lorem ipsum...">
                  <TooltipDefault />
                </Tooltip>
              </CheckBoxLabelWrapper>
            }
            falseLabel={
              <CheckBoxLabelWrapper>
                No{' '}
                <Tooltip tooltipText="Lorem ipsum...">
                  <TooltipDefault />
                </Tooltip>
              </CheckBoxLabelWrapper>
            }
          />
        </InlineToggleWrap>
      </Row>

      {workingPeriodStakeAllowance && (
        <Row>
          <InputComponent units="JOY" inputSize="m" tight>
            <InputNumber
              isTokenValue
              id="periodStake"
              value={workingPeriodStake?.toString()}
              onChange={(_, value) => setWorkingPeriodStake(new BN(value))}
            />
          </InputComponent>
        </Row>
      )}
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
`

const MemberWrapper = styled.div`
  display: flex;
  column-gap: 5px;
  height: min-content;
  padding: 10px;
  max-width: 180px;
  min-width: 180px;
  align-items: center;
  border: 1px solid ${Colors.Black[300]};
  background-color: ${Colors.White};
`
