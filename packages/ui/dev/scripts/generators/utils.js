const faker = require('faker')

const randomFromRange = (min, max) => {
  return (Math.random() * (max - min) + min).toFixed()
}

const randomUniqueArrayFromRange = (currentWorkers, min, max) => {
  const set = new Set(Array.from({ length: currentWorkers }, () => randomFromRange(min, max)))
  return [...set.values()]
}

const randomMarkdown = () =>
  [
    `# ${faker.lorem.words(randomFromRange(2, 6))}`,
    faker.lorem.paragraph(),
    `## ${faker.lorem.words(randomFromRange(2, 5))}`,
    faker.lorem.paragraphs(randomFromRange(1, 3)),
  ].join('\n\n')

module.exports = {
  randomUniqueArrayFromRange,
  randomFromRange,
  randomMarkdown,
}
