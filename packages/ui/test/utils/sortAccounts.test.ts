import { sortAccounts } from '../../src/utils/sortAccounts'
import BN from 'bn.js'

describe('sortAccounts', () => {
  const emptyMap = {}

  it('empty list', () => {
    expect(sortAccounts([], emptyMap, 'name')).toEqual([])
  })

  describe('by name', () => {
    it('ascending', () => {
      const accounts = [
        { name: 'Zardoz', address: '' },
        { name: 'Bob', address: '' },
        { name: 'Anna', address: '' },
      ]
      expect(sortAccounts([...accounts], emptyMap, 'name')).toEqual([...accounts].reverse())
    })

    it('undefined is considered smaller', () => {
      const accounts = [
        { name: 'Anna', address: '' },
        { name: undefined, address: '' },
      ]
      expect(sortAccounts([...accounts], emptyMap, 'name')).toEqual([...accounts].reverse())
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
      expect(sortAccounts(accounts, emptyMap, 'name')).toEqual([
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
      expect(sortAccounts(accounts, emptyMap, 'name')).toEqual([
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
        total: new BN(1),
        locked: new BN(3),
        recoverable: new BN(1),
        transferable: new BN(11),
      },
      '1': {
        total: new BN(3),
        locked: new BN(2),
        recoverable: new BN(0),
        transferable: new BN(11),
      },
      '2': {
        total: new BN(1),
        locked: new BN(1),
        recoverable: new BN(5),
        transferable: new BN(1),
      },
      '3': {
        total: new BN(2),
        locked: new BN(6),
        recoverable: new BN(5),
        transferable: new BN(1),
      },
    }
    const anna = { name: 'Anna', address: '0' }
    const bob = { name: 'Bob', address: '1' }
    const zardoz = { name: 'Zardoz', address: '2' }
    const dwayne = { name: 'Dwayne', address: '3' }
    const accounts = [anna, bob, zardoz, dwayne]

    it('total', () => {
      expect(sortAccounts([...accounts], balances, 'total')).toEqual([anna, zardoz, dwayne, bob])
    })

    it('locked', () => {
      expect(sortAccounts([...accounts], balances, 'locked')).toEqual([zardoz, bob, anna, dwayne])
    })

    it('recoverable', () => {
      expect(sortAccounts([...accounts], balances, 'recoverable')).toEqual([bob, anna, zardoz, dwayne])
    })

    it('transferable', () => {
      expect(sortAccounts([...accounts], balances, 'transferable')).toEqual([zardoz, dwayne, anna, bob])
    })

    it('with missing balances', () => {
      const jason = { name: 'Jason', address: 'a' }
      const luke = { name: 'Luke', address: 'b' }
      const accountsWithSomeMissing = [anna, bob, jason, zardoz, dwayne, luke]
      expect(sortAccounts([...accountsWithSomeMissing], balances, 'total')).toEqual([
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
