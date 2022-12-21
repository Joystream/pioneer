import { SubmittableExtrinsic } from '@polkadot/api/types'
import { ISubmittableResult } from '@polkadot/types/types'
import BN from 'bn.js'
import React from 'react'
import styled from 'styled-components'

import { AccountInfo } from '@/accounts/components/AccountInfo'
import { useBalance } from '@/accounts/hooks/useBalance'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { Account } from '@/accounts/types'
import { AlertSymbol } from '@/common/components/icons/symbols'
import { BalanceInfoInRow, InfoTitle, InfoValue, ModalBody, ModalTransactionFooter } from '@/common/components/Modal'
import { ColumnGapBlock, RowGapBlock } from '@/common/components/page/PageContent'
import { TransactionInfo, TransactionInfoProps } from '@/common/components/TransactionInfo'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { BorderRad, Colors, Sizes } from '@/common/constants'
import { useModal } from '@/common/hooks/useModal'
import { useSignAndSendTransaction } from '@/common/hooks/useSignAndSendTransaction'
import { TransactionModal, TransactionModalProps } from '@/common/modals/TransactionModal'
import { Address } from '@/common/types'

export interface SignTransactionModalProps extends Omit<TransactionModalProps, 'onClose'> {
  additionalTransactionInfo?: TransactionInfoProps[]
  buttonText?: string
  transaction: SubmittableExtrinsic<'rxjs', ISubmittableResult> | undefined
  signer: Address
  additionalAmountInfo?: SignModalAccountProps['amountInfo']
  skipQueryNode?: boolean
  disabled?: boolean
  extraButtons?: React.ReactNode
  extraCosts?: BN
}

export const SignTransactionModal = ({
  additionalTransactionInfo,
  additionalAmountInfo,
  buttonText = 'Sign and Send',
  transaction,
  skipQueryNode,
  signer,
  disabled,
  extraButtons,
  extraCosts,
  children,
  ...transactionModalProps
}: SignTransactionModalProps) => {
  const { allAccounts } = useMyAccounts()
  const { hideModal } = useModal()
  const signerAccount = accountOrNamed(allAccounts, signer, 'ControllerAccount')
  const { paymentInfo, sign, isReady, canAfford } = useSignAndSendTransaction({
    transaction,
    signer,
    skipQueryNode,
    extraCosts,
    service: transactionModalProps.service,
  })
  const signDisabled = !isReady || !canAfford || disabled

  return (
    <TransactionModal {...transactionModalProps} onClose={hideModal}>
      <ModalBody>
        {children}
        <TextMedium>
          Fee of <TokenValue value={paymentInfo?.partialFee} /> will be applied to the transaction.
        </TextMedium>
        <SignModalAccount account={signerAccount} amountInfo={additionalAmountInfo} />
        {!canAfford && paymentInfo?.partialFee && (
          <StyledErrorContainer gap={1}>
            <AlertSymbol />
            <TextMedium>Insufficient funds to cover transaction costs</TextMedium>
          </StyledErrorContainer>
        )}
      </ModalBody>
      <ModalTransactionFooter
        transactionFee={paymentInfo?.partialFee?.toBn()}
        extraButtons={extraButtons}
        next={{ disabled: signDisabled, label: buttonText, onClick: sign }}
      >
        {additionalTransactionInfo?.map((props) => (
          <TransactionInfo {...props} />
        ))}
      </ModalTransactionFooter>
    </TransactionModal>
  )
}

const StyledErrorContainer = styled(ColumnGapBlock)`
  align-items: center;
  color: ${Colors.Red[400]};
  path {
    fill: ${Colors.Red[400]}!important;
  }
`

interface SignModalAccountProps {
  account: Account
  amountInfo?: {
    name: string
    value: BN
  }[]
}

const SignModalAccount = ({ account, amountInfo = [] }: SignModalAccountProps) => {
  const { total } = useBalance(account.address) || {}

  return (
    <Wrapper>
      <AccountInfo account={account} />
      <RowGapBlock>
        {[...amountInfo, { name: 'Total balance', value: total }].map(({ name, value }, index) => (
          <BalanceInfoInRow key={name + index}>
            <InfoTitle>{name}</InfoTitle>
            <InfoValue>
              <TokenValue value={value} />
            </InfoValue>
          </BalanceInfoInRow>
        ))}
      </RowGapBlock>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  align-items: center;
  width: 100%;
  min-height: ${Sizes.accountHeight};
  padding: 8px 72px 8px 14px;
  border: 1px solid ${Colors.Black[300]};
  border-radius: ${BorderRad.s};
  background-color: ${Colors.White};
`
