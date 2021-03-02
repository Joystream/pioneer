import { sortAccounts, accountComparator } from '../../src/utils/sortAccounts'
import BN from 'bn.js'

describe('sortAccounts', () => {
  const emptyMap = {}
  it('empty list', () => {
    expect(sortAccounts([], emptyMap, accountComparator.name)).toEqual([])
  })
  describe('by name', () => {
    it('ascending', () => {
      const accounts = [
        { name: 'Zardoz', address: '' },
        { name: 'Bob', address: '' },
        { name: 'Anna', address: '' },
      ]
      expect(sortAccounts([...accounts], emptyMap, accountComparator.name)).toEqual([...accounts].reverse())
    })
    it('undefined is considered smaller', () => {
      const accounts = [
        { name: 'Anna', address: '' },
        { name: undefined, address: '' },
      ]
      expect(sortAccounts([...accounts], emptyMap, accountComparator.name)).toEqual([...accounts].reverse())
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
      expect(sortAccounts(accounts, emptyMap, accountComparator.name)).toEqual([
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
      expect(sortAccounts(accounts, emptyMap, accountComparator.name)).toEqual([
        { name: undefined, address: '0' },
        { name: undefined, address: '1' },
        { name: undefined, address: '2' },
        { name: undefined, address: '3' },
        { name: 'Anna', address: '' },
        { name: 'Zardoz', address: '' },
      ])
    })
  })
  describe('by balance', () => {
    const balances = {
      '0': {
        total: new BN(100),
        locked: new BN(100),
        recoverable: new BN(100),
        transferable: new BN(100),
      },
      '1': {
        total: new BN(300),
        locked: new BN(100),
        recoverable: new BN(100),
        transferable: new BN(100),
      },
      '2': {
        total: new BN(100),
        locked: new BN(100),
        recoverable: new BN(100),
        transferable: new BN(100),
      },
      '3': {
        total: new BN(200),
        locked: new BN(100),
        recoverable: new BN(100),
        transferable: new BN(100),
      },
    }
    const anna = { name: 'Anna', address: '0' }
    const bob = { name: 'Bob', address: '1' }
    const zardoz = { name: 'Zardoz', address: '2' }
    const dwayne = { name: 'Dwayne', address: '3' }
    const accounts = [anna, bob, zardoz, dwayne]
    it('total', () => {
      expect(sortAccounts([...accounts], balances, accountComparator.totalBalance)).toEqual([anna, zardoz, dwayne, bob])
    })
    it('missing balances', () => {
      const jason = { name: 'Jason', address: 'a' }
      const luke = { name: 'Luke', address: 'b' }
      const _accounts = [anna, bob, jason, zardoz, dwayne, luke]
      expect(sortAccounts([..._accounts], balances, accountComparator.totalBalance)).toEqual([
        jason,
        luke,
        anna,
        zardoz,
        dwayne,
        bob,
      ])
    })
  })
})
