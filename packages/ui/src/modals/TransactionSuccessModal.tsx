import React from 'react'
import { Modal, ModalBody, ModalHeader } from '../components/modal'
import { useAccounts } from '../hooks/useAccounts'
import { AccountInfo } from '../components/AccountInfo'
import { AccountRow, BalanceInfo, InfoTitle, InfoValue, TransactionAmount } from './TransferModal/TransferModal'
import { TokenValue } from '../components/TokenValue'
import BN from 'bn.js'

export function TransactionSuccessModal() {
  const accounts = useAccounts()

  if (!accounts.hasAccounts) {
    return <></>
  }

  const [from, to] = accounts.allAccounts

  return (
    <Modal>
      <ModalHeader
        onClick={() => {
          /**/
        }}
        title="Success"
      />
      <ModalBody>
        <AccountRow>
          <AccountInfo account={from} />
          <BalanceInfo>
            <InfoTitle>Transferable balance before</InfoTitle>
            <InfoValue>
              <TokenValue value={100_000_000} />
            </InfoValue>
            <InfoTitle>Transferable balance after</InfoTitle>
            <InfoValue>
              <TokenValue value={0} />
            </InfoValue>
          </BalanceInfo>
        </AccountRow>
        <TransactionAmount>
          Transferred <TokenValue value={new BN(10_000)} />
        </TransactionAmount>
        <AccountRow>
          <AccountInfo account={to} />
          <BalanceInfo>
            <InfoTitle>Transferable balance before</InfoTitle>
            <InfoValue>
              <TokenValue value={0} />
            </InfoValue>
            <InfoTitle>Transferable balance after</InfoTitle>
            <InfoValue>
              <TokenValue value={50_000_000} />
            </InfoValue>
          </BalanceInfo>
        </AccountRow>
      </ModalBody>
    </Modal>
  )
}
