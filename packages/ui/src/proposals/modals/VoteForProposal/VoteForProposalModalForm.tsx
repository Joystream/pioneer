import React from 'react'
import styled from 'styled-components'

import { ButtonPrimary } from '@/common/components/buttons'
import { Arrow } from '@/common/components/icons'
import { Modal, ModalFooter, ModalHeader, ScrollableModalColumn, ScrolledModalBody } from '@/common/components/Modal'
import { useModal } from '@/common/hooks/useModal'
import { VoteForProposalModalCall } from '@/proposals/modals/VoteForProposal/types'

export interface VoteForProposalModalFormProps {
  foo?: number
}

export const VoteForProposalModalForm = ({ foo }: VoteForProposalModalFormProps) => {
  const { hideModal } = useModal<VoteForProposalModalCall>()
  return (
    <Modal onClose={hideModal} modalSize="l" modalHeight="xl">
      <ModalHeader onClick={hideModal} title="Vote for proposal" />
      <VoteForProposalModalBody>
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
