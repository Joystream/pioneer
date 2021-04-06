import { web3Accounts, web3Enable } from '@polkadot/extension-dapp'
import { Keyring } from '@polkadot/ui-keyring'
import React, { ReactNode, useEffect, useState } from 'react'

import { Account } from '../../common/types'
import { useKeyring } from '../../hooks/useKeyring'
import { useObservable } from '../../hooks/useObservable'
import { AccountsContext } from './context'

export interface UseAccounts {
  allAccounts: Account[]
  hasAccounts: boolean
}

interface Props {
  children: ReactNode
}

function isKeyringLoaded(keyring: Keyring) {
  try {
    return !!keyring.keyring
  } catch {
    return false
  }
}

const loadKeysFromExtension = async (keyring: Keyring) => {
  await web3Enable('Pioneer')
  const injectedAccounts = await web3Accounts()
  const allAccounts = injectedAccounts.map(({ address, meta }) => ({
    address,
    meta: { ...meta, name: `${meta.name} (${meta.source})` },
  }))

  if (!isKeyringLoaded(keyring)) {
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

export const AccountsContextProvider = (props: Props) => {
  const keyring = useKeyring()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(
    onExtensionLoaded(() => setIsLoaded(true)),
    []
  )

  useEffect(() => {
    if (!isLoaded) {
      return
    }

    loadKeysFromExtension(keyring).catch(console.error)
  }, [isLoaded])

  const accounts = useObservable(keyring.accounts.subject.asObservable(), [keyring])

  const allAccounts: Account[] = []

  if (accounts) {
    allAccounts.push(
      ...Object.values(accounts).map((account) => ({
        address: account.json.address,
        name: account.json.meta.name,
      }))
    )
  }

  const hasAccounts = allAccounts.length !== 0

  const value = { allAccounts, hasAccounts, extensionUnavailable: undefined }

  return <AccountsContext.Provider value={value}>{props.children}</AccountsContext.Provider>
}
