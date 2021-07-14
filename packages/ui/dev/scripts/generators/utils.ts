import faker from 'faker'

import { Reducer } from '../../../src/common/types/helpers'
import { repeat } from '../../../src/common/utils'

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
