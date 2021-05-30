import { getReward } from '@/working-groups/model/getReward'

describe('getRewardAmount', () => {
  it('Example use', () => {
    const reward = getReward(1, 'forum')
    expect(reward.value.toNumber()).toEqual(14410)
    expect(reward.interval).toEqual(14410)
  })

  it('Not a group name', () => {
    expect(() => getReward(1, 'incorrect')).toThrow(TypeError)
  })
})
