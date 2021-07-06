import BN from 'bn.js'
import React from 'react'
import styled from 'styled-components'
import * as Yup from 'yup'

import { InputComponent, InputNumber, ToggleCheckbox } from '@/common/components/forms'
import { CrossIcon } from '@/common/components/icons'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { BorderRad, Colors, Transitions } from '@/common/constants'
import { useCurrentBlockNumber } from '@/common/hooks/useCurrentBlockNumber'
import { useForm } from '@/common/hooks/useForm'
import { blocksToTime } from '@/common/model/blocksToTime'
import { MemberInfo } from '@/memberships/components'
import { SelectMember } from '@/memberships/components/SelectMember'
import { Member } from '@/memberships/types'
import {
  ProposalDiscussionMode,
  ProposalDiscussionWhitelist,
  ProposalTrigger,
} from '@/proposals/modals/AddNewProposal/machine'
import { ProposalConstants } from '@/proposals/types'

interface TriggerAndDiscussionStepProps {
  constants: ProposalConstants
  trigger?: ProposalTrigger
  discussionMode: ProposalDiscussionMode
  discussionWhitelist: ProposalDiscussionWhitelist
  setTrigger: (trigger?: ProposalTrigger) => void
  setDiscussionMode: (mode: ProposalDiscussionMode) => void
  setDiscussionWhitelist: (members: Member[]) => void
}

interface StepFormFields {
  trigger: boolean
  triggerBlock?: string
  discussionMode: boolean
}

const FormSchema = Yup.object().shape({})

export const TriggerAndDiscussionStep = ({
  constants,
  trigger,
  discussionMode,
  discussionWhitelist,
  setTrigger,
  setDiscussionMode,
  setDiscussionWhitelist,
}: TriggerAndDiscussionStepProps) => {
  const currentBlock = useCurrentBlockNumber()
  const minTriggerBlock = currentBlock
    ? currentBlock.addn(constants.votingPeriod).addn(constants.gracePeriod)
    : new BN(0)
  const isValidTriggerBlock = (block: BN) => {
    return block && block.gte(minTriggerBlock)
  }

  const formInitializer: StepFormFields = {
    trigger: !!trigger,
    triggerBlock: trigger ? trigger.toString() : '',
    discussionMode: discussionMode === 'open',
  }

  const { fields, changeField } = useForm<StepFormFields>(formInitializer, FormSchema)

  const setValue = (field: keyof StepFormFields, value: any) => {
    changeField(field, value)

    switch (field) {
      case 'trigger':
        setTrigger(!value ? false : undefined)
        break
      case 'triggerBlock':
        setTrigger(value && isValidTriggerBlock(new BN(value)) ? parseInt(value) : undefined)
        break
      case 'discussionMode':
        if (value === true) {
          setDiscussionWhitelist([])
        }
        setDiscussionMode(value ? 'open' : 'closed')
    }
  }

  const getTriggerBlockMessage = () => {
    if (!fields.triggerBlock) {
      return
    }

    const value = new BN(fields.triggerBlock)

    return isValidTriggerBlock(value)
      ? `in ${blocksToTime(value)}`
      : `The minimum block number is ${minTriggerBlock.toNumber()}.`
  }

  const addMemberToWhitelist = (member: Member) => {
    setDiscussionWhitelist([...(discussionWhitelist as ProposalDiscussionWhitelist), member])
  }
  const removeMemberFromWhitelist = (member: Member) => {
    setDiscussionWhitelist(
      (discussionWhitelist as ProposalDiscussionWhitelist).filter((whitelistMember) => whitelistMember.id !== member.id)
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
      <Row>
        <RowGapBlock gap={20}>
          <InputComponent label="Trigger" tooltipText="Something" inputSize="s">
            <ToggleCheckbox
              falseLabel="No"
              trueLabel="Yes"
              checked={fields.trigger}
              onChange={(isSet) => setValue('trigger', isSet)}
            />
          </InputComponent>
          {fields.trigger && (
            <InputComponent
              units="block"
              validation={
                fields.triggerBlock && !isValidTriggerBlock(new BN(fields.triggerBlock)) ? 'invalid' : undefined
              }
              message={getTriggerBlockMessage()}
              inputSize="s"
            >
              <InputNumber
                id="triggerBlock"
                value={fields.triggerBlock}
                onChange={(event) => setValue('triggerBlock', event.target.value)}
              />
            </InputComponent>
          )}
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={20}>
          <InputComponent label="Discussion mode" tooltipText="Something" inputSize="s">
            <ToggleCheckbox
              falseLabel="Closed"
              trueLabel="Open"
              checked={fields.discussionMode}
              onChange={(isSet) => setValue('discussionMode', isSet)}
            />
          </InputComponent>
          {discussionMode === 'closed' && (
            <RowGapBlock gap={8}>
              <TextMedium lighter>
                Closed mode: only the active council, the original proposer, or one among a set of whitelisted members
                can post.
              </TextMedium>
              <InputComponent label="Add member to whitelist" required inputSize="l">
                <SelectMember
                  onChange={(member) => addMemberToWhitelist(member)}
                  filter={(member) =>
                    !(discussionWhitelist as ProposalDiscussionWhitelist).find(
                      (whitelistMember) => whitelistMember.id === member.id
                    )
                  }
                />
              </InputComponent>
              <WhitelistContainer>
                {(discussionWhitelist as ProposalDiscussionWhitelist).map((member) => (
                  <WhitelistMember key={member.id}>
                    <MemberInfo member={member} memberSize="s" />
                    <WhitelistRemoveMemberIcon onClick={() => removeMemberFromWhitelist(member)} id="removeMember">
                      <CrossIcon />
                    </WhitelistRemoveMemberIcon>
                  </WhitelistMember>
                ))}
              </WhitelistContainer>
            </RowGapBlock>
          )}
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}

const WhitelistContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
`

const WhitelistMember = styled.div`
  display: grid;
  grid-template-columns: 1fr 16px;
  grid-column-gap: 8px;
  align-items: center;
  padding: 12px 8px;
  background-color: ${Colors.White};
  border-radius: ${BorderRad.s};
  transition: ${Transitions.all};
`

const WhitelistRemoveMemberIcon = styled.span`
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }
`
