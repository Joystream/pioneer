import BN from 'bn.js'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import * as Yup from 'yup'

import { useMyBalances } from '@/accounts/hooks/useMyBalances'
import { ButtonPrimary } from '@/common/components/buttons'
import { getErrorMessage, hasError } from '@/common/components/forms/FieldError'
import { PickedTransferIcon } from '@/common/components/icons/TransferIcons'
import { BN_ZERO } from '@/common/constants'
import { useForm } from '@/common/hooks/useForm'
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

interface TransferTokensFormField {
  amount?: string
}

const schemaFactory = (maxValue?: BN, minValue?: BN, senderBalance?: BN) => {
  const schema = Yup.object().shape({
    amount: Yup.number(),
  })

  if (senderBalance) {
    schema.fields.amount = schema.fields.amount.max(senderBalance.toNumber(), 'Maximum amount allowed is ${max}')
  }

  if (maxValue && senderBalance && senderBalance.gt(maxValue)) {
    schema.fields.amount = schema.fields.amount.max(maxValue.toNumber(), 'Maximum amount allowed is ${max}')
  }
  if (minValue) {
    schema.fields.amount = schema.fields.amount.min(minValue.toNumber(), 'Minimum amount allowed is ${min}')
  }
  return schema
}

export function TransferFormModal({ from, to, onClose, onAccept, title, maxValue, minValue, initialValue }: Props) {
  const [recipient, setRecipient] = useState<Account | undefined>(to)
  const [sender, setSender] = useState<Account | undefined>(from)
  const [amount, setAmount] = useNumberInput(0, initialValue)
  const balances = useMyBalances()
  const filterSender = useCallback(
    (account: Account) => account.address !== recipient?.address && balances[account.address]?.transferable.gt(BN_ZERO),
    [recipient, balances]
  )

  const schema = useMemo(
    () => schemaFactory(maxValue, minValue, balances[sender?.address as string]?.transferable),
    [maxValue, minValue, balances, sender]
  )

  const { changeField, validation } = useForm<TransferTokensFormField>({ amount: undefined }, schema)
  const { isValid, errors } = validation

  useEffect(() => {
    changeField('amount', amount)
  }, [amount])

  const transferableBalance = balances[sender?.address as string]?.transferable ?? BN_ZERO
  const filterRecipient = useCallback(filterAccount(sender), [sender])
  const getIconType = () => (!from ? (!to ? 'transfer' : 'receive') : 'send')

  const isZero = new BN(amount).lte(BN_ZERO)
  const isOverBalance = new BN(amount).gt(maxValue || transferableBalance || 0)
  const isTransferDisabled = isZero || isOverBalance || !recipient || !isValid
  const isValueDisabled = !sender

  const setHalf = () => setAmount(transferableBalance.div(new BN(2)).toString())
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
            validation={amount && hasError('amount', errors) ? 'invalid' : undefined}
            message={(amount && hasError('amount', errors) ? getErrorMessage('amount', errors) : undefined) || ' '}
          >
            <InputNumber
              id="amount-input"
              value={formatTokenValue(amount)}
              onChange={(event) => setAmount(event.target.value)}
              disabled={isValueDisabled}
              placeholder="0"
            />
          </InputComponent>
          <AmountButtons>
            <AmountButton size="small" onClick={setHalf} disabled={isValueDisabled}>
              Use half
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
