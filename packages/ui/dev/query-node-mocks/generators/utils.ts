import faker from 'faker'

import { Reducer } from '../../../src/common/types/helpers'
import { repeat } from '../../../src/common/utils'

import { MemberMock } from './generateMembers'

export { repeat }

export const randomFromRange = (min: number, max: number) => {
  return parseInt((Math.random() * (max - min) + min).toFixed())
}

export const randomUniqueArrayFromRange = (size: number, min: number, max: number) => {
  const set = new Set(Array.from({ length: size }, () => randomFromRange(min, max)))
  return [...set.values()]
}

export const randomMarkdown = () =>
  [
    `# ${faker.lorem.words(randomFromRange(2, 6))}`,
    faker.lorem.paragraph(),
    `## ${faker.lorem.words(randomFromRange(2, 5))}`,
    faker.lorem.paragraphs(randomFromRange(1, 3)),
  ].join('\n\n')

const weightsToLevels: Reducer<number[], [number, any]> = (prevs: number[], [weight]): number[] => [
  weight + (prevs[0] ?? 0),
  ...prevs,
]
export const randomsFromWeightedSet = <T extends any>(...weightedList: [number, T][]): ((count: number) => T[]) => {
  const [max, ...levels] = weightedList.reduce(weightsToLevels, [])
  return (count) =>
    repeat(() => {
      const rand = Math.random() * max
      const index = levels.findIndex((level) => rand > level)
      return weightedList[index < 0 ? 0 : weightedList.length - (index + 1)][1]
    }, count)
}

export const randomFromWeightedSet = <T extends any>(...weightedList: [number, T][]): (() => T) => {
  const get = randomsFromWeightedSet(...weightedList)
  return () => get(1)[0]
}

const randomMdTags = randomsFromWeightedSet([4, 'pargraph'], [1, 'code'], [1, 'quote'], [1, 'list'])

const tagToRandomMarkdown = (tag: string): string => {
  switch (tag) {
    case 'code': {
      const tag = '```'
      return `${tag}\n${faker.lorem.paragraph()}\n${tag}`
    }
    case 'quote':
      return `> ${faker.lorem.sentence()}`
    case 'list':
      return repeat(() => `- ${faker.lorem.sentence()}`, randomFromRange(1, 5)).join('\n')
    default:
      return faker.lorem.paragraph()
  }
}

export const randomMessage = () => randomMdTags(randomFromRange(1, 3)).map(tagToRandomMarkdown).join('\n\n')

export const shuffle = <T>(arr: Array<T>) => {
  arr.forEach((_, index, array) => {
    const randomIndex = randomFromRange(0, array.length - 1)
    ;[array[index], array[randomIndex]] = [array[randomIndex], array[index]]
  })
  return arr
}

export const randomMember = (mockMembers: MemberMock[]) => mockMembers[randomFromRange(0, mockMembers.length - 1)]

export const memberAt = (mockMembers: MemberMock[], index: number) => mockMembers[index]

export const randomBlock = (date?: Date) => ({
  inBlock: faker.datatype.number(100000),
  createdAt: (date ?? faker.date.recent(180)).toJSON(),
  network: 'OLYMPIA',
})

export const randomInlineBlockData = <T extends string>(prefix: T, date?: Date) => {
  const block = randomBlock(date)
  return {
    [`${prefix}Block`]: block.inBlock,
    [`${prefix}Time`]: block.createdAt,
    [`${prefix}Network`]: block.network,
  } as Record<`${T}Block`, number> & Record<`${T}Time` | `${T}Network`, string>
}
