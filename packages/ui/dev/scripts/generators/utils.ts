import faker from 'faker'

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

export const randomsFromWeightedSet = <T extends any>(weightedList: [number, T][], count: number): T[] => {
  const total = weightedList.map(([weight]) => weight).reduce((a, b) => a + b)
  const randomSequence = repeat(() => Math.random() * total, count).sort()

  const get = (values: T[], acc: number, rands: number[], remain: [number, T][]): T[] => {
    const [[weight, value], ...rest] = remain
    if (rest.length && acc + weight < rands[0]) {
      return get(values, acc + weight, rands, rest)
    } else {
      const result = [...values, value]
      return rands.length ? get(result, acc, rands.slice(1), remain) : result
    }
  }

  return get([], 0, randomSequence, weightedList)
}

export const randomFromWeightedSet = <T extends any>(weightedList: [number, T][]): T =>
  randomsFromWeightedSet(weightedList, 1)[0]
