import React from 'react'
import { Account } from '../../hooks/useAccounts'
import styled from 'styled-components'
import { Colors } from '../../constants'

interface Props {
  accounts: Account[]
}

export function Accounts({ accounts }: Props) {
  return (
    <Table>
      <thead>
        <tr>
          <HeaderCell>Account</HeaderCell>
          <HeaderCell>Total balance</HeaderCell>
        </tr>
      </thead>
      <tbody>
        {accounts.map((account) => (
          <BodyRow key={account.address}>
            <BodyCell>
              <h3>{account.name}</h3>
              <p>{account.address}</p>
            </BodyCell>
            <BodyCell>
              <p>0 JOY</p>
            </BodyCell>
          </BodyRow>
        ))}
      </tbody>
    </Table>
  )
}

const Table = styled.table`
  border-collapse: collapse;
  margin: 0.5em 1em 0;
`

const HeaderCell = styled.th`
  color: ${Colors.Grey};
  font-size: 12px;
  line-height: 16px;
  font-weight: normal;
  text-align: left;
  text-transform: uppercase;
`

const BodyRow = styled.tr`
  border: 1px solid #dde2eb;
`

const BodyCell = styled.td`
  padding: 0.5em;
`
