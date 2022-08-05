import BN from 'bn.js'

import { sortAccounts } from '@/accounts/model/sortAccounts'

import { mockDefaultBalance } from '../../setup'

describe('sortAccounts', () => {
  const emptyMap = {}

  it('Empty list', () => {
    expect(sortAccounts([], emptyMap, 'name')).toEqual([])
  })

  describe('By name', () => {
    describe('Ascending', () => {
      it('Simple', () => {
        const accounts = [
          { name: 'Zardoz', address: '' },
          { name: 'Bob', address: '' },
          { name: 'Anna', address: '' },
        ]
        expect(sortAccounts([...accounts], emptyMap, 'name')).toEqual([...accounts].reverse())
      })

      it('Undefined is considered smaller', () => {
        const accounts = [
          { name: 'Anna', address: '' },
          { name: undefined, address: '' },
        ]
        expect(sortAccounts([...accounts], emptyMap, 'name')).toEqual([...accounts].reverse())
      })

      it('Stable (repeating values)', () => {
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

      it('Stable sort of undefined names', () => {
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

    describe('Descending', () => {
      it('Simple', () => {
        const accounts = [
          { name: 'Anna', address: '' },
          { name: 'Bob', address: '' },
          { name: 'Zardoz', address: '' },
        ]
        expect(sortAccounts([...accounts], emptyMap, 'name', true)).toEqual([...accounts].reverse())
      })

      it('Stable (repeating values)', () => {
        const accounts = [
          { name: 'Bob', address: '0' },
          { name: 'Zardoz', address: '' },
          { name: 'Bob', address: '1' },
          { name: 'Bob', address: '2' },
          { name: 'Anna', address: '' },
          { name: 'Bob', address: '3' },
        ]
        expect(sortAccounts(accounts, emptyMap, 'name', true)).toEqual([
          { name: 'Zardoz', address: '' },
          { name: 'Bob', address: '0' },
          { name: 'Bob', address: '1' },
          { name: 'Bob', address: '2' },
          { name: 'Bob', address: '3' },
          { name: 'Anna', address: '' },
        ])
      })
    })
  })

  describe('By balance', () => {
    const balances = {
      '0': {
        ...mockDefaultBalance,
        total: new BN(1),
        locked: new BN(3),
        recoverable: new BN(1),
        transferable: new BN(11),
      },
      '1': {
        ...mockDefaultBalance,
        total: new BN(3),
        locked: new BN(2),
        transferable: new BN(11),
      },
      '2': {
        ...mockDefaultBalance,
        total: new BN(1),
        locked: new BN(1),
        recoverable: new BN(5),
        transferable: new BN(1),
      },
      '3': {
        ...mockDefaultBalance,
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

    describe('Ascending', () => {
      it('Total', () => {
        expect(sortAccounts([...accounts], balances, 'total')).toEqual([anna, zardoz, dwayne, bob])
      })

      it('Locked', () => {
        expect(sortAccounts([...accounts], balances, 'locked')).toEqual([zardoz, bob, anna, dwayne])
      })

      it('Recoverable', () => {
        expect(sortAccounts([...accounts], balances, 'recoverable')).toEqual([bob, anna, zardoz, dwayne])
      })

      it('Transferable', () => {
        expect(sortAccounts([...accounts], balances, 'transferable')).toEqual([zardoz, dwayne, anna, bob])
      })

      it('With missing balances', () => {
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

    describe('Descending', () => {
      it('Simple', () => {
        expect(sortAccounts([...accounts], balances, 'locked', true)).toEqual([dwayne, anna, bob, zardoz])
      })

      it('Stable (repeating values)', () => {
        expect(sortAccounts([...accounts], balances, 'recoverable', true)).toEqual([zardoz, dwayne, anna, bob])
      })
    })
  })
})
