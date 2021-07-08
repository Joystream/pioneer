import BN from 'bn.js'
import { differenceInSeconds } from 'date-fns'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import * as Yup from 'yup'

import { InlineToggleWrap, InputComponent, InputNumber, Label, ToggleCheckbox } from '@/common/components/forms'
import { CrossIcon } from '@/common/components/icons'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Tooltip, TooltipDefault } from '@/common/components/Tooltip'
import { TextMedium } from '@/common/components/typography'
import { BN_ZERO, BorderRad, Colors, SECONDS_PER_BLOCK, Transitions } from '@/common/constants'
import { useCurrentBlockNumber } from '@/common/hooks/useCurrentBlockNumber'
import { useForm } from '@/common/hooks/useForm'
import { getMaxBlock } from '@/common/model/getMaxBlock'
import { inBlocksDate } from '@/common/model/inBlocksDate'
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
  params: {
    constants: ProposalConstants
    triggerBlock?: ProposalTrigger
    discussionMode: ProposalDiscussionMode
    discussionWhitelist: ProposalDiscussionWhitelist
  }
  setTriggerBlock: (trigger?: ProposalTrigger) => void
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
  params,
  setTriggerBlock,
  setDiscussionMode,
  setDiscussionWhitelist,
}: TriggerAndDiscussionStepProps) => {
  const { constants, triggerBlock, discussionMode, discussionWhitelist } = params

  const currentBlock = useCurrentBlockNumber()
  const minTriggerBlock = currentBlock ? currentBlock.addn(constants.votingPeriod).addn(constants.gracePeriod) : BN_ZERO
  const maxTriggerBlock = getMaxBlock(currentBlock)
  const isValidTriggerBlock = (block: BN) => {
    return block && block.gte(minTriggerBlock) && block.lte(maxTriggerBlock)
  }

  useEffect(() => {
    if (fields.triggerBlock && !isValidTriggerBlock(new BN(fields.triggerBlock))) {
      setTriggerBlock(undefined)
    }
  }, [currentBlock?.toNumber()])

  const formInitializer: StepFormFields = {
    trigger: !!triggerBlock,
    triggerBlock: triggerBlock ? triggerBlock.toString() : '',
    discussionMode: discussionMode === 'open',
  }
  const { fields, changeField } = useForm<StepFormFields>(formInitializer, FormSchema)

  const setValue = (field: keyof StepFormFields, value: any) => {
    switch (field) {
      case 'trigger':
        setTriggerBlock(!value ? false : undefined)
        break
      case 'triggerBlock':
        value = !isNaN(value) ? value : fields.triggerBlock

        setTriggerBlock(value && isValidTriggerBlock(new BN(value)) ? parseInt(value) : undefined)
        break
      case 'discussionMode':
        if (value === true) {
          setDiscussionWhitelist([])
        }
        setDiscussionMode(value ? 'open' : 'closed')
    }

    changeField(field, value)
  }

  const getTriggerBlockMessage = () => {
    if (!fields.triggerBlock) {
      return
    }

    const value = new BN(fields.triggerBlock)

    if (!isValidTriggerBlock(value)) {
      return value.gte(maxTriggerBlock)
        ? `The maximum block number is ${maxTriggerBlock.toNumber()}.`
        : `The minimum block number is ${minTriggerBlock.toNumber()}.`
    }

    return `≈ ${inBlocksDate(value.sub(minTriggerBlock))}`
  }

  const addMemberToWhitelist = (member: Member) => {
    setDiscussionWhitelist([...discussionWhitelist, member])
  }
  const removeMemberFromWhitelist = (member: Member) => {
    setDiscussionWhitelist(discussionWhitelist.filter((whitelistMember) => whitelistMember.id !== member.id))
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
          <InlineToggleWrap>
            <Label>Trigger: </Label>
            <ToggleCheckbox
              falseLabel="No"
              trueLabel="Yes"
              checked={fields.trigger}
              onChange={(isSet) => setValue('trigger', isSet)}
            />
            <Tooltip tooltipText="Lorem ipsum...">
              <TooltipDefault />
            </Tooltip>
          </InlineToggleWrap>
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
          <InlineToggleWrap>
            <Label>Discussion mode: </Label>
            <ToggleCheckbox
              falseLabel="Closed"
              trueLabel="Open"
              checked={fields.discussionMode}
              onChange={(isSet) => setValue('discussionMode', isSet)}
            />
            <Tooltip tooltipText="Lorem ipsum...">
              <TooltipDefault />
            </Tooltip>
          </InlineToggleWrap>
          {discussionMode === 'closed' && (
            <RowGapBlock gap={8}>
              <TextMedium lighter>
                Closed mode: only the active council, the original proposer, or one among a set of whitelisted members
                can post.
              </TextMedium>
              <InputComponent label="Add member to whitelist" required inputSize="l">
                <SelectMember
                  onChange={(member) => addMemberToWhitelist(member)}
                  filter={(member) => !discussionWhitelist.find((whitelistMember) => whitelistMember.id === member.id)}
                />
              </InputComponent>
              <WhitelistContainer>
                {discussionWhitelist.map((member) => (
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
