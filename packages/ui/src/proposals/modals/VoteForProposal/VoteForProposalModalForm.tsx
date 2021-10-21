import React from 'react'
import styled from 'styled-components'
import * as Yup from 'yup'

import { ButtonPrimary, ButtonsGroup } from '@/common/components/buttons'
import { CKEditor } from '@/common/components/CKEditor'
import { InlineToggleWrap, InputComponent, Label, ToggleCheckbox } from '@/common/components/forms'
import { Arrow, CrossIcon, VerifiedMemberIcon } from '@/common/components/icons'
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
import { useForm } from '@/common/hooks/useForm'
import { useModal } from '@/common/hooks/useModal'
import { ProposalPreview } from '@/proposals/modals/VoteForProposal/components/ProposalPreview'
import { VoteStatus } from '@/proposals/modals/VoteForProposal/machine'
import { VoteForProposalModalCall } from '@/proposals/modals/VoteForProposal/types'

interface FormFields {
  voteStatus?: VoteStatus
  rationale?: string
}

interface Props {
  setStatus: (status: VoteStatus) => void
  setRationale: (rationale: string) => void
  onNext: () => void
}

const FormSchema = Yup.object().shape({
  voteStatus: Yup.string().required(),
  rationale: Yup.string().required(),
})

export const VoteForProposalModalForm = ({ setStatus, setRationale, onNext }: Props) => {
  const { hideModal, modalData } = useModal<VoteForProposalModalCall>()
  const { fields, changeField, validation } = useForm<FormFields>({}, FormSchema)
  const { isValid } = validation
  const isRejected = fields.voteStatus === 'Reject' || fields.voteStatus === 'Slash'
  // useEffect(() => {
  //   setStatus(fields.voteStatus)
  // }, [fields.voteStatus])

  const setVoteStatus = (status: VoteStatus) => {
    changeField('voteStatus', status)
    setStatus(status)
  }

  return (
    <Modal onClose={hideModal} modalSize="l" modalHeight="xl">
      <ModalHeader onClick={hideModal} title="Vote for proposal" />
      <VoteForProposalModalBody>
        <ProposalPreviewColumn>
          <ProposalPreview proposalId={modalData.id} />
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
                  onClick={() => setVoteStatus('Approve')}
                  outlined={fields.voteStatus !== 'Approve'}
                >
                  <VerifiedMemberIcon />
                  Approve
                </ButtonPrimary>
                <ButtonPrimary size="medium" onClick={() => setVoteStatus('Reject')} outlined={!isRejected}>
                  <CrossIcon />
                  Reject
                </ButtonPrimary>
                <ButtonPrimary
                  size="medium"
                  onClick={() => setVoteStatus('Abstain')}
                  outlined={fields.voteStatus !== 'Abstain'}
                >
                  <CrossIcon />
                  Abstain
                </ButtonPrimary>
              </ButtonsGroup>
            </Row>
            {isRejected && (
              <InlineToggleWrap>
                <Label>Slash Proposal </Label>
                <ToggleCheckbox
                  falseLabel="No"
                  trueLabel="Yes"
                  checked={fields.voteStatus === 'Slash'}
                  onChange={(isSet) => setVoteStatus(isSet ? 'Slash' : 'Reject')}
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
                  onChange={(event, editor) => {
                    changeField('rationale', editor.getData())
                    setRationale(editor.getData())
                  }}
                />
              </InputComponent>
            </Row>
          </RowGapBlock>
        </ScrollableModalColumn>
      </VoteForProposalModalBody>
      <ModalFooter>
        <ButtonPrimary disabled={!isValid} onClick={onNext} size="medium">
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
