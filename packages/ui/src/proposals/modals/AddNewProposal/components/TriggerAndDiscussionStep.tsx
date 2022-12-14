import React from 'react'
import { useFormContext } from 'react-hook-form'
import styled from 'styled-components'

import { CloseButton } from '@/common/components/buttons'
import { InlineToggleWrap, InputComponent, Label, ToggleCheckbox, InputNumber } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Tooltip, TooltipDefault } from '@/common/components/Tooltip'
import { TextMedium } from '@/common/components/typography'
import { BorderRad, Colors, Transitions } from '@/common/constants'
import { inBlocksDate } from '@/common/model/inBlocksDate'
import { MemberInfo } from '@/memberships/components'
import { SelectMember } from '@/memberships/components/SelectMember'
import { Member } from '@/memberships/types'

export const TriggerAndDiscussionStep = () => {
  const { watch, setValue } = useFormContext()
  const [discussionWhitelist, isDiscussionClosed, trigger, triggerBlock] = watch([
    'triggerAndDiscussion.discussionWhitelist',
    'triggerAndDiscussion.isDiscussionClosed',
    'triggerAndDiscussion.trigger',
    'triggerAndDiscussion.triggerBlock',
  ])

  const addMemberToWhitelist = (member: Member) => {
    setValue('triggerAndDiscussion.discussionWhitelist', [...discussionWhitelist, member], { shouldValidate: true })
  }
  const removeMemberFromWhitelist = (member: Member) => {
    setValue(
      'triggerAndDiscussion.discussionWhitelist',
      discussionWhitelist.filter((whitelistMember: Member) => whitelistMember.id !== member.id),
      { shouldValidate: true }
    )
  }

  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={8}>
          <h4>General parameters</h4>
          <TextMedium lighter>Trigger & discussion</TextMedium>
        </RowGapBlock>
      </Row>
      <RowGapBlock gap={20}>
        <InlineToggleWrap>
          <Label>Trigger: </Label>
          <ToggleCheckbox falseLabel="No" trueLabel="Yes" name="triggerAndDiscussion.trigger" />
          <Tooltip
            tooltipTitle="Trigger"
            tooltipText="Optional trigger block for executing proposal. If trigger is provided, it must be no less than current block plus combined duration of GRACING_LIMIT and DECIDING_PERIOD."
            tooltipLinkURL="https://joystream.gitbook.io/testnet-workspace/system/proposal-system#submit-proposal"
          >
            <TooltipDefault />
          </Tooltip>
        </InlineToggleWrap>
        {trigger && (
          <InputComponent
            units="block"
            inputSize="s"
            name="triggerAndDiscussion.triggerBlock"
            message={triggerBlock ? `≈ ${inBlocksDate(triggerBlock)}` : ''}
          >
            <InputNumber
              id="triggerBlock"
              placeholder="0"
              name="triggerAndDiscussion.triggerBlock"
              maxAllowedValue={Math.pow(2, 32)}
            />
          </InputComponent>
        )}
      </RowGapBlock>
      <RowGapBlock gap={20}>
        <InlineToggleWrap>
          <Label>Discussion mode: </Label>
          <ToggleCheckbox falseLabel="Open" trueLabel="Closed" name="triggerAndDiscussion.isDiscussionClosed" />
          <Tooltip
            tooltipTitle="Discussion Mode"
            tooltipText="Proposal thread is created as part of the process to enable discussion before voting. In open mode, any member can post a message, while in closed mode, only the active council, proposer and whitelisted members can post. Mode can be changed by member or council member at any time."
            tooltipLinkURL="https://joystream.gitbook.io/testnet-workspace/system/proposal-system#discussion"
          >
            <TooltipDefault />
          </Tooltip>
        </InlineToggleWrap>
        {isDiscussionClosed && (
          <RowGapBlock gap={20}>
            <TextMedium lighter>
              Closed mode: only the active council, the original proposer, or one among a set of whitelisted members can
              post.
            </TextMedium>
            <InputComponent
              name="triggerAndDiscussion.discussionWhitelist"
              label="Add member to whitelist"
              required
              inputSize="l"
            >
              <SelectMember
                onChange={(member) => addMemberToWhitelist(member)}
                filter={(member) =>
                  !discussionWhitelist.find((whitelistMember: Member) => whitelistMember.id === member.id)
                }
              />
            </InputComponent>
            <WhitelistContainer>
              {discussionWhitelist.map((member: Member) => (
                <WhitelistMember key={member.id}>
                  <MemberInfo member={member} memberSize="m" showIdOrText skipModal />
                  <WhitelistRemoveMember onClick={() => removeMemberFromWhitelist(member)} id="removeMember" />
                </WhitelistMember>
              ))}
            </WhitelistContainer>
          </RowGapBlock>
        )}
      </RowGapBlock>
    </RowGapBlock>
  )
}

const WhitelistContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 8px;
`

const WhitelistMember = styled.div`
  display: grid;
  grid-template-columns: 1fr 16px;
  grid-column-gap: 8px;
  align-items: center;
  height: 64px;
  padding: 4px 8px;
  background-color: ${Colors.White};
  border: 1px solid ${Colors.Black[300]};
  border-radius: ${BorderRad.s};
  transition: ${Transitions.all};

  &:hover,
  &:focus-within {
    border-color: ${Colors.Blue[400]};
  }
`
const WhitelistRemoveMember = styled(CloseButton)`
  width: 16px;
  height: 16px;
  color: ${Colors.Black[900]};
`
