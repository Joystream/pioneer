import React, { ReactNode, useCallback, useEffect, useState } from 'react'
import { ActorRef, State, Subscription } from 'xstate'

import { TransactionEvent, TransactionContext as TxContext } from '@/common/model/machines'

import { TransactionContext } from './context'

interface Props {
  children: ReactNode
}

export const TransactionContextProvider = ({children}: Props) => {
  const [isTransactionPending, setPending] = useState(false)
  const [transactionService, setService] = useState<ActorRef<TransactionEvent, State<TxContext>>>()
  const [statusShown, setStatusShown] = useState(false)

  useEffect(() => {
    let subscription: Subscription

    if (transactionService) {
      // TODO: Do better
      subscription = transactionService.subscribe((state) => {
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
      setPending(false)
    }

    return () => subscription?.unsubscribe()
  }, [transactionService])

  const showStatus = useCallback((service: ActorRef<any>) => {
    setService(service)
    setStatusShown(true)
  }, [])

  const hideStatus = useCallback(() => setStatusShown(false), [])

  return (
    <TransactionContext.Provider
      value={{
        isTransactionPending,
        transactionService,
        showStatus,
        hideStatus,
        statusShown,
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}
