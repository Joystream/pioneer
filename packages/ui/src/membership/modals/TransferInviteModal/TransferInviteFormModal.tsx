import BN from 'bn.js'
import React, { ReactElement, useCallback, useState } from 'react'

import { useAccounts } from '../../../accounts/hooks/useAccounts'
import { Account } from '../../../accounts/types'
import { ButtonPrimary } from '../../../common/components/buttons'
import { InputComponent, InputNumber } from '../../../common/components/forms'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../../common/components/Modal'
import { Row, TransactionAmount } from '../../../common/components/Modals'
import { TextMedium } from '../../../common/components/typography'
import { useNumberInput } from '../../../common/hooks/useNumberInput'
import { formatTokenValue } from '../../../common/model/formatters'
import { filterMember, SelectMember } from '../../components/SelectMember'
import { BaseMember } from '../../types'

interface Props {
  onClose: () => void
  onAccept: (amount: BN, from: BaseMember, to: BaseMember, signer: Account) => void
  icon: ReactElement
  member?: BaseMember
}

export function TransferInviteFormModal({ onClose, onAccept, icon, member }: Props) {
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
          <TextMedium margin="s">Transfer Invites to a member.</TextMedium>
        </Row>
        <InputComponent label="From" inputSize="l" disabled={!!member}>
          <SelectMember onChange={setFrom} disabled={!!member} selected={from} />
        </InputComponent>
        <TransactionAmount>
          <InputComponent
            id="amount-input"
            label="Number of Invites"
            required
            validation={isShowError ? 'invalid' : undefined}
            message={
              isShowError
                ? `You only have ${from?.inviteCount} invites left.`
                : `You have ${from?.inviteCount} invites.`
            }
            inputWidth="s"
          >
            <InputNumber
              id="amount-input"
              value={formatTokenValue(new BN(amount))}
              placeholder="0"
              onChange={(event) => setAmount(event.target.value)}
            />
          </InputComponent>
        </TransactionAmount>
        <InputComponent label="To" inputSize="l" required>
          <SelectMember onChange={setTo} filter={filterRecipient} />
        </InputComponent>
      </ModalBody>
      <ModalFooter>
        <ButtonPrimary
          size="medium"
          onClick={() => from && to && signer && onAccept(new BN(amount), from, to, signer)}
          disabled={isDisabled}
        >
          Transfer Invites
        </ButtonPrimary>
      </ModalFooter>
    </Modal>
  )
}
