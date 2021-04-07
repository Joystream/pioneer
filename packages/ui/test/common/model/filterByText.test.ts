import { filterByText } from '../../../src/accounts/components/SelectAccount/helpers'

describe('filterByText', () => {
  const mary = { name: 'Mary', address: '5tyW46xGFHne2UhjJM694Xgs5mUiveU4sbTyGBzmstUspZC9' }
  const louise = { name: 'Louise', address: '5tyW4Xgs5mUiv46xGFHne2UhjJM69eU4sbTyGBzmstUspZC9' }
  const marylouise = { name: 'Mary-Louise', address: '52UhjJM694Xgs5mUiveU4sbTyGBzmstUspZC9tyW46xGFHne' }
  const accounts = [mary, louise, marylouise]

  describe('Account name', () => {
    it('Matches full name', () => {
      expect(filterByText(accounts, 'Mary-Louise')).toEqual([marylouise])
    })

    it('Matches name, case-insensitive', () => {
      expect(filterByText(accounts, 'mary-louise')).toEqual([marylouise])
    })

    it('Includes partial matches', () => {
      expect(filterByText(accounts, 'mary')).toEqual([mary, marylouise])
    })

    it('Empty string matches all', () => {
      expect(filterByText(accounts, '')).toEqual(accounts)
    })

    it('Name ot in the list', () => {
      expect(filterByText(accounts, 'bobby')).toEqual([])
    })
  })

  describe('Address', () => {
    it('Matches full address', () => {
      expect(filterByText(accounts, '5tyW4Xgs5mUiv46xGFHne2UhjJM69eU4sbTyGBzmstUspZC9')).toEqual([louise])
    })

    it('Partial match', () => {
      expect(filterByText(accounts, '5tyW4Xgs5m')).toEqual([louise])
    })

    it('Case-sensitive', () => {
      expect(filterByText(accounts, '5tyw4xgs5muiv46xgfhne2uhjjm69eu4sbtygbzmstuspzc9')).toEqual([])
    })
  })
})
