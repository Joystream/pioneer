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
  transfer: SubmittableExtrinsic<'rxjs'> | undefined
  from: Account
  onSign: (transaction: Observable<ISubmittableResult>, fee: BN) => void
}

export const useSignAndSendTransaction = ({ transfer, from, onSign }: UseSignAndSendTransactionParams) => {
  const [isSending, setIsSending] = useState(false)
  const keyring = useKeyring()
  const { api } = useApi()
  const paymentInfo = useObservable(transfer?.paymentInfo(from.address), [from])

  useEffect(() => {
    if (!isSending || !transfer || !paymentInfo) {
      return
    }

    const keyringPair = keyring.getPair(from.address)
    const fee = paymentInfo.partialFee.toBn()

    if (keyringPair.meta.isInjected) {
      web3FromAddress(from.address).then(({ signer }) => {
        onSign(transfer.signAndSend(from.address, { signer: signer }), fee)
      })
    } else {
      onSign(transfer.signAndSend(keyringPair), fee)
    }
  }, [api, isSending])

  return { isSending, send: () => setIsSending(true), paymentInfo }
}
