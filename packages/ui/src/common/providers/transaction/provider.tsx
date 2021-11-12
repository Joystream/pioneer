import React, { ReactNode, useCallback, useState } from 'react'
import { ActorRef } from 'xstate'

import { TransactionContext } from './context'

interface Props {
  children: ReactNode
}

export const TransactionContextProvider = ({ children }: Props) => {
  const [isTransactionPending, setPending] = useState(false)
  const [transactionService, setService] = useState<ActorRef<any>>()
  const [statusShown, setStatusShown] = useState(false)

  const showStatus = useCallback((service: ActorRef<any>) => {
    setService(service)
    setStatusShown(true)
  }, [])

  const hideStatus = useCallback(() => setStatusShown(false), [])

  return (
    <TransactionContext.Provider
      value={{
        isTransactionPending,
        setPending,
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
