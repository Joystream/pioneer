import { EventRecord } from '@polkadot/types/interfaces'
import { useMachine } from '@xstate/react'
import BN from 'bn.js'
import React from 'react'

import { FailureModal } from '@/common/components/FailureModal'
import { TokenValue } from '@/common/components/typography'
import { useModal } from '@/common/hooks/useModal'

import { Account } from '../../types'

import { transferMachine } from './machine'
import { TransferFormModal } from './TransferFormModal'
import { TransferSignModal } from './TransferSignModal'
import { TransferSuccessModal } from './TransferSuccessModal'
import { TransferModalCall } from './types'

export const TransferModal = () => {
  const { hideModal, modalData } = useModal<TransferModalCall>()
  const { from: transferFrom, to: transferTo } = modalData
  const [state, send] = useMachine(transferMachine)

  const isTransfer = !transferFrom && !transferTo
  const isSend = !!transferFrom
  const title = isTransfer ? 'Transfer tokens' : isSend ? 'Send tokens' : 'Receive tokens'

  const onAccept = (amount: BN, from: Account, to: Account) => {
    send([{ type: 'SET_AMOUNT', amount }, { type: 'SET_FROM', from }, { type: 'SET_TO', to }, 'DONE'])
  }

  const onDone = (isSuccess: boolean, events: EventRecord[], fee: BN) => {
    send(isSuccess ? 'SUCCESS' : 'ERROR', { fee })
  }

  if (state.matches('prepare')) {
    return (
      <TransferFormModal onClose={hideModal} from={transferFrom} to={transferTo} onAccept={onAccept} title={title} />
    )
  }

  if (state.matches('transaction')) {
    const { amount, to, from } = state.context
    return <TransferSignModal onClose={hideModal} from={from} to={to} amount={amount} onDone={onDone} />
  }

  if (state.matches('success')) {
    const { amount, to, from, fee } = state.context
    return <TransferSuccessModal onClose={hideModal} from={from} to={to} amount={amount} fee={fee} />
  }

  if (state.matches('error')) {
    const { amount, to, from } = state.context

    return (
      <FailureModal onClose={hideModal}>
        You haven’t transferred <TokenValue value={amount} /> stake from “{from.name}” account to “{to.name}”
        destination.
      </FailureModal>
    )
  }

  return null
}
