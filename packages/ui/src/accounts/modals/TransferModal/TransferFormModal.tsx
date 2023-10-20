import BN from 'bn.js'
import React, { useCallback, useMemo, useState } from 'react'
import * as Yup from 'yup'

import { useMyBalances } from '@/accounts/hooks/useMyBalances'
import { useTransactionFee } from '@/accounts/hooks/useTransactionFee'
import { useApi } from '@/api/hooks/useApi'
import { BN_ZERO, CurrencyName, ED } from '@/app/constants/currency'
import { ButtonPrimary } from '@/common/components/buttons'
import { InputComponent, TokenInput } from '@/common/components/forms'
import { getErrorMessage, hasError } from '@/common/components/forms/FieldError'
import { PickedTransferIcon } from '@/common/components/icons/TransferIcons'
import {
  AmountButton,
  AmountButtons,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  TransactionAmount,
} from '@/common/components/Modal'
import { useForm } from '@/common/hooks/useForm'
import { BNSchema, maxMixed, minMixed } from '@/common/utils/validation'

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
  amount?: BN
}

const schemaFactory = (maxValue?: BN, minValue?: BN, senderBalance?: BN) => {
  const schema = Yup.object().shape({
    amount: BNSchema,
  })

  if (senderBalance) {
    schema.fields.amount = schema.fields.amount.test(maxMixed(senderBalance, 'Maximum amount allowed is ${max}'))
  }

  if (maxValue && senderBalance && senderBalance.gt(maxValue)) {
    schema.fields.amount = schema.fields.amount.test(maxMixed(maxValue, 'Maximum amount allowed is ${max}'))
  }

  if (minValue) {
    schema.fields.amount = schema.fields.amount.test(minMixed(minValue, 'Minimum amount allowed is ${min}'))
  }
  return schema
}

export function TransferFormModal({ from, to, onClose, onAccept, title, maxValue, minValue, initialValue }: Props) {
  const { api } = useApi()
  const [recipient, setRecipient] = useState<Account | undefined>(to)
  const [sender, setSender] = useState<Account | undefined>(from)
  const balances = useMyBalances()
  const transferable = balances?.[sender?.address as string]?.transferable ?? BN_ZERO
  const tx = () => api?.tx.balances.transfer(recipient?.address || '', transferable)
  const schema = useMemo(() => schemaFactory(maxValue, minValue, transferable), [maxValue, minValue, balances, sender])

  const fee = useTransactionFee(sender?.address, tx)
  const maxFee = fee?.feeInfo?.transactionFee ?? ED
  const limit: BN = transferable.sub(maxFee) ?? BN_ZERO

  const { changeField, validation, fields } = useForm<TransferTokensFormField>({ amount: initialValue }, schema)
  const setHalf = () => changeField('amount', transferable.divn(2))
  const setMax = () => changeField('amount', transferable)
  const { amount } = fields
  const { isValid, errors } = validation
  const isTransferDisabled = !amount || amount.isZero() || !recipient || !isValid
  const isValueDisabled = !sender

  const finalAmount: BN = (amount?.gt(limit) ? limit.sub(ED) : amount) ?? BN_ZERO
  const onTransfer = () => amount && recipient && sender && onAccept(finalAmount, sender, recipient)

  const getIconType = () => (!from ? (!to ? 'transfer' : 'receive') : 'send')
  const filterRecipient = useCallback(filterAccount(sender), [sender])
  const filterSender = useCallback(
    ({ address }: Account) => address !== recipient?.address && !!balances?.[address]?.transferable.gt(BN_ZERO),
    [recipient, balances]
  )

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
            {(from && <SelectedAccount account={from} />) || (
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
            units={CurrencyName.integerValue}
            validation={amount && hasError('amount', errors) ? 'invalid' : undefined}
            message={(amount && hasError('amount', errors) ? getErrorMessage('amount', errors) : undefined) || ' '}
          >
            <TokenInput
              id="amount-input"
              value={amount}
              onChange={(_, value) => changeField('amount', value)}
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
            {(to && <SelectedAccount account={to} />) || (
              <SelectAccount filter={filterRecipient} onChange={setRecipient} selected={recipient} />
            )}
          </InputComponent>
        </Row>
      </ModalBody>
      <ModalFooter>
        <ButtonPrimary size="medium" onClick={onTransfer} disabled={isTransferDisabled}>
          Transfer tokens
        </ButtonPrimary>
      </ModalFooter>
    </Modal>
  )
}
