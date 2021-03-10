import BN from 'bn.js'
import React, { ReactElement } from 'react'
import { BaseMember } from '../../common/types'
import { ButtonPrimaryMedium } from '../../components/buttons'
import { Label, NumberInput } from '../../components/forms'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../components/Modal'
import { SelectMember } from '../../components/selects/SelectMember'
import { Text } from '../../components/typography'
import { useNumberInput } from '../../hooks/useNumberInput'
import { formatTokenValue } from '../../utils/formatters'
import { AmountInputBlock, Row, TransactionAmount } from '../common'

interface Props {
  onClose: () => void
  icon: ReactElement
  member?: BaseMember
}

export function TransferDetailsModal({ onClose, icon, member }: Props) {
  const stubHandler = () => undefined
  const [amount, setAmount] = useNumberInput(0)

  return (
    <Modal onClose={onClose} modalSize="m">
      <ModalHeader onClick={onClose} title="Transfer invites" icon={icon} />
      <ModalBody>
        <Row>
          <Text size={1}>Transfer Invites to a member.</Text>
        </Row>
        <Row>
          <Label>From</Label>
          <SelectMember onChange={stubHandler} disabled={!!member} selected={member} />
        </Row>
        <TransactionAmount>
          <AmountInputBlock>
            <Label htmlFor={'amount-input'}>Number of tokens</Label>
            <NumberInput
              id="amount-input"
              value={formatTokenValue(new BN(amount))}
              onChange={(event) => setAmount(event.target.value)}
              placeholder="0"
            />
          </AmountInputBlock>
        </TransactionAmount>
        <Row>
          <Label>To</Label>
          <SelectMember onChange={stubHandler} />
        </Row>
      </ModalBody>
      <ModalFooter>
        <ButtonPrimaryMedium onClick={() => null} disabled>
          Transfer Invites
        </ButtonPrimaryMedium>
      </ModalFooter>
    </Modal>
  )
}
