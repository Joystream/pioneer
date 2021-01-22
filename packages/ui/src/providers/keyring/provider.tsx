import React, { ReactNode, useEffect } from 'react'
import keyring from '@polkadot/ui-keyring'
import { KeyringContext } from './context'
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp'

interface Props {
  children: ReactNode
}

function isKeyringLoaded() {
  try {
    return !!keyring.keyring
  } catch {
    return false
  }
}

export const KeyringContextProvider = (props: Props) => {
  useEffect(() => {
    web3Enable('Pioneer')
      .then(() => web3Accounts())
      .then((injectedAccounts) => {
        const allAccounts = injectedAccounts.map(({ address, meta }) => ({
          address,
          meta: { ...meta, name: `${meta.name} (${meta.source})` },
        }))

        if (!isKeyringLoaded()) {
          keyring.loadAll({ isDevelopment: true }, allAccounts)
        }
      })
  }, [])

  return <KeyringContext.Provider value={keyring}>{props.children}</KeyringContext.Provider>
}
