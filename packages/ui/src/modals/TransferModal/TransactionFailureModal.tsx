import BN from 'bn.js'
import React from 'react'
import styled from 'styled-components'
import { ButtonPrimaryMedium } from '../../components/buttons'
import { ArrowDownIcon, Icon, SuccessIcon } from '../../components/icons'
import { ModalHeader, Modal, SuccessModalBody } from '../../components/Modal'
import { TokenValue } from '../../components/typography'
import { Account } from '../../common/types'
import { TransactionInfoLabel } from '../common'

interface Props {
  onClose: () => void
  from: Account
  amount: BN
  to: Account
}

export function TransactionFailureModal({ onClose, from, amount, to }: Props) {
  return (
    <Modal modalSize={'s'}>
      <ModalHeader onClick={onClose} title="Failure" icon={<SuccessIcon />} />
      <SuccessModalBody>
        <TransactionInfoLabel>
          You haven’t transferred <TokenValue value={amount} /> stake from {from.name} account to {to.name} destination,
          because of a lorem ipsum dolor sit amet enim probem.
        </TransactionInfoLabel>
        <AcceptFailure onClick={onClose}>
          Accept and close <ArrowDownIcon />
        </AcceptFailure>
      </SuccessModalBody>
    </Modal>
  )
}

const AcceptFailure = styled(ButtonPrimaryMedium)`
  align-self: end;
  justify-self: end;
  margin-bottom: -24px;

  ${Icon} {
    transform: rotate(-90deg);
  }
`
