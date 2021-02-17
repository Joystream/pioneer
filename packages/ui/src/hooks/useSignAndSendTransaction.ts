import { SubmittableExtrinsic } from '@polkadot/api/types'
import { web3FromAddress } from '@polkadot/extension-dapp'
import { ISubmittableResult } from '@polkadot/types/types'
import BN from 'bn.js'
import { useEffect, useState } from 'react'
import { Observable } from 'rxjs'
import { Account } from './types'
import { useApi } from './useApi'
import { useKeyring } from './useKeyring'
import { useObservable } from './useObservable'

interface UseSignAndSendTransactionParams {
  transaction: SubmittableExtrinsic<'rxjs'> | undefined
  from: Account
  onSign: (transaction: Observable<ISubmittableResult>, fee: BN) => void
}

export const useSignAndSendTransaction = ({ transaction, from, onSign }: UseSignAndSendTransactionParams) => {
  const [isSending, setIsSending] = useState(false)
  const keyring = useKeyring()
  const { api } = useApi()
  const paymentInfo = useObservable(transaction?.paymentInfo(from.address), [from])

  useEffect(() => {
    if (!isSending || !transaction || !paymentInfo) {
      return
    }

    const keyringPair = keyring.getPair(from.address)
    const fee = paymentInfo.partialFee.toBn()

    if (keyringPair.meta.isInjected) {
      web3FromAddress(from.address).then(({ signer }) => {
        onSign(transaction.signAndSend(from.address, { signer: signer }), fee)
      })
    } else {
      onSign(transaction.signAndSend(keyringPair), fee)
    }
  }, [api, isSending])

  return { isSending, send: () => setIsSending(true), paymentInfo }
}
