import BN from 'bn.js'
import { BaseMember } from '../../common/types'
import { ButtonPrimaryMedium } from '../../components/buttons'
import React, { ReactElement, useCallback, useState } from 'react'
import styled from 'styled-components'
import { Label, NumberInput } from '../../components/forms'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../components/Modal'
import { AmountInputBlock, LockedAccount, Row, TransactionAmount } from '../common'
import { filterMember, SelectMember } from '../../components/membership/SelectMember'
import { Text } from '../../components/typography'
import { useNumberInput } from '../../hooks/useNumberInput'
import { formatTokenValue } from '../../utils/formatters'
import { MemberInfo } from '../../components/membership/MemberInfo'

interface Props {
  onClose: () => void
  icon: ReactElement
  member?: BaseMember
}

export function TransferDetailsModal({ onClose, icon, member }: Props) {
  const [from, setFrom] = useState<BaseMember | undefined>(member)
  const [to, setTo] = useState<BaseMember>()
  const [amount, setAmount] = useNumberInput(0)
  const filterRecipient = useCallback(filterMember(from), [from])

  const isAmountValid = !from || parseInt(amount) < from.inviteCount
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
          {member ? (
            <SelectedMember member={member} />
          ) : (
            <SelectMember onChange={setFrom} disabled={!!member} selected={from} />
          )}
        </Row>
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
        <Row>
          <Label>To</Label>
          <SelectMember onChange={setTo} filter={filterRecipient} />
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

const SelectedMember = ({ member }: { member: BaseMember }) => (
  <LockedAccount>
    <MemberInfo member={member} />
  </LockedAccount>
)
