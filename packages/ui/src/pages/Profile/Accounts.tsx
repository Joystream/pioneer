import React from 'react'
import { Account } from '../../hooks/useAccounts'

interface Props {
  accounts: Account[]
}

export function Accounts({ accounts }: Props) {
  return (
    <table>
      <thead>
        <tr>
          <th>Account</th>
          <th>Total balance</th>
        </tr>
      </thead>
      <tbody>
        {accounts.map((account) => (
          <tr key={account.address}>
            <td>
              <h3>{account.name}</h3>
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
