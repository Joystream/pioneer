import React from 'react'
import styled from 'styled-components'
import { ButtonPrimaryMedium } from '../../components/buttons/Buttons'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../components/modal'
import { Text } from '../../components/page/Typography/Text'
import { useAccounts } from '../../hooks/useAccounts'

export function TransactionFailureModal() {
  const accounts = useAccounts()

  if (!accounts.hasAccounts) {
    return <></>
  }

  // const [from, to] = accounts.allAccounts

  return (
    <Modal>
      <ModalHeader
        onClick={() => {
          /**/
        }}
        title="Recovering failure"
        icon={'😡'}
      />
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
