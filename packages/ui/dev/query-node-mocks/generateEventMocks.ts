import yargs from 'yargs'

import { WorkerStatusType } from '@/mocks/data'

import applications from '../../src/mocks/data/raw/applications.json'
import members from '../../src/mocks/data/raw/members.json'
import openings from '../../src/mocks/data/raw/openings.json'
import proposals from '../../src/mocks/data/raw/proposals.json'
import upcomingOpenings from '../../src/mocks/data/raw/upcomingOpenings.json'
import workers from '../../src/mocks/data/raw/workers.json'
import workingGroups from '../../src/mocks/data/raw/workingGroups.json'

import { eventGenerators, generateAllEvents } from './generators/generateEvents'
import { Mocks } from './generators/types'
import { saveFile } from './helpers/saveFile'

type Event = keyof typeof eventGenerators

export const options = {
  e: {
    alias: 'eventTypes',
    type: 'array',
    describe: 'Available events: ' + Object.keys(eventGenerators).join(', '),
  } as const,
}

type CommandOptions = yargs.InferredOptionTypes<typeof options>
export type EventsArgs = yargs.Arguments<CommandOptions>

export const generateEvents = (args: EventsArgs) => {
  const mocks: Mocks = {
    applications,
    members: members as any,
    openings: openings.map((opening) => ({
      ...opening,
      metadata: {
        ...opening.metadata,
        expectedEnding: new Date(opening.metadata.expectedEnding),
      },
    })),
    upcomingOpenings,
    proposals: proposals as any,
    workers: workers.map((worker) => ({
      ...worker,
      createdAt: new Date(worker.createdAt),
      status: {
        event: worker.status.event,
        type: worker.status.type as WorkerStatusType,
      },
    })),
    workingGroups,
  }

  const distinctParams = [...new Set(args.e)]

  let newMocks: { [key: string]: any[] } = {}

  if (!distinctParams.length) {
    newMocks = generateAllEvents(mocks)
  } else {
    const eventTypes = distinctParams
      .map((type) => type.toString())
      .filter((type) => type in eventGenerators) as Event[]

    eventTypes.forEach((type) => {
      const t = type as keyof typeof eventGenerators
      newMocks[type] = eventGenerators[t](mocks)
    })
  }

  Object.entries(newMocks).forEach(([fileName, contents]) => saveFile(fileName, contents))
}

export const eventsModule = {
  command: 'events',
  describe: 'Generate events from other mocks',
  handler: generateEvents,
  builder: (argv: yargs.Argv<unknown>) => argv.options(options),
}
