import { getReward } from '@/working-groups/model/getReward'

describe('getReward', () => {
  it('Example use', () => {
    const reward = getReward(2, 'forum')
    expect(reward.payout.toNumber()).toEqual(28820)
    expect(reward.blockInterval).toEqual(14410)
  })

  it('Not a group name', () => {
    expect(() => getReward(1, 'incorrect')).toThrow(TypeError)
  })
})
