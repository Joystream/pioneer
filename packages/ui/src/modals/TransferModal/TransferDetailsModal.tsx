import React, { useState } from 'react'
import BN from 'bn.js'
import styled from 'styled-components'
import { useNumberInput } from '../../hooks/useNumberInput'
import { useAccounts } from '../../hooks/useAccounts'
import { useBalance } from '../../hooks/useBalance'
import { Account } from '../../hooks/types'
import { ButtonPrimaryMedium, ButtonSecondarySmall } from '../../components/buttons/Buttons'
import { BorderRad, Colors } from '../../constants'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../components/modal'
import { AccountInfo } from '../../components/AccountInfo'
import { TokenValue } from '../../components/TokenValue'
import {
  AmountInputBlock,
  BalanceInfo,
  FormLabel,
  InfoTitle,
  InfoValue,
  LockedAccount,
  Row,
  TransactionAmount,
} from './TransferModal'
import { SelectAccount } from '../../components/selects/AccountSelectTemplate/SelectAccount'

interface Props {
  from: Account
  to?: Account
  onClose: () => void
  onAccept: (amount: BN, to: Account) => void
}

export function TransferDetailsModal({ from, to, onClose, onAccept }: Props) {
  const accounts = useAccounts()
  const [recipient, setRecipient] = useState<Account | undefined>(to)
  const [amount, setAmount] = useNumberInput(0)
  const balance = useBalance(from)
  const isZero = new BN(amount).lte(new BN(0))

  const transferableBalance = balance?.transferable ?? new BN(0)

  const isOverBalance = new BN(amount).gt(transferableBalance || 0)
  const isTransferDisabled = isZero || isOverBalance || !recipient

  const setHalf = () => setAmount(transferableBalance.div(new BN(2)).toString())
  const setMax = () => setAmount(transferableBalance.toString())
  const onClick = () => {
    if (amount && recipient) {
      onAccept(new BN(amount), recipient)
    }
  }

  const options = accounts.allAccounts
    .filter((account) => account.address !== from.address)
    .map((account) => ({ account: account }))

  return (
    <Modal>
      <ModalHeader onClick={onClose} title={'Send tokens'} />
      <ModalBody>
        <Row>
          <FormLabel>From</FormLabel>
          <SelectedAccount account={from} />
        </Row>
        <TransactionAmount>
          <AmountInputBlock>
            <AmountInputLabel htmlFor={'amount-input'}>Number of tokens</AmountInputLabel>
            <AmountInput
              id="amount-input"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              placeholder="0"
            />
          </AmountInputBlock>
          <AmountButtons>
            <AmountButton onClick={setHalf}>Use half</AmountButton>
            <AmountButton onClick={setMax}>Use max</AmountButton>
          </AmountButtons>
        </TransactionAmount>
        <Row>
          <FormLabel>Destination account</FormLabel>
          {to ? (
            <SelectedAccount account={to} />
          ) : (
            <SelectAccount options={options} onChange={({ account }) => setRecipient(account)} />
          )}
        </Row>
      </ModalBody>
      <ModalFooter>
        <ButtonPrimaryMedium onClick={onClick} disabled={isTransferDisabled}>
          Transfer tokens
        </ButtonPrimaryMedium>
      </ModalFooter>
    </Modal>
  )
}

interface SelectedAccountProps {
  account: Account
  useTotal?: boolean
}

const SelectedAccount = ({ account, useTotal }: SelectedAccountProps) => {
  const balance = useBalance(account)

  return (
    <LockedAccount>
      <AccountInfo account={account} />
      <BalanceInfo>
        <InfoTitle>{useTotal ? 'Total balance' : 'Transferable balance'}</InfoTitle>
        <InfoValue>
          <TokenValue value={useTotal ? balance?.total : balance?.transferable} />
        </InfoValue>
      </BalanceInfo>
    </LockedAccount>
  )
}

const AmountInputLabel = styled.label`
  margin-bottom: 8px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 700;
  color: ${Colors.Black[900]};
`
const AmountInput = styled.input`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${Colors.Black[900]};
  border-radius: ${BorderRad.s};
  font-size: 14px;
  line-height: 20px;
  font-weight: 700;
  text-align: right;
`
const AmountButtons = styled.div`
  display: inline-grid;
  grid-auto-flow: column;
  grid-column-gap: 8px;
  width: fit-content;
  height: 46px;
  align-items: center;
`
const AmountButton = styled(ButtonSecondarySmall)``
