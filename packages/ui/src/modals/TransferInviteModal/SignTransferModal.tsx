import BN from 'bn.js'
import React, { useMemo } from 'react'
import { Account, BaseMember } from '../../common/types'
import { SelectedAccount } from '../../components/account/SelectAccount'
import { Button } from '../../components/buttons'
import { InputComponent } from '../../components/forms'
import { Help } from '../../components/Help'
import { Modal, ModalBody, ModalFooter, ModalHeader, SignTransferContainer } from '../../components/Modal'
import { Text, TokenValue } from '../../components/typography'
import { useApi } from '../../hooks/useApi'
import { useSignAndSendTransaction } from '../../hooks/useSignAndSendTransaction'
import { formatTokenValue } from '../../utils/formatters'
import { BalanceInfoNarrow, InfoTitle, InfoValue, TransactionInfo } from '../common'
import { WaitModal } from '../WaitModal'

interface Props {
  onClose: () => void
  sourceMember: BaseMember
  targetMember: BaseMember
  signer: Account
  amount: BN
  onDone: (result: boolean, fee: BN) => void
}

export function SignTransferModal({ onClose, sourceMember, targetMember, amount, onDone, signer }: Props) {
  const { api } = useApi()
  const transaction = useMemo(() => api?.tx?.members?.transferInvites(sourceMember.id, targetMember.id, amount), [
    sourceMember.id,
    targetMember.id,
    amount,
  ])
  const { paymentInfo, send, status } = useSignAndSendTransaction({ transaction, from: signer, onDone })
  const plural = amount.gt(new BN(1))
  const name = targetMember.name
  const fee = paymentInfo?.partialFee.toBn()

  if (status === 'READY') {
    return (
      <Modal modalSize="m" modalHeight="s" onClose={onClose}>
        <ModalHeader onClick={onClose} title="Authorize Transaction" />
        <ModalBody>
          <SignTransferContainer>
            <Text size={2} margin="m">
              You intend to transfer {amount.toString()} invite{plural && 's'} to {name}. A fee of{' '}
              {formatTokenValue(fee)} JOY will be applied to the transaction.
            </Text>
            <InputComponent required inputSize="l" label="Fee paid by account" disabled borderless>
              <SelectedAccount account={signer} />
            </InputComponent>
          </SignTransferContainer>
        </ModalBody>
        <ModalFooter>
          <TransactionInfo>
            <BalanceInfoNarrow>
              <InfoTitle>Transaction fee:</InfoTitle>
              <InfoValue>
                <TokenValue value={fee} />
              </InfoValue>
              <Help
                helperText={
                  'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora mollitia necessitatibus, eos recusandae obcaecati facilis sed maiores. Impedit iusto expedita natus perspiciatis, perferendis totam commodi ad, illo, veritatis omnis beatae.Facilis natus recusandae, magni saepe hic veniam aliquid tempore quia assumenda voluptatum reprehenderit. Officiis provident nam corrupti, incidunt, repudiandae accusantium porro libero ipsam illo quae ratione. Beatae itaque quo quidem.'
                }
                absolute
              />
            </BalanceInfoNarrow>
          </TransactionInfo>
          <Button size="medium" onClick={send} disabled={status !== 'READY'}>
            Sign and Send
          </Button>
        </ModalFooter>
      </Modal>
    )
  }

  if (status === 'EXTENSION') {
    return (
      <WaitModal
        onClose={onClose}
        title="Waiting for the extension"
        description="Please sign the transaction using external signer app."
      />
    )
  }

  if (status === 'PENDING') {
    return (
      <WaitModal
        onClose={onClose}
        title="Pending transaction"
        description="We are waiting for your transaction to be mined. It can takes Lorem ipsum deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim."
      />
    )
  }

  return null
}
