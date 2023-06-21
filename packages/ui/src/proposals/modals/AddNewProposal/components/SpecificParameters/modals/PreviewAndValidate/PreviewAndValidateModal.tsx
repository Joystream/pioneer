import { isBn } from '@polkadot/util'
import BN from 'bn.js'
import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

import { AccountInfo } from '@/accounts/components/AccountInfo'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { isValidAddress } from '@/accounts/model/isValidAddress'
import { Account, AccountOption } from '@/accounts/types'
import { useApi } from '@/api/hooks/useApi'
import { Close, CloseButton } from '@/common/components/buttons'
import {
  AccountRow,
  BalanceInfoInRow,
  InfoTitle,
  InfoValue,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  TransactionInfoContainer,
} from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TransactionFee } from '@/common/components/TransactionFee'
import { TokenValue } from '@/common/components/typography'
import { Colors, JOY_DECIMAL_PLACES } from '@/common/constants'
import { useKeyring } from '@/common/hooks/useKeyring'

import { ErrorPrompt } from '../../Prompt'

interface PreviewAndValidateModalProps {
  setIsPreviewModalShown: (bool: boolean) => void
  previewModalData: string[]
  setValue: (name: string, value: any, options: { shouldValidate: boolean }) => void
}
interface AccountAndAmount {
  account: Account
  amount: BN
  isValidAccount: boolean
}

export const PreviewAndValidateModal = ({
  setIsPreviewModalShown,
  previewModalData,
  setValue,
}: PreviewAndValidateModalProps) => {
  const { api } = useApi()
  const maxTotalAmount = api?.consts.proposalsCodex.fundingRequestProposalMaxTotalAmount
  const maxAllowedAccounts = api?.consts.proposalsCodex.fundingRequestProposalMaxAccounts.toNumber()
  const keyring = useKeyring()
  const { allAccounts } = useMyAccounts()
  const accounts = allAccounts as AccountOption[]
  const [previewAccounts, setPreviewAccounts] = useState<AccountAndAmount[]>([])
  const [totalAmount, setTotalAmount] = useState<BN>(new BN(0))
  const [errorMessages, setErrorMessages] = useState<string[]>([])
  const decimals = new BN(10).pow(new BN(JOY_DECIMAL_PLACES))

  const removeAccount = useCallback((index: number) => {
    setErrorMessages([])
    setPreviewAccounts((prev) => prev.filter((item, i) => index !== i))
  }, [])

  const closeModalWithData = useCallback(() => {
    let textAreaValue = ''
    previewAccounts.map((item, index) => {
      textAreaValue += `${item.account.address},${item.amount.div(decimals)}`
      textAreaValue += previewAccounts.length - 1 === index ? '' : ';\n'
    })
    setValue('fundingRequest.accountsAndAmounts', textAreaValue, { shouldValidate: true })
    setIsPreviewModalShown(false)
  }, [previewAccounts])

  useEffect(() => {
    setPreviewAccounts(
      previewModalData.map((item) => {
        const splitAccountsAndAmounts = item.split(',')
        const amount = new BN(splitAccountsAndAmounts[1].replace(';', '')).mul(decimals)
        const isValidAccount = isValidAddress(splitAccountsAndAmounts[0], keyring)
        return {
          account: accountOrNamed(accounts, splitAccountsAndAmounts[0], 'Unknown Member'),
          amount: amount,
          isValidAccount,
        }
      })
    )
  }, [])
  useEffect(() => {
    let total = new BN(0)
    let totalInvalidAccounts = 0
    previewAccounts?.map((item) => {
      total = total.add(item.amount)
      totalInvalidAccounts += !item.isValidAccount ? 1 : 0
    })
    setErrorMessages((prev) =>
      totalInvalidAccounts > 0 ? [...prev, 'Incorrect destination accounts detected'] : [...prev]
    )
    setErrorMessages((prev) =>
      maxAllowedAccounts && previewAccounts?.length > maxAllowedAccounts
        ? [...prev, 'Maximum allowed accounts exceeded']
        : [...prev]
    )
    setTotalAmount(total)
  }, [previewAccounts])
  useEffect(() => {
    setErrorMessages((prev) =>
      totalAmount.gt(isBn(maxTotalAmount) ? maxTotalAmount : new BN(0))
        ? [...prev, 'Max payment amount is exceeded']
        : [...prev]
    )
  }, [totalAmount])
  return (
    <Modal onClose={() => undefined} modalSize="s" customModalSize={'552'} marginRight={'68'} modalHeight="xl">
      <ModalHeader onClick={() => closeModalWithData()} title="Preview And Validate" />
      <CustomModalBody>
        <RowGapBlock gap={8}>
          <Row>
            <RowGapBlock gap={8}>
              {errorMessages?.map((message) => (
                <ErrorPrompt>{message}</ErrorPrompt>
              ))}
            </RowGapBlock>
          </Row>
          <Row>
            {previewAccounts?.map((previewAccount, i) => (
              <CustomAccountRow key={i} className={previewAccount.isValidAccount ? '' : 'error'}>
                <AccountInfo account={previewAccount.account} />
                <CustomBalanceInfoInRow>
                  <InfoTitle>Amount</InfoTitle>
                  <InfoValue>
                    <TokenValue value={previewAccount.amount} />
                  </InfoValue>
                  <CloseButton onClick={() => removeAccount(i)} />
                </CustomBalanceInfoInRow>
              </CustomAccountRow>
            ))}
          </Row>
        </RowGapBlock>
      </CustomModalBody>
      <ModalFooter>
        <TransactionInfoContainer>
          <TransactionFee title={'Total amount'} value={totalAmount} />
        </TransactionInfoContainer>
      </ModalFooter>
    </Modal>
  )
}
const CustomModalBody = styled(ModalBody)`
  display: block;
`
const CustomAccountRow = styled(AccountRow)`
  margin-bottom: 4px;
  padding-right: 16px;
  &.error {
    border-color: ${Colors.Red[400]};
  }
`
const CustomBalanceInfoInRow = styled(BalanceInfoInRow)`
  grid-template-columns: 1fr 168px 72px;
  ${Close} {
    margin-left: auto;
  }
`
