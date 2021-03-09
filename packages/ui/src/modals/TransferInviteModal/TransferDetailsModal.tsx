import BN from 'bn.js'
import { BaseMember } from '../../common/types'
import { ButtonPrimaryMedium } from '../../components/buttons'
import React, { ReactElement, useState } from 'react'
import styled from 'styled-components'
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
  const [from, setFrom] = useState<BaseMember | undefined>(member)
  const [to, setTo] = useState<BaseMember>()
  const [amount, setAmount] = useNumberInput(0)

  const isAmountValid = !member || parseInt(amount) < member.inviteCount
  const isDisabled = !amount || !isAmountValid || !from || !to
  const isShowError = amount && !isAmountValid

  return (
    <Modal onClose={onClose} modalSize="m">
      <ModalHeader onClick={onClose} title="Transfer invites" icon={icon} />
      <ModalBody>
        <Row>
          <Text size={1}>Transfer Invites to a member.</Text>
        </Row>
        <Row>
          <Label>From</Label>
          <SelectMember onChange={setFrom} enable={!member} selected={member} />
        </Row>
        <TransactionAmount>
          <AmountInputBlock>
            <Label htmlFor={'amount-input'}>Number of invites</Label>
            <NumberInput
              id="amount-input"
              value={formatTokenValue(new BN(amount))}
              onChange={(event) => setAmount(event.target.value)}
              placeholder="0"
            />
            {isShowError && <ValidationErrorInfo>Foo bar</ValidationErrorInfo>}
          </AmountInputBlock>
        </TransactionAmount>
        <Row>
          <Label>To</Label>
          <SelectMember onChange={setTo} enable={true} />
        </Row>
      </ModalBody>
      <ModalFooter>
        <ButtonPrimaryMedium onClick={() => null} disabled={isDisabled}>
          Transfer Invites
        </ButtonPrimaryMedium>
      </ModalFooter>
    </Modal>
  )
}

const ValidationErrorInfo = styled.span`
  color: red;
  padding: 4px 0;
`
