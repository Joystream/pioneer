// import { useModal } from '@/common/hooks/useModal'
import BN from 'bn.js'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { AccountInfo } from '@/accounts/components/AccountInfo'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { Account, AccountOption } from '@/accounts/types'
import { Close, CloseButton } from '@/common/components/buttons'
import {
  AccountRow,
  BalanceInfoInRow,
  InfoTitle,
  InfoValue,
  Modal,
  ModalBody,
  ModalGlass,
  ModalHeader,
  ModalWrap,
} from '@/common/components/Modal'
import { TokenValue } from '@/common/components/typography'

interface PreviewAndValidateModalProps {
  setIsPreviewModalShown: (bool: boolean) => void
  previewModalData: string[]
}
interface AccountAndAmount {
  account: Account
  amount: BN
}

export const PreviewAndValidateModal = ({ setIsPreviewModalShown, previewModalData }: PreviewAndValidateModalProps) => {
  const { allAccounts } = useMyAccounts()
  const accounts = allAccounts as AccountOption[]
  const [previewAccounts, setPreviewAccounts] = useState<AccountAndAmount[] | undefined>()

  useEffect(() => {
    setPreviewAccounts(
      previewModalData.map((item) => {
        const splitAccountsAndAmounts = item.split(',')
        const amount: BN = new BN(splitAccountsAndAmounts[1].replace(';', ''))
        return { account: accountOrNamed(accounts, splitAccountsAndAmounts[0], 'Unknown Member'), amount: amount }
      })
    )
  }, [])
  return (
    <Modal onClose={() => undefined} modalSize="s" customModalSize={'552'} marginRight={'68'} modalHeight="xl">
      <ModalHeader onClick={() => setIsPreviewModalShown(false)} title="Preview And Validate" />
      <CustomModalBody>
        {previewAccounts?.map((previewAccount, i) => (
          <CustomAccountRow key={i}>
            <AccountInfo account={previewAccount.account} />
            <CustomBalanceInfoInRow>
              <InfoTitle>Amount</InfoTitle>
              <InfoValue>
                <TokenValue value={previewAccount.amount} />
              </InfoValue>
              <CloseButton onClick={undefined} />
            </CustomBalanceInfoInRow>
          </CustomAccountRow>
        ))}
      </CustomModalBody>
    </Modal>
  )
}
const CustomModalBody = styled(ModalBody)`
  display: block;
`
const CustomAccountRow = styled(AccountRow)`
  margin-bottom: 4px;
  padding-right: 16px;
`
const CustomBalanceInfoInRow = styled(BalanceInfoInRow)`
  grid-template-columns: 1fr 168px 72px;
  ${Close} {
    margin-left: auto;
  }
`
