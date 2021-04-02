import BN from 'bn.js'
import React, { useMemo } from 'react'
import styled from 'styled-components'
import { AccountInfo } from '../../components/AccountInfo'
import { ButtonPrimary } from '../../components/buttons'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../components/Modal'
import { Text, TokenValue } from '../../components/typography'
import { BorderRad, Colors, Sizes } from '../../constants'
import { useAccounts } from '../../hooks/useAccounts'
import { useModal } from '../../hooks/useModal'
import { TransferModalCall } from '../TransferModal'

interface Props {
  onClose: () => void
  address: string
  amount: BN
}

export function RequirementFailedModal({ onClose, address, amount }: Props) {
  const { showModal } = useModal()
  const { allAccounts } = useAccounts()
  const account = useMemo(
    () => allAccounts.find((acc) => acc.address == address) || { name: 'Controller account', address },
    [allAccounts]
  )

  return (
    <Modal modalSize="m" modalHeight="s" onClose={onClose}>
      <ModalHeader onClick={onClose} title="Insufficient Funds" />
      <ModalBody>
        <Text size={2} margin="s">
          Unfortunately, you don't have enough Tokens on your Controller account. You need at least{' '}
          <TokenValue value={amount} /> for the transaction fee.
        </Text>
        <MemberRow>
          <AccountInfo account={account} />
        </MemberRow>
      </ModalBody>
      <ModalFooter>
        <ButtonPrimary
          size="medium"
          onClick={() => showModal<TransferModalCall>({ modal: 'TransferTokens', data: { to: account } })}
        >
          Add JOY to Controller Account
        </ButtonPrimary>
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
