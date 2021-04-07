import BN from 'bn.js'

import { Comparator } from '../../../src/common/model/Comparator'

type WrappedString = { name?: string; other?: number }
type WrappedBN = { bn?: BN; other?: number }
type WrappedNumber = { num?: number; other?: number }

describe('Comparator', () => {
  describe('By string', () => {
    const alice = { name: 'alice' }
    const bob = { name: 'bob' }
    const charlie = { name: 'charlie' }
    const dave = { name: 'dave' }

    it('Ascending', () => {
      const array = [alice, dave, charlie, bob]
      expect(array.sort(Comparator<WrappedString>(false, 'name').string)).toEqual([alice, bob, charlie, dave])
    })

    it('Descending', () => {
      const array = [alice, dave, charlie, bob]
      expect(array.sort(Comparator<WrappedString>(true, 'name').string)).toEqual([dave, charlie, bob, alice])
    })

    describe('With undefined values', () => {
      const johann = {}

      it('Ascending', () => {
        const array = [alice, dave, johann, charlie, bob]
        expect(array.sort(Comparator<WrappedString>(false, 'name').string)).toEqual([johann, alice, bob, charlie, dave])
      })

      it('Descending', () => {
        const array = [alice, dave, charlie, johann, bob]
        expect(array.sort(Comparator<WrappedString>(true, 'name').string)).toEqual([dave, charlie, bob, alice, johann])
      })
    })

    describe('Stable sort', () => {
      const alice1 = { ...alice, other: 1 }
      const alice2 = { ...alice, other: 2 }

      it('Ascending', () => {
        const array = [alice2, alice, dave, alice1, charlie, bob]
        expect(array.sort(Comparator<WrappedString>(false, 'name').string)).toEqual([
          alice2,
          alice,
          alice1,
          bob,
          charlie,
          dave,
        ])
      })

      it('Descending', () => {
        const array = [alice2, alice, dave, alice1, charlie, bob]
        expect(array.sort(Comparator<WrappedString>(true, 'name').string)).toEqual([
          dave,
          charlie,
          bob,
          alice2,
          alice,
          alice1,
        ])
      })
    })
  })

  describe('By BN', () => {
    const one = { bn: new BN(1) }
    const two = { bn: new BN(2) }
    const three = { bn: new BN(3) }
    const four = { bn: new BN(4) }

    it('Ascending', () => {
      const array = [one, four, three, two]
      expect(array.sort(Comparator<WrappedBN>(false, 'bn').bigNumber)).toEqual([one, two, three, four])
    })

    it('Descending', () => {
      const array = [one, four, three, two]
      expect(array.sort(Comparator<WrappedBN>(true, 'bn').bigNumber)).toEqual([four, three, two, one])
    })

    describe('With undefined values', () => {
      const empty = {}

      it('Ascending', () => {
        const array = [one, four, empty, three, two]
        expect(array.sort(Comparator<WrappedBN>(false, 'bn').bigNumber)).toEqual([empty, one, two, three, four])
      })

      it('Descending', () => {
        const array = [one, four, three, empty, two]
        expect(array.sort(Comparator<WrappedBN>(true, 'bn').bigNumber)).toEqual([four, three, two, one, empty])
      })
    })

    describe('Stable sort', () => {
      const one_other1 = { ...one, other: 1 }
      const one_other2 = { ...one, other: 2 }

      it('Ascending', () => {
        const array = [one_other2, one, four, one_other1, three, two]
        expect(array.sort(Comparator<WrappedBN>(false, 'bn').bigNumber)).toEqual([
          one_other2,
          one,
          one_other1,
          two,
          three,
          four,
        ])
      })

      it('Descending', () => {
        const array = [one_other2, one, four, one_other1, three, two]
        expect(array.sort(Comparator<WrappedBN>(true, 'bn').bigNumber)).toEqual([
          four,
          three,
          two,
          one_other2,
          one,
          one_other1,
        ])
      })
    })
  })

  describe('By number', () => {
    const one = { num: 1 }
    const two = { num: 2 }
    const three = { num: 3 }
    const four = { num: 4 }

    it('Ascending', () => {
      const array = [one, four, three, two]
      expect(array.sort(Comparator<WrappedNumber>(false, 'num').number)).toEqual([one, two, three, four])
    })

    it('Descending', () => {
      const array = [one, four, three, two]
      expect(array.sort(Comparator<WrappedNumber>(true, 'num').number)).toEqual([four, three, two, one])
    })

    describe('With undefined values', () => {
      const empty = {}

      it('Ascending', () => {
        const array = [one, four, empty, three, two]
        expect(array.sort(Comparator<WrappedNumber>(false, 'num').number)).toEqual([empty, one, two, three, four])
      })

      it('Descending', () => {
        const array = [one, four, three, empty, two]
        expect(array.sort(Comparator<WrappedNumber>(true, 'num').number)).toEqual([four, three, two, one, empty])
      })
    })

    describe('Stable sort', () => {
      const one_other1 = { ...one, other: 1 }
      const one_other2 = { ...one, other: 2 }

      it('Ascending', () => {
        const array = [one_other2, one, four, one_other1, three, two]
        expect(array.sort(Comparator<WrappedNumber>(false, 'num').number)).toEqual([
          one_other2,
          one,
          one_other1,
          two,
          three,
          four,
        ])
      })

      it('Descending', () => {
        const array = [one_other2, one, four, one_other1, three, two]
        expect(array.sort(Comparator<WrappedNumber>(true, 'num').number)).toEqual([
          four,
          three,
          two,
          one_other2,
          one,
          one_other1,
        ])
      })
    })
  })
})
