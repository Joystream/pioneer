import React, { useEffect, useState } from 'react'
import { KeyringAddress } from '@polkadot/ui-keyring/types'
import { Page } from '../../components/page/Page'
import { Navigation } from '../../components/page/Navigation'
import { PageContent } from '../../components/page/PageContent'
import { Accounts } from './Accounts'
import { useSubstrate } from '../../hooks/useSubstrate'

export function Profile() {
  const { keyring, keyringState } = useSubstrate()
  const [accounts, setAccounts] = useState<KeyringAddress[]>([])

  useEffect(() => {
    setAccounts(keyring?.getAccounts() ?? [])
  }, [keyring])

  if (keyringState !== 'READY') {
    return <div>Loading...</div>
  }

  return (
    <Page>
      <Navigation />
      <PageContent>
        <Accounts keyringAddresses={accounts} />
      </PageContent>
    </Page>
  )
}
