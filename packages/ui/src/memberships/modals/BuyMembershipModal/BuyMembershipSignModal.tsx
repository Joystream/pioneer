import { SubmittableExtrinsic } from '@polkadot/api/types'
import { BalanceOf } from '@polkadot/types/interfaces/runtime'
import { ISubmittableResult } from '@polkadot/types/types'
import React, { useMemo, useState } from 'react'
import { ActorRef } from 'xstate'

import { SelectAccount, SelectedAccount } from '@/accounts/components/SelectAccount'
import { useBalance } from '@/accounts/hooks/useBalance'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { Account } from '@/accounts/types'
import { InputComponent } from '@/common/components/forms'
import { Info } from '@/common/components/Info'
import { ModalBody, ModalTransactionFooter, Row } from '@/common/components/Modal'
import { TransactionInfo } from '@/common/components/TransactionInfo'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { BN_ZERO } from '@/common/constants'
import { useSignAndSendTransaction } from '@/common/hooks/useSignAndSendTransaction'
import { TransactionModal } from '@/common/modals/TransactionModal'
import { getFeeSpendableBalance } from '@/common/providers/transactionFees/provider'

import { MemberFormFields } from './BuyMembershipFormModal'

interface SignProps {
  onClose: () => void
  membershipPrice?: BalanceOf
  formData: MemberFormFields
  transaction: SubmittableExtrinsic<'rxjs', ISubmittableResult> | undefined
  initialSigner?: Account
  service: ActorRef<any>
}

export const BuyMembershipSignModal = ({
  onClose,
  membershipPrice,
  formData,
  transaction,
  initialSigner,
  service,
}: SignProps) => {
  const { allAccounts } = useMyAccounts()
  const [from, setFrom] = useState(
    initialSigner ?? accountOrNamed(allAccounts, formData.invitor?.controllerAccount || '', 'Controller account')
  )
  const fromAddress = from.address
  const { isReady, paymentInfo, sign } = useSignAndSendTransaction({
    transaction,
    signer: fromAddress,
    service,
  })
  const balance = useBalance(fromAddress)
  const validationInfo = balance?.transferable && paymentInfo?.partialFee && membershipPrice

  const hasFunds = useMemo(() => {
    if (validationInfo) {
      const canAffordCreation = balance.transferable.gte(membershipPrice)
      const canAffordFee = getFeeSpendableBalance(balance).sub(membershipPrice).gte(paymentInfo?.partialFee)
      return canAffordFee && canAffordCreation
    }
  }, [fromAddress, !balance, !validationInfo])

  const shouldInformAboutLock = useMemo(() => {
    if (balance && membershipPrice && paymentInfo) {
      return (
        balance.transferable.lt(membershipPrice ?? BN_ZERO) &&
        getFeeSpendableBalance(balance).gte(membershipPrice.add(paymentInfo.partialFee))
      )
    }
  }, [!balance, !membershipPrice, !paymentInfo])

  const signDisabled = !isReady || !hasFunds || !validationInfo
  return (
    <TransactionModal onClose={onClose} service={service}>
      <ModalBody>
        <TextMedium>You intend to create a new membership.</TextMedium>
        <TextMedium>
          The creation of the new membership costs <TokenValue value={membershipPrice?.toBn()} />.
        </TextMedium>
        <TextMedium>
          Fees of <TokenValue value={paymentInfo?.partialFee.toBn()} /> will be applied to the transaction.
        </TextMedium>
        <Row>
          <InputComponent
            label="Sending from account"
            inputSize="l"
            validation={hasFunds !== false && balance ? undefined : 'invalid'}
            message={hasFunds !== false && balance ? undefined : 'Insufficient funds to cover the membership creation.'}
          >
            {initialSigner ? (
              <SelectAccount selected={from} onChange={(account) => setFrom(account)} />
            ) : (
              <SelectedAccount account={from} />
            )}
          </InputComponent>
        </Row>
        {shouldInformAboutLock && (
          <Row>
            <Info>
              <TextMedium>
                Invitation lock can be spent on transaction fees and staking for proposals, voting and working groups
                applications. JOY tokens subject to this lock cannot be transferred to any other accounts. This lock is
                unrecoverable. NB: Transaction fees will first be taken from your transferable balance if it is
                positive.
              </TextMedium>
            </Info>
          </Row>
        )}
      </ModalBody>
      <ModalTransactionFooter
        transactionFee={paymentInfo?.partialFee.toBn()}
        next={{ disabled: signDisabled, label: 'Sign and create a member', onClick: sign }}
      >
        <TransactionInfo
          title="Creation fee:"
          value={membershipPrice?.toBn()}
          tooltipText="The price to create a membership."
        />
      </ModalTransactionFooter>
    </TransactionModal>
  )
}
