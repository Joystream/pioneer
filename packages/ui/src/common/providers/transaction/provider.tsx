import React, { ReactNode, useState } from 'react'

import { TransactionContext } from './context'

interface Props {
  children: ReactNode
}

export const TransactionContextProvider = ({ children }: Props) => {
  const [isTransactionPending, setPending] = useState(false)

  return (
    <TransactionContext.Provider
      value={{
        isTransactionPending,
        setPending,
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}
