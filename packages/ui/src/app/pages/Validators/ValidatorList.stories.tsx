import { expect } from '@storybook/jest'
import { Meta, StoryObj } from '@storybook/react'
import { userEvent, waitFor, within } from '@storybook/testing-library'

import { GetMembersWithDetailsDocument } from '@/memberships/queries'
import { member } from '@/mocks/data/members'
import { joy, selectFromDropdown } from '@/mocks/helpers'
import { MocksParameters } from '@/mocks/providers'

import { ValidatorList } from './ValidatorList'

type Args = object

const validators = {
  j4RLnWh3DWgc9u4CMprqxfBhq3kthXhvZDmnpjEtETFVm446D: {
    commission: 0.05 * 10 ** 9,
    totalStake: joy(400),
    ownStake: joy(0.0001),
    nominators: {
      j4WGdFxqTkyAgzJiTbEBeRseP12dPEvJgf2Wy9qkPa68XSP55: { stake: joy(0.2) },
      j4UQEfPFnKwGuHytxs9YEouLnhnSNkPDgNm9tKeB7an3dRaiy: { stake: joy(0.2) },
    },
  },
  j4RbTjvPyaufVVoxVGk5vEKHma1k7j5ZAQCaAL9qMKQWKAswW: {
    commission: 0.1 * 10 ** 9,
    totalStake: joy(400),
    ownStake: joy(0.0001),
    nominators: {
      j4T3XgRMUaZZL6GsMk6RXfBcjuMWxfSLnoATYkBTHh7xyjmoH: { stake: joy(0.2) },
      j4UQEfPFnKwGuHytxs9YEouLnhnSNkPDgNm9tKeB7an3dRaiy: { stake: joy(0.2) },
      j4W2bw7ggG69e9TZ77RP9mjem1GrbPwpbKYK7WdZiym77yzMJ: { stake: joy(0.2) },
      j4UzoJUhDGpnsCWrmx9ojofwaT8KHz3azp8C1S49MSN6rYjim: { stake: joy(0.2) },
    },
  },
  j4Rc8VUXGYAx7FNbVZBFU72rQw3GaCuG2AkrUQWnWTh5SpemP: {
    commission: 0.05 * 10 ** 9,
    totalStake: joy(400),
    ownStake: joy(0.0001),
    nominators: {
      j4SgrgDrzzGyfrxPe4ZgaKfByKyLo5SdsUXNfHzZJPh5R6f8q: { stake: joy(0.2) },
      j4UQEfPFnKwGuHytxs9YEouLnhnSNkPDgNm9tKeB7an3dRaiy: { stake: joy(0.2) },
      j4RLnWh3DWgc9u4CMprqxfBhq3kthXhvZDmnpjEtETFVm446D: { stake: joy(0.2) },
      j4RxTMa1QVucodYPfQGA2JrHxZP944dfJ8qdDDYKU4QbJCWNP: { stake: joy(0.2) },
    },
  },
  j4Rh1cHtZFAQYGh7Y8RZwoXbkAPtZN46FmuYpKNiR3P2Dc2oz: {
    commission: 0.15 * 10 ** 9,
    totalStake: joy(400),
    ownStake: joy(0.0001),
    nominators: {
      j4Rxkb1w9yB6WXroB2npKjRJJxwxbD8JjSQwMZFB31cf5aZAJ: { stake: joy(0.2) },
      j4UQEfPFnKwGuHytxs9YEouLnhnSNkPDgNm9tKeB7an3dRaiy: { stake: joy(0.2) },
      j4RyLBbSUBvipuQLkjLyUGeFWEzmrnfYdpteDa2gYNoM13qEg: { stake: joy(0.2) },
    },
  },
  j4RjraznxDKae1aGL2L2xzXPSf8qCjFbjuw9sPWkoiy1UqWCa: {
    commission: 0.2 * 10 ** 9,
    totalStake: joy(400),
    ownStake: joy(0.0001),
    nominators: {
      j4WwTZ3fnkoXJw3D1vGVyymjaiLxM78TGyAAX41JRH8Kx6T2u: { stake: joy(0.2) },
      j4UQEfPFnKwGuHytxs9YEouLnhnSNkPDgNm9tKeB7an3dRaiy: { stake: joy(0.2) },
      j4WqZwj6KjB4DbxknxyJB1ZkeVrPRGmg6DUGw2YkuAy7jUERg: { stake: joy(0.2) },
      j4Wo9377XBAvhmB35J4TkpJUHnUKmyccXhGtHCVvi6pPr9so8: { stake: joy(0.2) },
    },
  },
  j4RuqkJ2Xqf3NTVRYBUqgbatKVZ31mbK59fWnq4ZzfZvhbhbN: {
    commission: 0.01 * 10 ** 9,
    totalStake: joy(400),
    ownStake: joy(0.0001),
  },
  j4RxTMa1QVucodYPfQGA2JrHxZP944dfJ8qdDDYKU4QbJCWNP: {
    commission: 0.03 * 10 ** 9,
    totalStake: joy(400),
    ownStake: joy(0.0001),
  },
  j4Rxkb1w9yB6WXroB2npKjRJJxwxbD8JjSQwMZFB31cf5aZAJ: {
    commission: 0.05 * 10 ** 9,
    totalStake: joy(400),
    ownStake: joy(0.0001),
  },
  j4RyLBbSUBvipuQLkjLyUGeFWEzmrnfYdpteDa2gYNoM13qEg: {
    commission: 0.05 * 10 ** 9,
    totalStake: joy(400),
    ownStake: joy(0.0001),
  },
}

