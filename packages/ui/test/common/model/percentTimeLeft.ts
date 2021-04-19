import { percentTimeLeft } from '../../../src/common/model/percentTimeLeft'

describe('percentTimeLeft', () => {
  const timeBeforeStart = '2020-01-01T12:00:00.000Z'
  const timeStart = '2021-01-01T12:00:00.000Z'
  const time60 = '2021-01-05T12:00:00.000Z'
  const timeHalf = '2021-01-06T12:00:00.000Z'
  const time20 = '2021-01-09T12:00:00.000Z'
  const timeEnd = '2021-01-11T12:00:00.000Z'
  const timeAfterEnd = '2022-01-10T12:00:00.000Z'

  it('Now after end', () => {
    expect(percentTimeLeft(timeEnd, timeStart, new Date(timeAfterEnd))).toEqual(0)
  })

  it('Now before start', () => {
    expect(percentTimeLeft(timeEnd, timeStart, new Date(timeBeforeStart))).toEqual(100)
  })

  it('Half time left', () => {
    expect(percentTimeLeft(timeEnd, timeStart, new Date(timeHalf))).toEqual(50)
  })

  it('20% of time left', () => {
    expect(percentTimeLeft(timeEnd, timeStart, new Date(time20))).toEqual(20)
  })

  it('60% of time left', () => {
    expect(percentTimeLeft(timeEnd, timeStart, new Date(time60))).toEqual(60)
  })
})
