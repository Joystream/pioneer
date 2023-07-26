import { Meta, StoryObj } from '@storybook/react'

import { joy } from '@/mocks/helpers'
import { MocksParameters } from '@/mocks/providers'

import { ValidatorList } from './ValidatorList'

type Args = object

export default {
  title: 'Pages/Validators/ValidatorList',
  component: ValidatorList,

  parameters: {
    mocks: (): MocksParameters => {
      return {
        chain: {
          derive: {
            staking: {
              erasRewards: [
                { era: 688, eraReward: joy(0.123456) },
                { era: 689, eraReward: joy(0.123456) },
                { era: 690, eraReward: joy(0.123456) },
                { era: 691, eraReward: joy(0.123456) },
                { era: 692, eraReward: joy(0.123456) },
                { era: 693, eraReward: joy(0.123456) },
                { era: 694, eraReward: joy(0.123456) },
                { era: 695, eraReward: joy(0.123456) },
                { era: 696, eraReward: joy(0.123456) },
                { era: 697, eraReward: joy(0.123456) },
                { era: 698, eraReward: joy(0.123456) },
                { era: 699, eraReward: joy(0.123456) },
                { era: 700, eraReward: joy(0.123456) },
              ],
              stakerRewards: [
                {
                  eraReward: joy(0.7),
                },
                {
                  eraReward: joy(0.79),
                },
                {
                  eraReward: joy(0.3),
                },
                {
                  eraReward: joy(0.8),
                },
              ],
            },
          },
          query: {
            balances: {
              totalIssuance: joy(1000000),
            },
            timestamp: { now: Date.now() },
            session: {
              validators: [
                'j4RLnWh3DWgc9u4CMprqxfBhq3kthXhvZDmnpjEtETFVm446D',
                'j4RbTjvPyaufVVoxVGk5vEKHma1k7j5ZAQCaAL9qMKQWKAswW',
                'j4Rc8VUXGYAx7FNbVZBFU72rQw3GaCuG2AkrUQWnWTh5SpemP',
                'j4Rh1cHtZFAQYGh7Y8RZwoXbkAPtZN46FmuYpKNiR3P2Dc2oz',
                'j4RjraznxDKae1aGL2L2xzXPSf8qCjFbjuw9sPWkoiy1UqWCa',
                'j4RuqkJ2Xqf3NTVRYBUqgbatKVZ31mbK59fWnq4ZzfZvhbhbN',
                'j4RxTMa1QVucodYPfQGA2JrHxZP944dfJ8qdDDYKU4QbJCWNP',
                'j4Rxkb1w9yB6WXroB2npKjRJJxwxbD8JjSQwMZFB31cf5aZAJ',
                'j4RyLBbSUBvipuQLkjLyUGeFWEzmrnfYdpteDa2gYNoM13qEg',
                'j4S998Thq5kQHyurofh8QfHrcFN2c1T19gTdMGUVVx5EHKgky',
              ],
            },
            staking: {
              activeEra: {
                index: 700,
                start: Date.now() - 5400000,
              },
              counterForValidators: 12,
              counterForNominators: 20,
              erasRewardPoints: {
                total: 18000,
                individuals: {
                  j4RLnWh3DWgc9u4CMprqxfBhq3kthXhvZDmnpjEtETFVm446D: 180,
                  j4RbTjvPyaufVVoxVGk5vEKHma1k7j5ZAQCaAL9qMKQWKAswW: 200,
                  j4Rc8VUXGYAx7FNbVZBFU72rQw3GaCuG2AkrUQWnWTh5SpemP: 280,
                  j4Rh1cHtZFAQYGh7Y8RZwoXbkAPtZN46FmuYpKNiR3P2Dc2oz: 200,
                  j4RjraznxDKae1aGL2L2xzXPSf8qCjFbjuw9sPWkoiy1UqWCa: 160,
                  j4RuqkJ2Xqf3NTVRYBUqgbatKVZ31mbK59fWnq4ZzfZvhbhbN: 180,
                  j4RxTMa1QVucodYPfQGA2JrHxZP944dfJ8qdDDYKU4QbJCWNP: 140,
                  j4Rxkb1w9yB6WXroB2npKjRJJxwxbD8JjSQwMZFB31cf5aZAJ: 160,
                  j4RyLBbSUBvipuQLkjLyUGeFWEzmrnfYdpteDa2gYNoM13qEg: 160,
                  j4S998Thq5kQHyurofh8QfHrcFN2c1T19gTdMGUVVx5EHKgky: 220,
                },
              },
              erasValidatorReward: joy(0.123456),
              erasStakers: {
                total: joy(0.1),
                own: joy(0.0001),
                others: [
                  { who: 'j4WGdFxqTkyAgzJiTbEBeRseP12dPEvJgf2Wy9qkPa68XSP55', value: joy(0.2) },
                  { who: 'j4UQEfPFnKwGuHytxs9YEouLnhnSNkPDgNm9tKeB7an3dRaiy', value: joy(0.2) },
                  { who: 'j4WwTZ3fnkoXJw3D1vGVyymjaiLxM78TGyAAX41JRH8Kx6T2u', value: joy(0.2) },
                  { who: 'j4WqZwj6KjB4DbxknxyJB1ZkeVrPRGmg6DUGw2YkuAy7jUERg', value: joy(0.2) },
                  { who: 'j4WwTZ3fnkoXJw3D1vGVyymjaiLxM78TGyAAX41JRH8Kx6T2u', value: joy(0.2) },
                  { who: 'j4Wo9377XBAvhmB35J4TkpJUHnUKmyccXhGtHCVvi6pPr9so8', value: joy(0.2) },
                  { who: 'j4WwTZ3fnkoXJw3D1vGVyymjaiLxM78TGyAAX41JRH8Kx6T2u', value: joy(0.2) },
                  { who: 'j4WfB3TD4tFgrJpCmUi8P3wPp3EocyC5At9ZM2YUpmKGJ1FWM', value: joy(0.2) },
                  { who: 'j4WwTZ3fnkoXJw3D1vGVyymjaiLxM78TGyAAX41JRH8Kx6T2u', value: joy(0.2) },
                  { who: 'j4T3XgRMUaZZL6GsMk6RXfBcjuMWxfSLnoATYkBTHh7xyjmoH', value: joy(0.2) },
                  { who: 'j4W2bw7ggG69e9TZ77RP9mjem1GrbPwpbKYK7WdZiym77yzMJ', value: joy(0.2) },
                  { who: 'j4UzoJUhDGpnsCWrmx9ojofwaT8KHz3azp8C1S49MSN6rYjim', value: joy(0.2) },
                  { who: 'j4ShWRXxTG4K5Q5H7KXmdWN8HnaaLwppqM7GdiSwAy3eTLsJt', value: joy(0.2) },
                  { who: 'j4SgrgDrzzGyfrxPe4ZgaKfByKyLo5SdsUXNfHzZJPh5R6f8q', value: joy(0.2) },
                  { who: 'j4RLnWh3DWgc9u4CMprqxfBhq3kthXhvZDmnpjEtETFVm446D', value: joy(0.2) },
                  { who: 'j4SgrgDrzzGyfrxPe4ZgaKfByKyLo5SdsUXNfHzZJPh5R6f8q', value: joy(0.2) },
                  { who: 'j4RxTMa1QVucodYPfQGA2JrHxZP944dfJ8qdDDYKU4QbJCWNP', value: joy(0.2) },
                  { who: 'j4Rxkb1w9yB6WXroB2npKjRJJxwxbD8JjSQwMZFB31cf5aZAJ', value: joy(0.2) },
                  { who: 'j4RyLBbSUBvipuQLkjLyUGeFWEzmrnfYdpteDa2gYNoM13qEg', value: joy(0.2) },
                  { who: 'j4S998Thq5kQHyurofh8QfHrcFN2c1T19gTdMGUVVx5EHKgky', value: joy(0.2) },
                ],
              },
              erasTotalStake: joy(130_000),
              validators: {
                entries: [
                  ['j4RLnWh3DWgc9u4CMprqxfBhq3kthXhvZDmnpjEtETFVm446D'],
                  ['j4RbTjvPyaufVVoxVGk5vEKHma1k7j5ZAQCaAL9qMKQWKAswW'],
                  ['j4Rc8VUXGYAx7FNbVZBFU72rQw3GaCuG2AkrUQWnWTh5SpemP'],
                  ['j4Rh1cHtZFAQYGh7Y8RZwoXbkAPtZN46FmuYpKNiR3P2Dc2oz'],
                  ['j4RjraznxDKae1aGL2L2xzXPSf8qCjFbjuw9sPWkoiy1UqWCa'],
                  ['j4RuqkJ2Xqf3NTVRYBUqgbatKVZ31mbK59fWnq4ZzfZvhbhbN'],
                  ['j4RxTMa1QVucodYPfQGA2JrHxZP944dfJ8qdDDYKU4QbJCWNP'],
                  ['j4Rxkb1w9yB6WXroB2npKjRJJxwxbD8JjSQwMZFB31cf5aZAJ'],
                  ['j4RyLBbSUBvipuQLkjLyUGeFWEzmrnfYdpteDa2gYNoM13qEg'],
                  ['j4S998Thq5kQHyurofh8QfHrcFN2c1T19gTdMGUVVx5EHKgky'],
                  ['j4ShWRXxTG4K5Q5H7KXmdWN8HnaaLwppqM7GdiSwAy3eTLsJt'],
                  ['j4WfB3TD4tFgrJpCmUi8P3wPp3EocyC5At9ZM2YUpmKGJ1FWM'],
                ],
                commission: joy(0.0000011),
                blocked: false,
              },
            },
          },
        },
      }
    },
  },
} satisfies Meta<Args>

type Story = StoryObj<typeof ValidatorList>

export const StatisticsAndLists: Story = {}
