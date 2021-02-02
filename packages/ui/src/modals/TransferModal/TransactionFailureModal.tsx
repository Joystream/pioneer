import React from 'react'
import styled from 'styled-components'
import { ButtonPrimaryMedium } from '../../components/buttons/Buttons'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../components/modal'
import { Text } from '../../components/page/Typography/Text'

interface Props {
  onClose: () => void
}

export function TransactionFailureModal({ onClose }: Props) {
  return (
    <Modal>
      <ModalHeader onClick={onClose} title="Recovering failure" icon={'😡'} />
      <ModalFailureBody>
        <Text>You have not transferred 'VALUE' balance from 'From acount name' to 'To account name'</Text>
      </ModalFailureBody>
      <ModalFooter>
        <ButtonPrimaryMedium>Accept and close</ButtonPrimaryMedium>
      </ModalFooter>
    </Modal>
  )
}

const ModalFailureBody = styled(ModalBody)`
  border: none;
  padding-bottom: 132px;
`