const activeEra = {
  index: 700,
  start: Date.now() - 5400000,
  points: 18_000,
  stakers: (address: keyof typeof validators) => {
    const validator = validators[address]
    const nominators = 'nominators' in validator ? validator.nominators : []
    const others = Object.entries(nominators).map(([who, data]) => ({ who, value: data.stake }))
    return { total: validator.totalStake, own: validator.ownStake, others }
  },
}

const mocksValidatorsPoints = (...validatorIndexes: number[]) => {
  const addresses = Object.keys(validators)
  return Object.fromEntries(validatorIndexes.map((index) => [addresses[index], Math.floor(Math.random() * 800 + 200)]))
}
const pastEras = {
  688: { eraReward: joy(0.123456), eraPoints: 18_000, validators: mocksValidatorsPoints(0, 1, 2, 3) },
  689: { eraReward: joy(0.123456), eraPoints: 18_000, validators: mocksValidatorsPoints(2, 3, 4) },
  690: { eraReward: joy(0.123456), eraPoints: 18_000, validators: mocksValidatorsPoints(1, 2, 3) },
  691: { eraReward: joy(0.123456), eraPoints: 18_000, validators: mocksValidatorsPoints(0, 1, 3, 4) },
  692: { eraReward: joy(0.123456), eraPoints: 18_000, validators: mocksValidatorsPoints(1, 3, 4) },
  693: { eraReward: joy(0.123456), eraPoints: 18_000, validators: mocksValidatorsPoints(0, 1, 3, 4) },
  694: { eraReward: joy(0.123456), eraPoints: 18_000, validators: mocksValidatorsPoints(1, 3, 4) },
  695: { eraReward: joy(0.123456), eraPoints: 18_000, validators: mocksValidatorsPoints() },
  696: { eraReward: joy(0.123456), eraPoints: 18_000, validators: mocksValidatorsPoints(1) },
  697: { eraReward: joy(0.123456), eraPoints: 18_000, validators: mocksValidatorsPoints(1, 2, 4) },
  698: { eraReward: joy(0.123456), eraPoints: 18_000, validators: mocksValidatorsPoints(0, 1, 2, 3, 4) },
  699: { eraReward: joy(0.123456), eraPoints: 18_000, validators: mocksValidatorsPoints(1, 2, 3, 4) },
}

export default {
  title: 'Pages/Validators/ValidatorList',
  component: ValidatorList,

  parameters: {
    mocks: (): MocksParameters => {
      return {
        chain: {
          derive: {
            staking: {
              erasRewards: Object.entries(pastEras).map(([era, data]) => ({ era, eraReward: data.eraReward })),
              erasPoints: Object.entries(pastEras).map(([era, data]) => ({
                era,
                eraPoints: data.eraPoints,
                validators: data.validators,
              })),
            },
          },

          query: {
            balances: {
              totalIssuance: joy(1000000),
            },

            session: {
              validators: Object.entries(validators).flatMap(([address, data]) =>
                'nominators' in data ? address : []
              ),
            },

            staking: {
              validators: {
                entries: Object.entries(validators).map(([address, { commission }]) => [
                  { args: [address] },
                  { commission, blocked: false },
                ]),
              },
              bonded: { multi: Object.keys(validators) },

              activeEra: {
                index: activeEra.index,
                start: activeEra.start,
              },
              erasRewardPoints: new Map([[activeEra.index, { total: activeEra.points }]]),
              erasStakers: (_: any, address: keyof typeof validators) => activeEra.stakers(address),
              counterForNominators: 20,

              erasTotalStake: joy(130_000),

              slashingSpans: {
                spanIndex: 18,
                lastStart: 1331,
                lastNonzeroSlash: 0,
                prior: [70, 1, 164],
              },
            },
          },
        },

        gql: {
          queries: [
            {
              query: GetMembersWithDetailsDocument,
              data: { memberships: [member('alice'), member('bob'), member('charlie'), member('dave')] },
            },
          ],
        },
      }
    },
  },
} satisfies Meta<Args>

