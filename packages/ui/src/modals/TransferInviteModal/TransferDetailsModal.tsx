import BN from 'bn.js'
import React, { ReactElement, useCallback, useState } from 'react'
import { Account, BaseMember } from '../../common/types'
import { Button } from '../../components/buttons'
import { InputComponent, Label, NumberInput, ValidationErrorInfo } from '../../components/forms'
import { filterMember, SelectMember } from '../../components/membership/SelectMember'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../components/Modal'
import { Text } from '../../components/typography'
import { useAccounts } from '../../hooks/useAccounts'
import { useNumberInput } from '../../hooks/useNumberInput'
import { formatTokenValue } from '../../utils/formatters'
import { AmountInputBlock, Row, TransactionAmount } from '../common'

interface Props {
  onClose: () => void
  onAccept: (amount: BN, from: BaseMember, to: BaseMember, signer: Account) => void
  icon: ReactElement
  member?: BaseMember
}

export function TransferDetailsModal({ onClose, onAccept, icon, member }: Props) {
  const [from, setFrom] = useState<BaseMember | undefined>(member)
  const [to, setTo] = useState<BaseMember>()
  const [amount, setAmount] = useNumberInput(0)
  const filterRecipient = useCallback(filterMember(from), [from])
  const accounts = useAccounts()

  const signer = accounts.allAccounts.find((a) => a.address === from?.controllerAccount)
  const isAmountValid = !from || parseInt(amount) <= from.inviteCount
  const isDisabled = !amount || !isAmountValid || !from || !to
  const isShowError = amount && !isAmountValid

  return (
    <Modal onClose={onClose} modalSize="m">
      <ModalHeader onClick={onClose} title="Transfer invites" icon={icon} />
      <ModalBody>
        <Row>
          <Text size={1}>Transfer Invites to a member.</Text>
        </Row>
        <InputComponent label="From" inputSize="l">
          <SelectMember onChange={setFrom} disabled={!!member} selected={from} />
        </InputComponent>
        <TransactionAmount>
          <AmountInputBlock>
            <Label htmlFor={'amount-input'}>Number of Invites</Label>
            <NumberInput
              id="amount-input"
              value={formatTokenValue(new BN(amount))}
              onChange={(event) => setAmount(event.target.value)}
              placeholder="0"
            />
            {isShowError && <ValidationErrorInfo>You only have {from?.inviteCount} invites left.</ValidationErrorInfo>}
          </AmountInputBlock>
        </TransactionAmount>
        <InputComponent label="To" inputSize="l">
          <SelectMember onChange={setTo} filter={filterRecipient} />
        </InputComponent>
      </ModalBody>
      <ModalFooter>
        <Button
          size="medium"
          onClick={() => from && to && signer && onAccept(new BN(amount), from, to, signer)}
          disabled={isDisabled}
        >
          Transfer Invites
        </Button>
      </ModalFooter>
    </Modal>
  )
}
