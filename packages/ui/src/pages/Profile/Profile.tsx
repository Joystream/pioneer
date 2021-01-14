import { Page } from '../../components/page/Page'
import { Navigation } from '../../components/page/Navigation'
import React, { useEffect, useState } from 'react'
import { PageContent } from '../../components/page/PageContent'
import { useSubstrate } from '../../providers/SubstrateContext'
import { KeyringAddress } from '@polkadot/ui-keyring/types'

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
        <ul>
          {accounts.map((account) => (
            <li key={account.address}>
              {account.meta.name} - {account.address}
            </li>
          ))}
        </ul>
      </PageContent>
    </Page>
  )
}
