import BN from 'bn.js'
import React, { useCallback, useState } from 'react'

import { ButtonPrimary } from '@/common/components/buttons'
import { PickedTransferIcon } from '@/common/components/icons/TransferIcons'
import { BN_ZERO } from '@/common/constants'
import { useNumberInput } from '@/common/hooks/useNumberInput'
import { formatTokenValue } from '@/common/model/formatters'

import { InputComponent, InputNumber } from '../../../common/components/forms'
import {
  AmountButton,
  AmountButtons,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  TransactionAmount,
} from '../../../common/components/Modal'
import { filterAccount, SelectAccount, SelectedAccount } from '../../components/SelectAccount'
import { useBalance } from '../../hooks/useBalance'
import { Account } from '../../types'

interface Props {
  from?: Account
  to?: Account
  onClose: () => void
  onAccept: (amount: BN, from: Account, to: Account) => void
  title: string
  minValue?: BN
  maxValue?: BN
  initialValue?: BN
}

export function TransferFormModal({ from, to, onClose, onAccept, title, maxValue, minValue, initialValue }: Props) {
  const [recipient, setRecipient] = useState<Account | undefined>(to)
  const [sender, setSender] = useState<Account | undefined>(from)
  const [amount, setAmount] = useNumberInput(0, initialValue)
  const senderBalance = useBalance(sender?.address)
  const filterSender = useCallback(filterAccount(recipient), [recipient])
  const transferableBalance = senderBalance?.transferable ?? BN_ZERO
  const filterRecipient = useCallback(filterAccount(sender), [sender])
  const getIconType = () => (!from ? (!to ? 'transfer' : 'receive') : 'send')

  const isZero = new BN(amount).lte(BN_ZERO)
  const isOverBalance = new BN(amount).gt(maxValue || transferableBalance || 0)
  const isUnderMinimum = new BN(amount).lt(minValue || BN_ZERO)
  const isTransferDisabled = isZero || isOverBalance || !recipient || isUnderMinimum
  const isValueDisabled = !sender

  const setHalf = () => setAmount(transferableBalance.div(new BN(2)).toString())
  const setMax = () => setAmount(maxValue?.toString() || transferableBalance.toString())
  const onClick = () => {
    if (amount && recipient && sender) {
      onAccept(new BN(amount), sender, recipient)
    }
  }
  return (
    <Modal modalSize={'m'} onClose={onClose}>
      <ModalHeader onClick={onClose} title={title} icon={<PickedTransferIcon type={getIconType()} />} />
      <ModalBody>
        <Row>
          <InputComponent
            required
            inputSize="l"
            label="From"
            id="transfer-from-input"
            disabled={!!from}
            borderless={!!from}
          >
            {from ? (
              <SelectedAccount account={from} />
            ) : (
              <SelectAccount filter={filterSender} onChange={setSender} selected={sender} />
            )}
          </InputComponent>
        </Row>
        <TransactionAmount>
          <InputComponent
            label="Number of tokens"
            id="amount-input"
            disabled={isValueDisabled}
            required
            inputWidth="s"
            units="JOY"
          >
            <InputNumber
              id="amount-input"
              value={formatTokenValue(new BN(amount))}
              onChange={(event) => setAmount(event.target.value)}
              disabled={isValueDisabled}
              placeholder="0"
            />
          </InputComponent>
          <AmountButtons>
            <AmountButton size="small" onClick={setHalf} disabled={isValueDisabled}>
              Use half
            </AmountButton>
            <AmountButton size="small" onClick={setMax} disabled={isValueDisabled}>
              Use max
            </AmountButton>
          </AmountButtons>
        </TransactionAmount>
        <Row>
          <InputComponent
            required
            inputSize="l"
            label="Destination account"
            id="transfer-to-input"
            disabled={!!to}
            borderless={!!to}
          >
            {to ? (
              <SelectedAccount account={to} />
            ) : (
              <SelectAccount filter={filterRecipient} onChange={setRecipient} selected={recipient} />
            )}
          </InputComponent>
        </Row>
      </ModalBody>
      <ModalFooter>
        <ButtonPrimary size="medium" onClick={onClick} disabled={isTransferDisabled}>
          Transfer tokens
        </ButtonPrimary>
      </ModalFooter>
    </Modal>
  )
}
