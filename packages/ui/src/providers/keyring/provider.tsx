import { web3Accounts, web3Enable } from '@polkadot/extension-dapp'
import keyring from '@polkadot/ui-keyring/Keyring'
import React, { ReactNode, useEffect, useState } from 'react'
import { KeyringContext } from './context'

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

const loadKeysFromExtension = async () => {
  await web3Enable('Pioneer')
  const injectedAccounts = await web3Accounts()
  const allAccounts = injectedAccounts.map(({ address, meta }) => ({
    address,
    meta: { ...meta, name: `${meta.name} (${meta.source})` },
  }))

  if (!isKeyringLoaded()) {
    keyring.loadAll({ isDevelopment: true }, allAccounts)
  }
}

// Extensions is not always ready on application load, hence the check
const onExtensionLoaded = (callback: () => void) => () => {
  const intervalId = setInterval(() => {
    if (Object.keys((window as any).injectedWeb3).length) {
      clearInterval(intervalId)
      callback()
    }
  }, 20)

  return () => clearInterval(intervalId)
}

export const KeyringContextProvider = (props: Props) => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(
    onExtensionLoaded(() => setIsLoaded(true)),
    []
  )

  useEffect(() => {
    if (!isLoaded) {
      return
    }

    loadKeysFromExtension()
  }, [isLoaded])

  return <KeyringContext.Provider value={keyring}>{props.children}</KeyringContext.Provider>
}