type Story = StoryObj<typeof ValidatorList>

export const StatisticsAndLists: Story = {}

export const TestsFilters: Story = {
  play: async ({ canvasElement, step }) => {
    const screen = within(canvasElement)

    const searchElement = screen.getByPlaceholderText('Search')
    const verificationFilter = screen.getAllByText('Verification')[0]
    const stateFilter = screen.getAllByText('State')[0]

    await step('Verifcation Filter', async () => {
      await selectFromDropdown(screen, verificationFilter, 'verified')
      await waitFor(() => expect(screen.queryAllByRole('button', { name: 'Nominate' })).toHaveLength(3))
      expect(screen.queryByText('unverifed')).toBeNull()
      expect(screen.getAllByText('alice').length).toEqual(2)
      expect(screen.queryByText('bob')).toBeNull()
      await selectFromDropdown(screen, verificationFilter, 'unverified')
      await waitFor(() => expect(screen.queryAllByRole('button', { name: 'Nominate' })).toHaveLength(6))
      expect(screen.queryByText('verifed')).toBeNull()
      expect(screen.queryByText('alice')).toBeNull()
      expect(screen.getByText('bob'))
      await selectFromDropdown(screen, verificationFilter, 'All')
    })
    await step('State Filter', async () => {
      await selectFromDropdown(screen, stateFilter, 'active')
      await waitFor(() => expect(screen.queryAllByRole('button', { name: 'Nominate' })).toHaveLength(5))
      expect(screen.queryByText('waiting')).toBeNull()
      await selectFromDropdown(screen, stateFilter, 'waiting')
      await waitFor(() => expect(screen.queryAllByRole('button', { name: 'Nominate' })).toHaveLength(4))
      expect(screen.queryByText('active')).toBeNull()
      await selectFromDropdown(screen, stateFilter, 'All')
    })
    await step('Search', async () => {
      await userEvent.type(searchElement, 'j4Rh1c')
      await waitFor(async () => {
        await userEvent.type(searchElement, '{enter}')
        expect(screen.queryAllByRole('button', { name: 'Nominate' })).toHaveLength(1)
      })
      expect(screen.queryByText('alice'))
      await userEvent.clear(searchElement)
      await userEvent.type(searchElement, 'j4R')
      await waitFor(async () => {
        await userEvent.type(searchElement, '{enter}')
        expect(screen.queryAllByRole('button', { name: 'Nominate' })).toHaveLength(7)
      })
      expect(screen.queryByText('bob'))
      expect(screen.queryByText('dave'))
    })

    await step('Clear Filter', async () => {
      await selectFromDropdown(screen, verificationFilter, 'verified')
      expect(screen.queryByText('Clear all filters'))
      await selectFromDropdown(screen, stateFilter, 'active')
      await waitFor(() => expect(screen.queryAllByRole('button', { name: 'Nominate' })).toHaveLength(3))
      await userEvent.click(screen.getByText('Clear all filters'))
      await waitFor(() => expect(screen.queryAllByRole('button', { name: 'Nominate' })).toHaveLength(7))
      await userEvent.type(searchElement, 'alice{enter}')
      await waitFor(() => expect(screen.queryAllByRole('button', { name: 'Nominate' })).toHaveLength(2))
      expect(screen.queryByText('Clear all filters'))
      await userEvent.click(screen.getByText('Clear all filters'))
      await waitFor(() => expect(screen.queryAllByRole('button', { name: 'Nominate' })).toHaveLength(7))
    })

    await step('Sort', async () => {
      await userEvent.click(screen.getByText('Commission'))
      await waitFor(async () => {
        const firstRow = (await screen.getAllByRole('button', { name: 'Nominate' }))[0].parentElement
        expect(within(firstRow as HTMLElement).queryByText('20%'))
      })
      await userEvent.click(screen.getByText('Commission'))
      await waitFor(async () => {
        const firstRow = (await screen.getAllByRole('button', { name: 'Nominate' }))[0].parentElement
        expect(within(firstRow as HTMLElement).queryByText('1%'))
      })
    })
  },
}
