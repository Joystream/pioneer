import { formatDateString } from '@/common/model/formatters'
import { relativeIfRecent } from '@/common/model/relativeIfRecent'

describe('relativeIfRecent', () => {
  it('More recent than breakpoint', () => {
    expect(relativeIfRecent('2021-08-10T08:00:00.000Z', 24, new Date('2021-08-10T12:00:00.000Z'))).toEqual(
      '4 hours ago'
    )
  })

  it('Before breakpoint', () => {
    const timestamp = '2021-08-09T08:00:00.000Z'
    expect(relativeIfRecent(timestamp, 24, new Date('2021-08-10T12:00:00.000Z')))
      // formatDateString uses local timezone, so we can either match against this or a date regex
      .toMatch(formatDateString(timestamp))
  })

  it('Exactly on breakpoint', () => {
    const timestamp = '2021-08-09T12:00:00.000Z'
    expect(relativeIfRecent(timestamp, 24, new Date('2021-08-10T12:00:00.000Z'))).toEqual(formatDateString(timestamp))
  })
})
