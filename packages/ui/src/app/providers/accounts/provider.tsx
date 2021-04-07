import { web3Accounts, web3Enable } from '@polkadot/extension-dapp'
import { Keyring } from '@polkadot/ui-keyring'
import React, { ReactNode, useEffect, useState } from 'react'

import { useKeyring } from '../../../common/hooks/useKeyring'
import { useObservable } from '../../../common/hooks/useObservable'
import { Account } from '../../../common/types'
import { AccountsContext } from './context'

export interface UseAccounts {
  allAccounts: Account[]
  hasAccounts: boolean
  extensionUnavailable: boolean
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
const onExtensionLoaded = (onSuccess: () => void, onFail: () => void) => () => {
  const interval = 20
  const timeout = 1000
  let timeElapsed = 0
  const intervalId = setInterval(() => {
    if (Object.keys((window as any).injectedWeb3).length) {
      clearInterval(intervalId)
      onSuccess()
    } else {
      timeElapsed += interval
      if (timeElapsed >= timeout) {
        clearInterval(intervalId)
        onFail()
      }
    }
  }, interval)

  return () => clearInterval(intervalId)
}

export const AccountsContextProvider = (props: Props) => {
  const keyring = useKeyring()
  const [isLoaded, setIsLoaded] = useState(false)
  const [extensionUnavailable, setExtensionUnavailable] = useState(false)

  useEffect(
    onExtensionLoaded(
      () => setIsLoaded(true),
      () => setExtensionUnavailable(true)
    ),
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

  const value = { allAccounts, hasAccounts, extensionUnavailable }

  return <AccountsContext.Provider value={value}>{props.children}</AccountsContext.Provider>
}
