import { sortAccounts, accountComparator } from '../../src/utils/sortAccounts'

describe('sortAccounts', () => {
  it('empty list', () => {
    expect(sortAccounts([], accountComparator.name)).toEqual([])
  })
  describe('by name', () => {
    it('descending', () => {
      const accounts = [
        { name: 'Zardoz', address: '' },
        { name: 'Bob', address: '' },
        { name: 'Anna', address: '' },
      ]
      expect(sortAccounts([...accounts], accountComparator.name)).toEqual([...accounts].reverse())
    })
    it('undefined is considered smaller', () => {
      const accounts = [
        { name: 'Anna', address: '' },
        { name: undefined, address: '' },
      ]
      expect(sortAccounts([...accounts], accountComparator.name)).toEqual([...accounts].reverse())
    })
    it('stable sort', () => {
      const accounts = [
        { name: 'Bob', address: '0' },
        { name: 'Zardoz', address: '' },
        { name: 'Bob', address: '1' },
        { name: 'Bob', address: '2' },
        { name: 'Anna', address: '' },
        { name: 'Bob', address: '3' },
      ]
      expect(sortAccounts(accounts, accountComparator.name)).toEqual([
        { name: 'Anna', address: '' },
        { name: 'Bob', address: '0' },
        { name: 'Bob', address: '1' },
        { name: 'Bob', address: '2' },
        { name: 'Bob', address: '3' },
        { name: 'Zardoz', address: '' },
      ])
    })
    it('stable sort of undefined names', () => {
      const accounts = [
        { name: undefined, address: '0' },
        { name: 'Zardoz', address: '' },
        { name: undefined, address: '1' },
        { name: 'Anna', address: '' },
        { name: undefined, address: '2' },
        { name: undefined, address: '3' },
      ]
      expect(sortAccounts(accounts, accountComparator.name)).toEqual([
        { name: undefined, address: '0' },
        { name: undefined, address: '1' },
        { name: undefined, address: '2' },
        { name: undefined, address: '3' },
        { name: 'Anna', address: '' },
        { name: 'Zardoz', address: '' },
      ])
    })
  })
})
