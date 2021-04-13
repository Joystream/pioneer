import { relativeTime } from '../../../src/common/model/relativeTime'

describe('relativeTime', () => {
  const now = new Date('2021-04-13T12:00:00.329Z').valueOf()

  describe('Within minutes', () => {
    it('Minutes ago', () => {
      const date = '2021-04-13T11:58:00.329Z'
      expect(relativeTime(date, now)).toEqual('2 minutes ago')
    })

    it('Minutes in the future', () => {
      const date = '2021-04-13T12:30:03.329Z'
      expect(relativeTime(date, now)).toEqual('in 30 minutes')
    })

    it('Within one minute', () => {
      const date = '2021-04-13T11:59:00.329Z'
      expect(relativeTime(date, now)).toEqual('1 minute ago')
    })
  })

  describe('Correct unit brackets - always rounding down', () => {
    it('An hour ago', () => {
      const date = '2021-04-13T10:30:00.329Z'
      expect(relativeTime(date, now)).toEqual('1 hour ago')
    })

    it('In a day', () => {
      const date = '2021-04-15T10:30:00.329Z'
      expect(relativeTime(date, now)).toEqual('in 1 day')
    })

    it('Two weeks ago', () => {
      const date = '2021-03-27T10:30:00.329Z'
      expect(relativeTime(date, now)).toEqual('2 weeks ago')
    })

    it('In 2 months', () => {
      const date = '2021-06-16T16:30:00.329Z'
      expect(relativeTime(date, now)).toEqual('in 2 months')
    })

    it('In 12 months', () => {
      const date = '2022-04-10T10:30:00.329Z'
      expect(relativeTime(date, now)).toEqual('in 12 months')
    })
  })

  describe('Within less than a minute', () => {
    it('Soon', () => {
      const date = '2021-04-13T12:00:30.329Z'
      expect(relativeTime(date, now)).toEqual('soon')
    })

    it('Less than a minute ago', () => {
      const date = '2021-04-13T11:59:30.329Z'
      expect(relativeTime(date, now)).toEqual('a short while ago')
    })
  })
})
