import React, { ReactNode, useState } from 'react'

import { TransactionContext } from './context'

interface Props {
  children: ReactNode
}

export const TransactionContextProvider = ({ children }: Props) => {
  const [transactionPending, setPending] = useState(false)

  return (
    <TransactionContext.Provider
      value={{
        transactionPending,
        setPending,
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}
