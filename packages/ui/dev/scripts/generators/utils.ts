import faker from 'faker'

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
