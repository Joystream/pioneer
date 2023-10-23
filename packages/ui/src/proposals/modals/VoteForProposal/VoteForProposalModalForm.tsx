import React from 'react'
import styled from 'styled-components'
import { Event, EventData } from 'xstate/lib/types'
import * as Yup from 'yup'

import { ButtonPrimary, ButtonsGroup } from '@/common/components/buttons'
import { CKEditor } from '@/common/components/CKEditor'
import { InlineToggleWrap, InputComponent, Label, ToggleCheckbox } from '@/common/components/forms'
import { Arrow, CheckboxIcon, CrossIcon } from '@/common/components/icons'
import {
  Modal,
  ModalFooter,
  ModalHeader,
  Row,
  ScrollableModalColumn,
  ScrolledModalBody,
} from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Tooltip, TooltipDefault } from '@/common/components/Tooltip'
import { Colors } from '@/common/constants'
import { useModal } from '@/common/hooks/useModal'
import { useSchema } from '@/common/hooks/useSchema'
import { ProposalPreview } from '@/proposals/modals/VoteForProposal/components/ProposalPreview/ProposalPreview'
import { VoteContext, VoteForProposalEvent } from '@/proposals/modals/VoteForProposal/machine'
import { VoteForProposalModalCall } from '@/proposals/modals/VoteForProposal/types'
import { ProposalWithDetails } from '@/proposals/types'

interface Props {
  proposal: ProposalWithDetails
  send: (event: Event<VoteForProposalEvent>, payload?: EventData) => void
  context: VoteContext
}

const FormSchema = Yup.object().shape({
  rationale: Yup.string().required(),
  voteStatus: Yup.mixed().oneOf(['Approve', 'Reject', 'Abstain', 'Slash']).required(),
})

export const VoteForProposalModalForm = ({ proposal, send, context }: Props) => {
  const { hideModal } = useModal<VoteForProposalModalCall>()
  const { isValid } = useSchema({ ...context }, FormSchema)

  const isRejected = context.voteStatus === 'Reject' || context.voteStatus === 'Slash'

  return (
    <Modal onClose={hideModal} modalSize="l" modalHeight="xl">
      <ModalHeader onClick={hideModal} title="Vote for proposal" />
      <VoteForProposalModalBody>
        <ProposalPreviewColumn>
          <ProposalPreview
            proposalTitle={proposal.title}
            proposalType={proposal.type}
            proposalRationale={proposal.rationale}
            proposalDetails={proposal.details}
          />
        </ProposalPreviewColumn>
        <ScrollableModalColumn>
          <RowGapBlock gap={24}>
            <Row>
              <RowGapBlock gap={8}>
                <h4>Your vote</h4>
              </RowGapBlock>
            </Row>
            <Row>
              <ButtonsGroup>
                <ButtonPrimary
                  size="medium"
                  onClick={() => send('SET_VOTE_STATUS', { status: 'Approve' })}
                  outlined={context.voteStatus !== 'Approve'}
                >
                  <CheckboxIcon />
                  Approve
                </ButtonPrimary>
                <ButtonPrimary
                  size="medium"
                  onClick={() => send('SET_VOTE_STATUS', { status: 'Reject' })}
                  outlined={!isRejected}
                >
                  <CrossIcon />
                  Reject
                </ButtonPrimary>
                <ButtonPrimary
                  size="medium"
                  onClick={() => send('SET_VOTE_STATUS', { status: 'Abstain' })}
                  outlined={context.voteStatus !== 'Abstain'}
                >
                  <CrossIcon />
                  Abstain
                </ButtonPrimary>
              </ButtonsGroup>
            </Row>
            {isRejected && (
              <InlineToggleWrap>
                <Label htmlFor="slash-proposal">Slash Proposal </Label>
                <ToggleCheckbox
                  id="slash-proposal"
                  falseLabel="No"
                  trueLabel="Yes"
                  checked={context.voteStatus === 'Slash'}
                  onChange={(isSet) => send('SET_VOTE_STATUS', { status: isSet ? 'Slash' : 'Reject' })}
                />
                <Tooltip tooltipText="Lorem ipsum...">
                  <TooltipDefault />
                </Tooltip>
              </InlineToggleWrap>
            )}
            <Row>
              <InputComponent label="Rationale" required inputSize="auto" id="field-rationale">
                <CKEditor
                  id="field-rationale"
                  onReady={(editor) => context.rationale && editor.setData(context.rationale)}
                  onChange={(_, editor) => send('SET_RATIONALE', { rationale: editor.getData() })}
                />
              </InputComponent>
            </Row>
          </RowGapBlock>
        </ScrollableModalColumn>
      </VoteForProposalModalBody>
      <ModalFooter>
        <ButtonPrimary disabled={!isValid} onClick={() => send('PASS')} size="medium">
          Sign transaction and Vote
          <Arrow direction="right" />
        </ButtonPrimary>
      </ModalFooter>
    </Modal>
  )
}

const VoteForProposalModalBody = styled(ScrolledModalBody)`
  flex-direction: row;
`
const ProposalPreviewColumn = styled(ScrollableModalColumn)`
  background-color: ${Colors.Black[100]};
  display: flex;
  flex: 0 0 336px;
  flex-direction: column;
  gap: 24px;
`
