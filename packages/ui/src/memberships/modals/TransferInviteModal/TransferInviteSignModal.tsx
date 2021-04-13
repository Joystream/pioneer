import BN from 'bn.js'
import React, { useMemo } from 'react'

import { SelectedAccount } from '../../../accounts/components/SelectAccount'
import { Account } from '../../../accounts/types'
import { ButtonPrimary } from '../../../common/components/buttons'
import { InputComponent } from '../../../common/components/forms'
import { Help } from '../../../common/components/Help'
import { ModalBody, ModalFooter, SignTransferContainer } from '../../../common/components/Modal'
import { BalanceInfoNarrow, InfoTitle, InfoValue, TransactionInfo } from '../../../common/components/Modals'
import { TransactionModal } from '../../../common/components/TransactionModal'
import { TextMedium, TokenValue } from '../../../common/components/typography'
import { useApi } from '../../../common/hooks/useApi'
import { useSignAndSendTransaction } from '../../../common/hooks/useSignAndSendTransaction'
import { formatTokenValue } from '../../../common/model/formatters'
import { onTransactionDone } from '../../../common/types'
import { MemberInternal } from '../../types'

interface Props {
  onClose: () => void
  sourceMember: MemberInternal
  targetMember: MemberInternal
  signer: Account
  amount: BN
  onDone: onTransactionDone
}

export function TransferInviteSignModal({ onClose, sourceMember, targetMember, amount, onDone, signer }: Props) {
  const { api } = useApi()
  const transaction = useMemo(() => api?.tx?.members?.transferInvites(sourceMember.id, targetMember.id, amount), [
    sourceMember.id,
    targetMember.id,
    amount,
  ])
  const signerAddress = signer.address
  const { paymentInfo, send, status } = useSignAndSendTransaction({
    transaction,
    signer: signerAddress,
    onDone,
  })
  const plural = amount.gt(new BN(1))
  const name = targetMember.name
  const fee = paymentInfo?.partialFee.toBn()

  return (
    <TransactionModal status={status} onClose={onClose}>
      <ModalBody>
        <SignTransferContainer>
          <TextMedium margin="m">
            You intend to transfer {amount.toString()} invite{plural && 's'} to {name}. A fee of {formatTokenValue(fee)}{' '}
            JOY will be applied to the transaction.
          </TextMedium>
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
        <ButtonPrimary size="medium" onClick={send} disabled={status !== 'READY'}>
          Sign and Send
        </ButtonPrimary>
      </ModalFooter>
    </TransactionModal>
  )
}
