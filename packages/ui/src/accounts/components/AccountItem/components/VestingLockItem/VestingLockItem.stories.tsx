import { BN_ZERO } from '@polkadot/util'
import { Meta, Story } from '@storybook/react'
import BN from 'bn.js'
import { clamp } from 'lodash'
import React, { useMemo } from 'react'

import { VestingLockListItem } from '@/accounts/components/AccountItem/components/VestingLockItem/VestingLockItem'
import { ApiContext } from '@/api/providers/context'
import { JOY_DECIMAL_PLACES } from '@/common/constants'

import { stubApi, stubQuery } from '../../../../../../test/_mocks/transactions'

const blockControl = { control: { type: 'range', min: 0, max: 1000 } }

export default {
  title: 'Accounts/VestingLockListItem',
  component: VestingLockListItem,
  argTypes: {
    currentBlock: blockControl,
    startingBlock: blockControl,
  },
} as Meta

const defaultProps = {
  currentBlock: 50,
  locked: 1000,
  perBlock: 1,
  startingBlock: 0,
}

export const Default: Story<typeof defaultProps> = ({ currentBlock, locked, perBlock, startingBlock }) => {
  const api = useMemo(() => {
    const api = stubApi()
    stubQuery(api, 'rpc.chain.subscribeNewHeads', { number: { toBn: () => BN_ZERO } })
    return api
  }, [])

  const endBlock = useMemo(() => locked / perBlock + startingBlock, [locked, perBlock, startingBlock])

  const vested = useMemo(() => clamp((currentBlock - startingBlock) * perBlock, 0, locked), [currentBlock, endBlock])

  return (
    <ApiContext.Provider value={api}>
      <VestingLockListItem
        startingBlock={new BN(startingBlock)}
        endBlock={new BN(endBlock)}
        perBlock={new BN(perBlock * 10 ** JOY_DECIMAL_PLACES)}
        locked={new BN(locked * 10 ** JOY_DECIMAL_PLACES)}
        vested={new BN(vested * 10 ** JOY_DECIMAL_PLACES)}
      />
    </ApiContext.Provider>
  )
}

Default.args = defaultProps
