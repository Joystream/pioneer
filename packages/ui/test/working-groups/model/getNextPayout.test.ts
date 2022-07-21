import BN from 'bn.js'

import { createType } from '@/common/model/createType'
import { GroupIdName } from '@/working-groups/types'

import { getNextPayout } from '../../../src/working-groups/model/getNextPayout'
import { stubApi, stubConst } from '../../_mocks/transactions'

describe('getNextPayout', () => {
  const api = stubApi()
  stubConst(api, 'forumWorkingGroup.rewardPeriod', createType('u32', 14410))
  stubConst(api, 'storageWorkingGroup.rewardPeriod', createType('u32', 14420))
  stubConst(api, 'contentWorkingGroup.rewardPeriod', createType('u32', 14430))

  it('Single role', () => {
    const blockNumber = new BN(14400)
    const workers = ['forumWorkingGroup'].map(toWorkerFragment)
    expect(getNextPayout(workers, blockNumber, api.api)?.toNumber()).toEqual(10)
  })

  it('No roles', () => {
    const blockNumber = new BN(14400)
    const workers = [].map(toWorkerFragment)
    expect(getNextPayout(workers, blockNumber, api.api)?.toNumber()).toEqual(-1)
  })

  it('Multiple roles', () => {
    const blockNumber = new BN(14400)
    const workers1 = ['forumWorkingGroup', 'storageWorkingGroup', 'contentWorkingGroup'].map(toWorkerFragment)
    expect(getNextPayout(workers1, blockNumber, api.api)?.toNumber()).toEqual(10)
    const workers2 = ['storageWorkingGroup', 'contentWorkingGroup'].map(toWorkerFragment)
    expect(getNextPayout(workers2, blockNumber, api.api)?.toNumber()).toEqual(20)
  })

  it('Later block', () => {
    const blockNumber = new BN(14400 * 2)
    const workers = ['forumWorkingGroup', 'storageWorkingGroup', 'contentWorkingGroup'].map(toWorkerFragment)
    expect(getNextPayout(workers, blockNumber, api.api)?.toNumber()).toEqual(20)
  })

  const toWorkerFragment = (groupName: string) => ({
    group: {
      id: groupName as GroupIdName,
      name: groupName,
    },
  })
})
