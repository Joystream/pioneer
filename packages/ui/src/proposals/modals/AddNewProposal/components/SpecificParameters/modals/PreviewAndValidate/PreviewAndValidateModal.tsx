/* eslint-disable no-console */
import { isBn } from '@polkadot/util'
import BN from 'bn.js'
import React, { useCallback, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
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
}
interface AccountAndAmount {
  account: Account
  amount: BN
  isValidAccount: boolean
}

export const PreviewAndValidateModal = ({ setIsPreviewModalShown }: PreviewAndValidateModalProps) => {
  const { api } = useApi()
  const { setValue, getValues } = useFormContext()
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
    const accountsAndAmounts: { amount: BN; account: string }[] = []
    previewAccounts.map((item, index) => {
      textAreaValue += `${item.account.address},${item.amount.div(decimals)}`
      textAreaValue += previewAccounts.length - 1 === index ? '' : ';\n'
      accountsAndAmounts.push({ amount: item.amount, account: item.account.address })
    })
    setValue('fundingRequest.csvInput', textAreaValue, { shouldValidate: true })
    setValue('fundingRequest.hasPreviewedInput', true, { shouldValidate: true })
    console.log('error length ', errorMessages.length)
    if (errorMessages.length === 0) {
      setValue('fundingRequest.accountsAndAmounts', accountsAndAmounts, { shouldValidate: true })
    } else {
      setValue('fundingRequest.accountsAndAmounts', undefined, { shouldValidate: true })
    }
    setIsPreviewModalShown(false)
  }, [previewAccounts, errorMessages])

  useEffect(() => {
    const csvInput = getValues('fundingRequest.csvInput').split(';\n')
    setPreviewAccounts(
      csvInput.map((item: string) => {
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
    const messages: string[] = []
    if (totalInvalidAccounts > 0) {
      messages.push('Incorrect destination accounts detected')
    }
    if (maxAllowedAccounts && previewAccounts?.length > maxAllowedAccounts) {
      messages.push('Maximum allowed accounts exceeded')
    }
    if (messages.length > 0) {
      setErrorMessages((prev) => [...prev, ...messages])
    }
    setTotalAmount(total)
  }, [previewAccounts])
  useEffect(() => {
    if (totalAmount.gt(isBn(maxTotalAmount) ? maxTotalAmount : new BN(0))) {
      setErrorMessages((prev) => [...prev, 'Max payment amount is exceeded'])
    }
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
