import React from 'react'
import styled from 'styled-components'

import { ButtonPrimary } from '@/common/components/buttons'
import { Arrow } from '@/common/components/icons'
import { Modal, ModalFooter, ModalHeader, ScrollableModalColumn, ScrolledModalBody } from '@/common/components/Modal'
import { Colors } from '@/common/constants'
import { useModal } from '@/common/hooks/useModal'
import { ProposalPreview } from '@/proposals/modals/VoteForProposal/components/ProposalPreview'
import { VoteForProposalModalCall } from '@/proposals/modals/VoteForProposal/types'

export const VoteForProposalModalForm = () => {
  const { hideModal, modalData } = useModal<VoteForProposalModalCall>()
  return (
    <Modal onClose={hideModal} modalSize="l" modalHeight="xl">
      <ModalHeader onClick={hideModal} title="Vote for proposal" />
      <VoteForProposalModalBody>
        <ProposalPreviewColumn>
          <ProposalPreview proposalId={modalData.id} />
        </ProposalPreviewColumn>
        <ScrollableModalColumn>
          <div>vote for proposal - right column</div>
        </ScrollableModalColumn>
      </VoteForProposalModalBody>
      <ModalFooter>
        <ButtonPrimary disabled onClick={() => undefined} size="medium">
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
