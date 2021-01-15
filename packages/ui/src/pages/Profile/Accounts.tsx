import { KeyringAddress } from '@polkadot/ui-keyring/types'
import React from 'react'

interface Props {
  keyringAddresses: KeyringAddress[]
}

export function Accounts({ keyringAddresses }: Props) {
  return (
    <table>
      <thead>
        <tr>
          <th>Account</th>
          <th>Total balance</th>
        </tr>
      </thead>
      <tbody>
        {keyringAddresses.map((account) => (
          <tr key={account.address}>
            <td>
              <h3>{account.meta.name}</h3>
              <p>{account.address}</p>
            </td>
            <td>
              <p>0 JOY</p>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
