import { Meta } from '@storybook/react'
import BN from 'bn.js'
import { set } from 'lodash'
import React from 'react'
import { Observable } from 'rxjs'

import { VestingLockListItem } from '@/accounts/components/AccountItem/components/VestingLockItem/VestingLockItem'
import { ApiContext } from '@/common/providers/api/context'

import { stubApi } from '../../../../../../test/_mocks/transactions'

export default {
  title: 'Accounts/VestingLockListItem',
  component: VestingLockListItem,
} as Meta

export const Default = () => {
  const api = stubApi()
  set(
    api.api,
    'rpc.chain.subscribeNewHeads',
    () =>
      new Observable((sub) =>
        sub.next({
          number: {
            toBn: () => new BN(133),
          },
        })
      )
  )

  return (
    <ApiContext.Provider value={api}>
      <VestingLockListItem
        startingBlock={new BN(100)}
        endBlock={new BN(300)}
        perBlock={new BN(10_0000000000)}
        locked={new BN(1000_0000000000)}
        vested={new BN(100_0000000000)}
      />
    </ApiContext.Provider>
  )
}
