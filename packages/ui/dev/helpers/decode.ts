import * as MetaClasses from '@joystream/metadata-protobuf'
import { AnyMetadataClass } from '@joystream/metadata-protobuf/types'
import { createType } from '@joystream/types'
import chalk from 'chalk'
import yargs from 'yargs'

import { metadataFromBytes } from '../../src/common/model/JoystreamNode'

const MetaClassAliases = {
  post: 'ForumPostMetadata',
  opening: 'OpeningMetadata',
  thread: 'ForumThreadMetadata',
  bounty: 'BountyMetadata',
  candidacy: 'CouncilCandidacyNoteMetadata',
  candidate: 'CouncilCandidacyNoteMetadata',
  application: 'ApplicationMetadata',
  member: 'MembershipMetadata',
  membership: 'MembershipMetadata',
} as Record<string, keyof typeof MetaClasses>

const options = {
  type: { type: 'string', alias: 't', example: ['text', 'post', 'ForumPostMetadata'], default: 'text' },
  value: { type: 'string', alias: 'v', demand: true },
} as const

type CommandOptions = yargs.InferredOptionTypes<typeof options>
type Args = yargs.Arguments<CommandOptions>

const decode = (type: string, value: string): string => {
  if (type === 'text') {
    return createType('Text', value).toHuman()
  } else {
    const metaType = (MetaClassAliases[type as any] ?? type) as keyof typeof MetaClasses
    const metadata = metadataFromBytes(MetaClasses[metaType] as AnyMetadataClass<any>, value)
    return `${metaType} ${JSON.stringify(metadata, null, 2)}`
  }
}
const handler = ({ type, value }: Args) => {
  process.stdout.write(chalk.green(decode(type, value)) + '\n')
}

export const decodeModule = {
  command: 'decode',
  describe: 'Decode chain data',
  handler,
  builder: (argv: yargs.Argv<unknown>) => argv.options(options),
}
