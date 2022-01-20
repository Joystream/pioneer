import { SubmittableExtrinsic } from '@polkadot/api/types'
import { ISubmittableResult } from '@polkadot/types/types'
import BN from 'bn.js'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ActorRef } from 'xstate'

import { SelectAccount } from '@/accounts/components/SelectAccount'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useMyBalances } from '@/accounts/hooks/useMyBalances'
import { Account } from '@/accounts/types'
import { ButtonPrimary } from '@/common/components/buttons'
import { InputComponent } from '@/common/components/forms'
import { ModalBody, ModalFooter, TransactionInfoContainer } from '@/common/components/Modal'
import { TransactionInfo } from '@/common/components/TransactionInfo'
import { TextMedium } from '@/common/components/typography'
import { BN_ZERO } from '@/common/constants'
import { useSignAndSendTransaction } from '@/common/hooks/useSignAndSendTransaction'
import { TransactionModal } from '@/common/modals/TransactionModal'
import { formatTokenValue } from '@/common/model/formatters'

export interface Props {
  onClose: () => void
  transaction: SubmittableExtrinsic<'rxjs', ISubmittableResult>
  service: ActorRef<any>
  controllerAccount: Account
  description: React.ReactNode
  buttonLabel: string
  contributeAmount?: BN
}

export const AuthorizeTransactionModal = ({
  onClose,
  transaction,
  service,
  controllerAccount,
  description,
  buttonLabel,
  contributeAmount,
}: Props) => {
  const { t } = useTranslation('bounty')
  const { allAccounts } = useMyAccounts()
  const [hasFunds, setHasFunds] = useState<boolean>(false)
  const [selectedAccount, setSelectedAccount] = useState<Account | undefined>(
    allAccounts.find((acc) => acc.address === controllerAccount.address)
  )
  const balances = useMyBalances()

  const { sign, isReady, paymentInfo } = useSignAndSendTransaction({
    service,
    transaction,
    signer: selectedAccount?.address || controllerAccount.address,
  })
  const accountsWithValidAmount = useMemo(
    () =>
      Object.entries(balances).map(([address, balance]) => {
        if (balance.transferable.gte(paymentInfo?.partialFee || BN_ZERO)) {
          return address
        }
      }),
    [balances, paymentInfo?.partialFee]
  )

  const accountsFilter = useCallback(
    (acc: Account) => accountsWithValidAmount.includes(acc.address),
    [accountsWithValidAmount.length]
  )

  useEffect(() => {
    if (selectedAccount && paymentInfo?.partialFee) {
      setHasFunds(balances[selectedAccount.address].transferable.gte(paymentInfo.partialFee))
    }
  }, [selectedAccount, paymentInfo?.partialFee])

  return (
    <TransactionModal onClose={onClose} service={service}>
      <ModalBody>
        <div>
          <TextMedium light margin="xs">
            {description}
          </TextMedium>
          <TextMedium light>
            {t('modals.authorizeTransaction.feeInfo', { value: paymentInfo?.partialFee.toString() ?? '-' })}
          </TextMedium>
        </div>
        <InputComponent
          label={t('modals.authorizeTransaction.feeAccount.label')}
          inputSize="l"
          required
          tooltipText={t('modals.authorizeTransaction.feeAccount.tooltip')}
        >
          <SelectAccount
            filter={accountsFilter}
            onChange={(account) => setSelectedAccount(account)}
            selected={selectedAccount}
          />
        </InputComponent>
      </ModalBody>
      <ModalFooter>
        <TransactionInfoContainer>
          {contributeAmount && (
            <TransactionInfo
              title={t('modals.common.contributeAmount', { value: formatTokenValue(contributeAmount) })}
              value={contributeAmount}
            />
          )}
          <TransactionInfo
            title={t('modals.common.transactionFee.label')}
            value={paymentInfo?.partialFee}
            tooltipText={t('modals.common.transactionFee.tooltip')}
          />
        </TransactionInfoContainer>
        <ButtonPrimary size="medium" disabled={!hasFunds || !isReady} onClick={sign}>
          {buttonLabel}
        </ButtonPrimary>
      </ModalFooter>
    </TransactionModal>
  )
}
