import BN from 'bn.js'
import React, { ReactElement, useCallback, useState } from 'react'
import styled from 'styled-components'
import { Account } from '../../common/types'
import { Button } from '../../components/buttons'
import { Label, NumberInput } from '../../components/forms'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../components/Modal'
import { filterAccount, SelectAccount, SelectedAccount } from '../../components/account/SelectAccount'
import { Colors } from '../../constants'
import { useBalance } from '../../hooks/useBalance'
import { useNumberInput } from '../../hooks/useNumberInput'
import { formatTokenValue } from '../../utils/formatters'
import { AmountInputBlock, Row, TransactionAmount } from '../common'

interface Props {
  from?: Account
  to?: Account
  onClose: () => void
  onAccept: (amount: BN, from: Account, to: Account) => void
  title: string
  icon: ReactElement
}

export function TransferDetailsModal({ from, to, onClose, onAccept, title, icon }: Props) {
  const [recipient, setRecipient] = useState<Account | undefined>(to)
  const [sender, setSender] = useState<Account | undefined>(from)
  const [amount, setAmount] = useNumberInput(0)
  const senderBalance = useBalance(sender)
  const filterSender = useCallback(filterAccount(recipient), [recipient])
  const transferableBalance = senderBalance?.transferable ?? new BN(0)
  const filterRecipient = useCallback(filterAccount(sender), [sender])

  const isZero = new BN(amount).lte(new BN(0))
  const isOverBalance = new BN(amount).gt(transferableBalance || 0)
  const isTransferDisabled = isZero || isOverBalance || !recipient
  const isValueDisabled = !sender

  const setHalf = () => setAmount(transferableBalance.div(new BN(2)).toString())
  const setMax = () => setAmount(transferableBalance.toString())
  const onClick = () => {
    if (amount && recipient && sender) {
      onAccept(new BN(amount), sender, recipient)
    }
  }
  return (
    <Modal modalSize={'m'} onClose={onClose}>
      <ModalHeader onClick={onClose} title={title} icon={icon} />
      <ModalBody>
        <Row>
          <Label>From</Label>
          {from ? <SelectedAccount account={from} /> : <SelectAccount filter={filterSender} onChange={setSender} />}
        </Row>
        <TransactionAmount>
          <AmountInputBlock>
            <Label htmlFor={'amount-input'}>Number of tokens</Label>
            <NumberInput
              id="amount-input"
              value={formatTokenValue(new BN(amount))}
              onChange={(event) => setAmount(event.target.value)}
              placeholder="0"
              disabled={isValueDisabled}
            />
          </AmountInputBlock>
          <AmountButtons>
            <AmountButton variant="secondary" size="small" onClick={setHalf} disabled={isValueDisabled}>
              Use half
            </AmountButton>
            <AmountButton variant="secondary" size="small" onClick={setMax} disabled={isValueDisabled}>
              Use max
            </AmountButton>
          </AmountButtons>
        </TransactionAmount>
        <Row>
          <Label>Destination account</Label>
          {to ? <SelectedAccount account={to} /> : <SelectAccount filter={filterRecipient} onChange={setRecipient} />}
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button size="medium" onClick={onClick} disabled={isTransferDisabled}>
          Transfer tokens
        </Button>
      </ModalFooter>
    </Modal>
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
const AmountButton = styled(Button)`
  height: 26px;
  padding: 4px 6px;
  font-size: 10px;
  line-height: 16px;
  text-transform: uppercase;
  background-color: transparent;
  border: 1px solid ${Colors.Black[300]};
`
