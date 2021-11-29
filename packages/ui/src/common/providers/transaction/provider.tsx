import React, { ReactNode, useEffect, useState } from 'react'
import { ActorRef, State, Subscription } from 'xstate'

import { TransactionContext as TxContext, TransactionEvent, TransactionState } from '@/common/model/machines'

import { TransactionContext } from './context'

interface Props {
  children: ReactNode
}

export const TransactionContextProvider = ({children}: Props) => {
  const [isTransactionPending, setPending] = useState(false)
  const [transactionService, setService] = useState<ActorRef<TransactionEvent, State<TxContext>>>()
  const [status, setStatus] = useState<TransactionState['value'] | null>(null)

  useEffect(() => {
    let subscription: Subscription

    if (transactionService) {
      // TODO: Do better
      subscription = transactionService.subscribe((state) => {
        setStatus(state.value as TransactionState['value'])

        if (state.matches('signWithExtension')) {
          setPending(true)
        } else if (state.matches('canceled')) {
          setPending(false)
        } else if (state.matches('pending')) {
          setPending(true)
        } else if (state.matches('finalizing')) {
          setPending(true)
        } else if (state.matches('processing')) {
          setPending(true)
        } else if (state.matches('success')) {
          setPending(false)
        } else if (state.matches('error')) {
          setPending(false)
        }
      })
    } else {
      setStatus(null)
      setPending(false)
    }

    return () => subscription?.unsubscribe()
  }, [transactionService])

  return (
    <TransactionContext.Provider value={{isTransactionPending, status, setService}}>
      {children}
    </TransactionContext.Provider>
  )
}
