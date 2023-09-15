import BN from 'bn.js'
import React, { useEffect, useState } from 'react'

import { AccountInfo } from '@/accounts/components/AccountInfo'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { AccountOption } from '@/accounts/types'
import { CloseButton } from '@/common/components/buttons'
import { ArrowRightIcon } from '@/common/components/icons'
import {
  BalanceInfoInRow,
  InfoTitle,
  InfoValue,
  ModalFooter,
  Row,
  TransactionInfoContainer,
} from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { SidePaneGlass, SidePaneTitle, SidePanelTop } from '@/common/components/SidePane'
import { StatisticButton } from '@/common/components/statistics/StatisticButton'
import { TransactionFee } from '@/common/components/TransactionFee'
import { TextInlineBig, TokenValue } from '@/common/components/typography'
import {
  CustomAccountRow,
  PreviewPanel,
  PreviewPanelBody,
  PreviewPanelHeader,
} from '@/proposals/modals/AddNewProposal/components/SpecificParameters/modals/PreviewAndValidate'

interface Props {
  label: string
  value: { account: string; amount: BN }[]
}
export const DestinationsPreview = ({ label, value }: Props) => {
  const [isDescriptionVisible, setDescriptionVisible] = useState(false)
  const [totalAmount, setTotalAmount] = useState<BN>(new BN(0))
  const { allAccounts } = useMyAccounts()
  const accounts = allAccounts as AccountOption[]

  const onBackgroundClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      setDescriptionVisible(false)
    }
  }

  useEffect(() => {
    let total = new BN(0)
    value?.map((item) => {
      total = total.add(item.amount)
    })
    setTotalAmount(total)
  }, [])
  return (
    <>
      <StatisticButton
        title="Payment Details"
        onClick={() => {
          setDescriptionVisible(true)
        }}
        icon={<ArrowRightIcon />}
      >
        <TextInlineBig bold value>
          {label}
        </TextInlineBig>
      </StatisticButton>
      {isDescriptionVisible && (
        <SidePaneGlass onClick={onBackgroundClick}>
          <PreviewPanel>
            <PreviewPanelHeader>
              <SidePanelTop>
                <SidePaneTitle>{label}</SidePaneTitle>
                <CloseButton onClick={() => setDescriptionVisible(false)} />
              </SidePanelTop>
            </PreviewPanelHeader>
            <PreviewPanelBody>
              <RowGapBlock gap={8}>
                <Row>
                  {value?.map((previewAccount, i) => (
                    <CustomAccountRow key={i}>
                      <AccountInfo account={accountOrNamed(accounts, previewAccount.account, 'Unknown Member')} />
                      <BalanceInfoInRow>
                        <InfoTitle>Amount</InfoTitle>
                        <InfoValue>
                          <TokenValue value={previewAccount.amount} />
                        </InfoValue>
                      </BalanceInfoInRow>
                    </CustomAccountRow>
                  ))}
                </Row>
              </RowGapBlock>
            </PreviewPanelBody>
            <ModalFooter>
              <TransactionInfoContainer>
                <TransactionFee title={'Total amount'} value={totalAmount} />
              </TransactionInfoContainer>
            </ModalFooter>
          </PreviewPanel>
        </SidePaneGlass>
      )}
    </>
  )
}
