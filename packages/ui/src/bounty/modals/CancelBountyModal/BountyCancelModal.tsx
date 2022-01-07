import { useMachine } from '@xstate/react'
import React from 'react'
import styled from 'styled-components'

import { AuthorizationModal } from '@/bounty/modals/CancelBountyModal/AuthorizationModal'
import { bountyCancelMachine, BountyCancelStates } from '@/bounty/modals/CancelBountyModal/machine'
import { BountyCancelModalCall } from '@/bounty/modals/CancelBountyModal/types'
import { ButtonPrimary } from '@/common/components/buttons'
import { InputComponent, InputContainer } from '@/common/components/forms'
import { FileIcon } from '@/common/components/icons'
import { Modal, ModalBody, ModalFooter, ModalHeader, TransactionInfoContainer } from '@/common/components/Modal'
import { ColumnGapBlock, RowGapBlock } from '@/common/components/page/PageContent'
import { TransactionInfo } from '@/common/components/TransactionInfo'
import { TextBig, TextMedium } from '@/common/components/typography'
import { BN_ZERO, Colors } from '@/common/constants'
import { useModal } from '@/common/hooks/useModal'
import { SelectedMember } from '@/memberships/components/SelectMember'

export const BountyCancelModal = () => {
  const [state, send, service] = useMachine(bountyCancelMachine)
  const { hideModal, modalData } = useModal<BountyCancelModalCall>()

  if (state.matches(BountyCancelStates.AUTHORIZATION)) {
    return (
      <AuthorizationModal
        service={service}
        onClose={hideModal}
        creator={modalData.creator}
        bountyId={modalData.bounty.id}
      />
    )
  }

  return (
    <Modal onClose={hideModal} modalSize="l">
      <ModalHeader title="Cancel Bounty" onClick={hideModal} />
      <ModalBody>
        <BodyContainer gap={30}>
          <WarningWrapper>
            <ColumnGapBlock gap={4}>
              <TextMedium bold value>
                <FileIcon /> Are you sure
              </TextMedium>
            </ColumnGapBlock>
            <TextMedium inter light>
              Do you really want to cancel bounty?
            </TextMedium>
          </WarningWrapper>
          <Container disabled label="Bounty ID" tooltipText="Lorem ipsum..." inputSize="l">
            <TextBig value bold>
              {modalData.bounty.title}
            </TextBig>
          </Container>
          <SelectedMember disabled label="Member ID" tooltipText="Lorem ipsum..." member={modalData.creator} />
        </BodyContainer>
      </ModalBody>
      <ModalFooter>
        <TransactionInfoContainer>
          <TransactionInfo title="Transaction fee:" value={BN_ZERO} tooltipText="Lorem ipsum..." />
        </TransactionInfoContainer>
        <ButtonPrimary size="medium" onClick={() => send('NEXT')}>
          Cancel Bounty
        </ButtonPrimary>
      </ModalFooter>
    </Modal>
  )
}

const BodyContainer = styled(RowGapBlock)`
  label {
    color: ${Colors.Black[900]};
  }
`

const WarningWrapper = styled.div`
  background-color: ${Colors.Warning[50]};
  width: 100%;
  padding: 10px 15px;
  > * {
    padding: 5px 0;
  }
`

const Container = styled(InputComponent)`
  ${InputContainer} {
    padding-left: 16px;
  }
`
