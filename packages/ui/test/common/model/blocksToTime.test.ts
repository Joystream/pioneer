import BN from 'bn.js'

import { blocksToTime } from '../../../src/common/model/blocksToTime'

describe('blocksToTime', () => {
  it('Less than one minute', () => {
    const blocks = new BN(0)
    expect(blocksToTime(blocks)).toEqual('<1 min')
  })

  it('Negative number of blocks', () => {
    const blocks = new BN(-1)
    expect(blocksToTime(blocks)).toEqual('never')
  })

  it('a minute', () => {
    const blocks = new BN(10)
    expect(blocksToTime(blocks)).toEqual('1 min')
  })

  it('two minutes', () => {
    const blocks = new BN(20)
    expect(blocksToTime(blocks)).toEqual('2 min')
  })

  it('bigger numbers of blocks', () => {
    expect(blocksToTime(new BN(481))).toEqual('48 min')
    expect(blocksToTime(new BN(800))).toEqual('1 hr')
    expect(blocksToTime(new BN(2800))).toEqual('4 hr')
    expect(blocksToTime(new BN(14430))).toEqual('1 day')
  })
})
