import { EventRecord } from '@polkadot/types/interfaces'
import BN from 'bn.js'
import React, { useState } from 'react'

import { Account, ModalState } from '../../common/types'
import { useModal } from '../../hooks/useModal'
import { SignTransferModal } from './SignTransferModal'
import { TransactionFailureModal } from './TransactionFailureModal'
import { TransactionSuccessModal } from './TransactionSuccessModal'
import { TransferDetailsModal } from './TransferDetailsModal'
import { TransferModalCall } from './types'

export function TransferModal() {
  const { hideModal, modalData } = useModal<TransferModalCall>()
  const { from, to } = modalData
  const [step, setStep] = useState<ModalState>('PREPARE')
  const [amount, setAmount] = useState<BN>(new BN(0))
  const [fee, setFee] = useState<BN>(new BN(0))
  const [transferFrom, setTransferFrom] = useState<Account | undefined>(from)
  const [transferTo, setTransferTo] = useState<Account | undefined>(to)

  const isTransfer = !from && !to
  const isSend = !!from
  const title = isTransfer ? 'Transfer tokens' : isSend ? 'Send tokens' : 'Receive tokens'

  const onAccept = (amount: BN, from: Account, to: Account) => {
    setAmount(amount)
    setTransferTo(to)
    setTransferFrom(from)
    setStep('AUTHORIZE')
  }

  const onDone = (result: boolean, events: EventRecord[], fee: BN) => {
    setStep(result ? 'SUCCESS' : 'ERROR')
    setFee(fee)
  }

  if (step === 'PREPARE' || !transferTo || !transferFrom) {
    return (
      <TransferDetailsModal onClose={hideModal} from={transferFrom} to={transferTo} onAccept={onAccept} title={title} />
    )
  }

  if (step === 'AUTHORIZE') {
    return <SignTransferModal onClose={hideModal} from={transferFrom} amount={amount} to={transferTo} onDone={onDone} />
  }

  if (step === 'SUCCESS') {
    return <TransactionSuccessModal onClose={hideModal} from={transferFrom} to={transferTo} amount={amount} fee={fee} />
  }

  return <TransactionFailureModal onClose={hideModal} from={transferFrom} amount={amount} to={transferTo} />
}
