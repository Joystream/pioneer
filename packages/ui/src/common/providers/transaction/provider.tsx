import React, { ReactNode, useEffect, useState } from 'react'
import { ActorRef, State, Subscription } from 'xstate'

import { TransactionContext as TxContext, TransactionEvent, TransactionStateValue } from '@/common/model/machines'

import { TransactionContext } from './context'

interface Props {
  children: ReactNode
}

const PENDING_STATUS: TransactionStateValue[] = ['signWithExtension', 'signing', 'pending', 'finalizing', 'processing']

const getIsPendingStatus = (status: TransactionStateValue | null): boolean => {
  return !!status && PENDING_STATUS.includes(status)
}

export const TransactionContextProvider = ({ children }: Props) => {
  const [transactionService, setService] = useState<ActorRef<TransactionEvent, State<TxContext>>>()
  const [status, setStatus] = useState<TransactionStateValue | null>(null)

  useEffect(() => {
    let subscription: Subscription

    if (transactionService) {
      subscription = transactionService.subscribe((state) => setStatus(state.value as TransactionStateValue))
    } else {
      setStatus(null)
    }

    return () => subscription?.unsubscribe()
  }, [transactionService])

  return (
    <TransactionContext.Provider
      value={{
        isTransactionPending: getIsPendingStatus(status),
        status,
        setService,
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}
