import { SubmittableExtrinsic } from '@polkadot/api/types'
import { ISubmittableResult } from '@polkadot/types/types'
import BN from 'bn.js'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ActorRef } from 'xstate'

import { SelectedAccount } from '@/accounts/components/SelectAccount'
import { useMyBalances } from '@/accounts/hooks/useMyBalances'
import { Account } from '@/accounts/types'
import { InputComponent } from '@/common/components/forms'
import { ModalBody, ModalTransactionFooter } from '@/common/components/Modal'
import { TransactionInfo } from '@/common/components/TransactionInfo'
import { TextMedium } from '@/common/components/typography'
import { useSignAndSendTransaction } from '@/common/hooks/useSignAndSendTransaction'
import { MultiTransactionConfig, TransactionModal } from '@/common/modals/TransactionModal'
import { formatTokenValue } from '@/common/model/formatters'

export interface Props {
  onClose: () => void
  transaction: SubmittableExtrinsic<'rxjs', ISubmittableResult>
  service: ActorRef<any>
  controllerAccount: Account
  description: React.ReactNode
  buttonLabel: string
  contributeAmount?: BN
  useMultiTransaction?: MultiTransactionConfig
  skipQueryNodeCheck?: boolean
}

export const AuthorizeTransactionModal = ({
  onClose,
  transaction,
  service,
  controllerAccount,
  description,
  buttonLabel,
  contributeAmount,
  useMultiTransaction,
  skipQueryNodeCheck,
}: Props) => {
  const { t } = useTranslation('bounty')
  const [hasFunds, setHasFunds] = useState<boolean>(false)
  const balances = useMyBalances()

  const { sign, isReady, paymentInfo } = useSignAndSendTransaction({
    service,
    transaction,
    signer: controllerAccount.address,
    skipQueryNode: skipQueryNodeCheck,
  })

  useEffect(() => {
    if (controllerAccount && paymentInfo?.partialFee) {
      setHasFunds(!!balances?.[controllerAccount.address]?.transferable.gte(paymentInfo.partialFee))
    }
  }, [balances, controllerAccount, paymentInfo?.partialFee])

  return (
    <TransactionModal onClose={onClose} service={service} useMultiTransaction={useMultiTransaction}>
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
          <SelectedAccount account={controllerAccount} />
        </InputComponent>
      </ModalBody>
      <ModalTransactionFooter
        transactionFee={paymentInfo?.partialFee}
        next={{ disabled: !hasFunds || !isReady, label: buttonLabel, onClick: sign }}
      >
        {contributeAmount && (
          <TransactionInfo
            title={t('modals.common.contributeAmount', { value: formatTokenValue(contributeAmount) })}
            value={contributeAmount}
          />
        )}
      </ModalTransactionFooter>
    </TransactionModal>
  )
}
