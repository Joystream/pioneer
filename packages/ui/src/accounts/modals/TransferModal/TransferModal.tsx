import BN from 'bn.js'
import React from 'react'

import { FailureModal } from '@/common/components/FailureModal'
import { TokenValue } from '@/common/components/typography'
import { useMachine } from '@/common/hooks/useMachine'
import { useModal } from '@/common/hooks/useModal'

import { Account } from '../../types'

import { transferMachine } from './machine'
import { TransferFormModal } from './TransferFormModal'
import { TransferSignModal } from './TransferSignModal'
import { TransferSuccessModal } from './TransferSuccessModal'
import { TransferModalCall } from './types'

export const TransferModal = () => {
  const { hideModal, modalData } = useModal<TransferModalCall>()
  const { from: transferFrom, to: transferTo, maxValue, transactionFactory, minValue, initialValue } = modalData
  const [state, send] = useMachine(transferMachine)

  const isTransfer = !transferFrom && !transferTo
  const isSend = !!transferFrom
  const title = isTransfer ? 'Transfer tokens' : isSend ? 'Send tokens' : 'Receive tokens'

  const onAccept = (amount: BN, from: Account, to: Account) => {
    send([{ type: 'SET_AMOUNT', amount }, { type: 'SET_FROM', from }, { type: 'SET_TO', to }, 'DONE'])
  }

  if (state.matches('prepare')) {
    return (
      <TransferFormModal
        onClose={hideModal}
        from={transferFrom}
        to={transferTo}
        onAccept={onAccept}
        title={title}
        maxValue={maxValue}
        minValue={minValue}
        initialValue={initialValue}
      />
    )
  }

  if (state.matches('transaction')) {
    const { amount, to, from } = state.context
    const service = state.children.transaction
    return (
      <TransferSignModal
        onClose={hideModal}
        from={from}
        to={to}
        amount={amount}
        service={service}
        transactionFactory={transactionFactory}
      />
    )
  }

  if (state.matches('success')) {
    const { amount, to, from, fee } = state.context
    return <TransferSuccessModal onClose={hideModal} from={from} to={to} amount={amount} fee={fee} />
  }

  if (state.matches('canceled')) {
    return <FailureModal onClose={hideModal}>Transaction was canceled</FailureModal>
  }

  if (state.matches('error')) {
    const { amount, to, from } = state.context

    return (
      <FailureModal onClose={hideModal} events={state.context.transactionEvents}>
        You haven’t transferred <TokenValue value={amount} /> stake from “{from.name}” account to “{to.name}”
        destination.
      </FailureModal>
    )
  }

  return null
}
