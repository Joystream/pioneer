import BN from 'bn.js'
import React from 'react'
import styled from 'styled-components'
import { BaseMember } from '../../common/types'
import { Button } from '../../components/buttons'
import { SuccessIcon } from '../../components/icons'
import { MemberInfo } from '../../components/membership/MemberInfo'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../components/Modal'
import { Text } from '../../components/typography'
import { BorderRad, Colors, Sizes } from '../../constants'

interface Props {
  onClose: () => void
  recipient: BaseMember
  amount: BN
}

export function TransferSuccessModal({ onClose, recipient, amount }: Props) {
  const plural = amount.gt(new BN(1))
  const name = recipient.name

  return (
    <Modal modalSize="m" modalHeight="s" onClose={onClose}>
      <ModalHeader onClick={onClose} title="Success" icon={<SuccessIcon />} />
      <ModalBody>
        <Text>
          You have just successfully transfered {amount.toString()} invitation{plural && 's'} to {name}.
        </Text>
        <MemberRow>
          <MemberInfo member={recipient} />
        </MemberRow>
      </ModalBody>
      <ModalFooter>
        <Button variant="primary" size="medium" disabled>
          View my profile
        </Button>
      </ModalFooter>
    </Modal>
  )
}

const MemberRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  align-items: center;
  width: 100%;
  min-height: ${Sizes.accountHeight};
  max-height: ${Sizes.accountHeight};
  padding: 8px 72px 8px 14px;
  border: 1px solid ${Colors.Black[300]};
  border-radius: ${BorderRad.s};
  background-color: ${Colors.White};
`
