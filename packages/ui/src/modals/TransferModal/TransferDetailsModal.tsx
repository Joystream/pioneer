import BN from 'bn.js'
import React, { ReactElement, useState } from 'react'
import styled from 'styled-components'
import { AccountInfo } from '../../components/AccountInfo'
import { ButtonPrimaryMedium, ButtonSecondarySmall } from '../../components/buttons'
import { NumberInput, Label } from '../../components/Form'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../components/Modal'
import { SelectAccount } from '../../components/selects/AccountSelectTemplate/SelectAccount'
import { TokenValue } from '../../components/typography'
import { Colors } from '../../constants'
import { Account } from '../../hooks/types'
import { useAccounts } from '../../hooks/useAccounts'
import { useBalance } from '../../hooks/useBalance'
import { useNumberInput } from '../../hooks/useNumberInput'
import { AmountInputBlock, BalanceInfo, InfoTitle, InfoValue, LockedAccount, Row, TransactionAmount } from '../common'

interface Props {
  from?: Account
  to?: Account
  onClose: () => void
  onAccept: (amount: BN, from: Account, to: Account) => void
  title: string
  icon: ReactElement
}

const getFilteredOptions = (allAccounts: Account[], toFilterOut: Account | undefined) =>
  allAccounts
    .filter((account) => !toFilterOut || account.address !== toFilterOut.address)
    .map((account) => ({ account: account }))

export function TransferDetailsModal({ from, to, onClose, onAccept, title, icon }: Props) {
  const accounts = useAccounts()
  const [recipient, setRecipient] = useState<Account | undefined>(to)
  const [sender, setSender] = useState<Account | undefined>(from)
  const [amount, setAmount] = useNumberInput(0)
  const senderBalance = useBalance(sender)
  const isZero = new BN(amount).lte(new BN(0))

  const transferableBalance = senderBalance?.transferable ?? new BN(0)

  const isOverBalance = new BN(amount).gt(transferableBalance || 0)
  const isTransferDisabled = isZero || isOverBalance || !recipient

  const setHalf = () => setAmount(transferableBalance.div(new BN(2)).toString())
  const setMax = () => setAmount(transferableBalance.toString())
  const onClick = () => {
    if (amount && recipient && sender) {
      onAccept(new BN(amount), sender, recipient)
    }
  }

  const toOptions = getFilteredOptions(accounts.allAccounts, sender)
  const fromOptions = getFilteredOptions(accounts.allAccounts, recipient)

  return (
    <Modal>
      <ModalHeader onClick={onClose} title={title} icon={icon} />
      <ModalBody>
        <Row>
          <Label>From</Label>
          {from ? (
            <SelectedAccount account={from} />
          ) : (
            <SelectAccount options={fromOptions} onChange={({ account }) => setSender(account)} />
          )}
        </Row>
        <TransactionAmount>
          <AmountInputBlock>
            <Label htmlFor={'amount-input'}>Number of tokens</Label>
            <NumberInput
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
          <Label>Destination account</Label>
          {to ? (
            <SelectedAccount account={to} />
          ) : (
            <SelectAccount options={toOptions} onChange={({ account }) => setRecipient(account)} />
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
}

const SelectedAccount = ({ account }: SelectedAccountProps) => {
  const { transferable } = useBalance(account) || {}

  return (
    <LockedAccount>
      <AccountInfo account={account} />
      <BalanceInfo>
        <InfoTitle>Transferable balance</InfoTitle>
        <InfoValue>
          <TokenValue value={transferable} />
        </InfoValue>
      </BalanceInfo>
    </LockedAccount>
  )
}

const AmountButtons = styled.div`
  display: inline-grid;
  grid-auto-flow: column;
  grid-column-gap: 8px;
  width: fit-content;
  height: 46px;
  align-items: center;
`
const AmountButton = styled(ButtonSecondarySmall)`
  height: 26px;
  padding: 4px 6px;
  font-size: 10px;
  line-height: 16px;
  text-transform: uppercase;
  background-color: transparent;
  border: 1px solid ${Colors.Black[300]};
`
