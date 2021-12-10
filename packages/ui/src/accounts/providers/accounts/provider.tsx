import { web3Accounts, web3AccountsSubscribe, web3Enable } from '@polkadot/extension-dapp'
import { Keyring } from '@polkadot/ui-keyring'
import React, { ReactNode, useEffect, useState } from 'react'
import { debounceTime, filter, skip } from 'rxjs/operators'

import { useKeyring } from '@/common/hooks/useKeyring'
import { useObservable } from '@/common/hooks/useObservable'
import { error } from '@/common/logger'

import { Account } from '../../types'

import { AccountsContext } from './context'

type Error = 'EXTENSION'

export interface UseAccounts {
  allAccounts: Account[]
  hasAccounts: boolean
  isLoading: boolean
  error?: Error
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

  if (!isKeyringLoaded(keyring)) {
    keyring.loadAll({ isDevelopment: false }, injectedAccounts)
  }

  await web3AccountsSubscribe((accounts) => {
    const current = keyring.getAccounts()

    const addresses = accounts.map(({ address }) => address)

    current.forEach(({ address }) => {
      if (!addresses.includes(address)) {
        keyring.forgetAccount(address)
      }
    })

    accounts.forEach((injected) => keyring.addExternal(injected.address, injected.meta))
  })
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
  const [isExtensionLoaded, setIsExtensionLoaded] = useState(false)
  const [extensionUnavailable, setExtensionUnavailable] = useState(false)

  useEffect(
    onExtensionLoaded(
      () => setIsExtensionLoaded(true),
      () => setExtensionUnavailable(true)
    ),
    []
  )

  useEffect(() => {
    if (!isExtensionLoaded) {
      return
    }

    loadKeysFromExtension(keyring).catch(error)
  }, [isExtensionLoaded])

  const accounts = useObservable(
    keyring.accounts.subject.asObservable().pipe(
      debounceTime(20),
      filter((accounts) => !!accounts),
      skip(1)
    ),
    [keyring]
  )
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

  const value: UseAccounts = { allAccounts, hasAccounts, isLoading: !isExtensionLoaded || !accounts }

  if (extensionUnavailable) {
    value.error = 'EXTENSION'
    value.isLoading = false
  }

  return <AccountsContext.Provider value={value}>{props.children}</AccountsContext.Provider>
}
