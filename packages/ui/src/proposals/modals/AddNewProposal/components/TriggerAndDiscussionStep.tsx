import BN from 'bn.js'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { InputComponent, InputNumber, ToggleCheckbox } from '@/common/components/forms'
import { CrossIcon, Icon } from '@/common/components/icons'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { BorderRad, Colors, Transitions } from '@/common/constants'
import { useCurrentBlockNumber } from '@/common/hooks/useCurrentBlockNumber'
import { useNumberInput } from '@/common/hooks/useNumberInput'
import { blocksToTime } from '@/common/model/blocksToTime'
import { MemberDarkHover, MemberInfo } from '@/memberships/components'
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
  discussionMode?: ProposalDiscussionMode
  discussionWhitelist?: ProposalDiscussionWhitelist
  setTrigger: (trigger?: ProposalTrigger) => void
  setDiscussionMode: (mode: ProposalDiscussionMode) => void
  setDiscussionWhitelist: (members: Member[]) => void
}

export const TriggerAndDiscussionStep = ({
  constants,
  trigger: initialTrigger,
  discussionMode,
  discussionWhitelist,
  setTrigger: saveTrigger,
  setDiscussionMode,
  setDiscussionWhitelist,
}: TriggerAndDiscussionStepProps) => {
  const currentBlock = useCurrentBlockNumber()
  const [trigger, setTrigger] = useState<boolean>(!!initialTrigger)
  const [triggerBlock, setTriggerBlock] = useNumberInput(0, initialTrigger || undefined)
  const [isValidBlock, setIsValidBlock] = useState<boolean>(false)
  const [blockMessage, setBlockMessage] = useState<string | undefined>()

  useEffect(() => {
    setDiscussionMode('open')
    setDiscussionWhitelist([])
  }, [])

  useEffect(() => {
    if (!trigger) {
      saveTrigger(false)
      setTriggerBlock('')
      setIsValidBlock(false)
    } else {
      const minTriggerBlock = currentBlock?.addn(constants.votingPeriod).addn(constants.gracePeriod)
      const isValid = !!(triggerBlock && minTriggerBlock && new BN(triggerBlock).gte(minTriggerBlock))

      setIsValidBlock(isValid)
      setBlockMessage(
        isValid ? `in ${blocksToTime(new BN(triggerBlock))}` : `The minimum block number is ${minTriggerBlock}.`
      )
      saveTrigger(isValid ? parseInt(triggerBlock) : undefined)
    }
  }, [trigger, triggerBlock, currentBlock])

  useEffect(() => {
    if (discussionMode === 'open') {
      setDiscussionWhitelist([])
    }
  }, [discussionMode])

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
            <ToggleCheckbox falseLabel="No" trueLabel="Yes" checked={trigger} onChange={(isSet) => setTrigger(isSet)} />
          </InputComponent>
          {trigger && (
            <InputComponent
              units="block"
              validation={triggerBlock && !isValidBlock ? 'invalid' : undefined}
              message={triggerBlock ? blockMessage : undefined}
              inputSize="s"
            >
              <InputNumber value={triggerBlock} onChange={(event) => setTriggerBlock(event.target.value)} />
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
              checked={discussionMode === 'open'}
              onChange={(isSet) => setDiscussionMode(isSet ? 'open' : 'closed')}
            />
          </InputComponent>
          {discussionMode === 'closed' && (
            <RowGapBlock gap={8}>
              <TextMedium lighter>
                Closed mode: only the active council, the original proposer, or one among a set of whitelisted members
                can post.
              </TextMedium>
              <InputComponent label="Whitelist" required inputSize="l">
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
                  <WhitelistMember>
                    <MemberInfo key={member.id} member={member} memberSize="s" />
                    <WhitelistRemoveMemberIcon onClick={() => removeMemberFromWhitelist(member)}>
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
