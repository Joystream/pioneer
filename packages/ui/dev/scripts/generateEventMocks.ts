import yargs from "yargs";

import applications from '../../src/mocks/data/raw/applications.json'
import members from '../../src/mocks/data/raw/members.json'
import openings from '../../src/mocks/data/raw/openings.json'
import proposals from '../../src/mocks/data/raw/proposals.json'
import workers from '../../src/mocks/data/raw/workers.json'
import workingGroups from '../../src/mocks/data/raw/workingGroups.json'
import upcomingOpenings from '../../src/mocks/data/raw/upcomingOpenings.json'
import {Mocks} from "./generators/types";
import {eventGenerators, generateAllEvents} from "./generators/generateEvents";
import {saveFile} from "./helpers/saveFile";

function main() {
  const argv = yargs(process.argv.slice(2))
    .scriptName('events:generate')
    .usage('yarn events:generate --eventTypes [eventType[, anotherEventType[, ...]]')
    .array('eventTypes')
    .argv

  const mocks: Mocks = {
    applications,
    members,
    openings: openings.map(opening => ({
      ...opening,
      metadata: {
        ...opening.metadata,
        expectedEnding: new Date(opening.metadata.expectedEnding),
      }
    })),
    upcomingOpenings,
    proposals,
    workers: workers.map(worker => ({
      ...worker,
      createdAt: new Date(worker.createdAt),
    })),
    workingGroups,
  }

  const distinctParams = [...new Set(argv.eventTypes)]
  const eventTypes = distinctParams.map(type => type.toString()).filter(type => type in eventGenerators)

  let newMocks: { [key: string]: any[] } = {}

  if (eventTypes === undefined) {
    newMocks = generateAllEvents(mocks)
  } else {
    eventTypes.forEach((type) => {
      const t = type as keyof typeof eventGenerators
      newMocks[type] = eventGenerators[t](mocks)
    })
  }

  Object.entries(newMocks).forEach(([fileName, contents]) => saveFile(fileName, contents))
}

main()
