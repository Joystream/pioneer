import { readFileSync, writeFileSync } from 'fs'

import { DeepMerger } from '@apollo/client/utilities'
import yargs from 'yargs'

import { capitalizeFirstLetter } from '../../src/common/helpers'
import { isDefined } from '../../src/common/utils'
import rawCandidates from '../../src/mocks/data/raw/candidates.json'
import rawMembers from '../../src/mocks/data/raw/members.json'

import configs from './configs'

const members = rawMembers.map((member) => ({
  member_id: Number(member.id),
  root_account: member.rootAccount,
  controller_account: member.controllerAccount,
  handle: member.handle,
  avatar_uri: 'foo',
  about: member.metadata.about,
  name: member.metadata.name,
}))

const CYCLE_ID = 4
const ELECTION_ROUND_ID = String(CYCLE_ID)
const candidates = rawCandidates
  .filter((candidate) => candidate.electionRoundId === ELECTION_ROUND_ID)
  .map((candidate) => [
    Number(candidate.memberId),
    {
      staking_account_id: candidate.stakingAccountId,
      reward_account_id: candidate.rewardAccountId,
      cycle_id: CYCLE_ID,
      stake: candidate.stake,
      vote_power: 0,
      note_hash: null,
    },
  ])

const DefaultDurations = { voting: 5, revealing: 7 }

type ReferendumStage<T extends any> = T extends Record<'Voting', infer U> | Record<'Revealing', infer V>
  ? { [k in 'Voting' | 'Revealing']?: U & V }
  : never
const asReferendumStage = <T>(x: T) => (x as unknown) as ReferendumStage<T>

const handlerFor = (stage: 'announcing' | 'voting' | 'revealing') => (args: any) => {
  const merger = new DeepMerger()
  const pathName = `${__dirname}/data/chain-spec.json`
  const oldSpec = JSON.parse(readFileSync(pathName, 'utf8'))
  const config = configs[stage]

  const councilStageConf = config.genesis.runtime.council.stage.stage
  const referendumStageConf = asReferendumStage(config.genesis.runtime.referendumInstance1.stage)

  // Reset stages
  oldSpec.genesis.runtime.council.stage.stage = {}
  oldSpec.genesis.runtime.referendumInstance1.stage = {}

  // Set members
  oldSpec.genesis.runtime.membership.members = members

  if (stage === 'voting' || stage === 'revealing') {
    // Set candidates (on Voting and Revealing stage)
    if (councilStageConf.Election) {
      oldSpec.genesis.runtime.council.candidates = candidates
      councilStageConf.Election.candidates_count = candidates.length
    }

    // Set stage length
    const duration = args.duration as number | undefined
    if (isDefined(duration)) {
      const key = capitalizeFirstLetter(stage)
      const ref = referendumStageConf[key]
      if (ref) ref.started = duration - DefaultDurations[stage]
    }
  }

  const newSpec = merger.merge(oldSpec, config)
  writeFileSync(pathName, `${JSON.stringify(newSpec, null, 2)}\n`)
}

yargs(process.argv.slice(2))
  .usage('yarn set-chain-spec <command>')
  .scriptName('')
  .command('announcing', 'Make the node start at the Announcing stage', handlerFor('announcing'))
  .command('voting', 'Make the node start at the Voting stage', builder, handlerFor('voting'))
  .command('revealing', 'Make the node start at the Revealing stage', builder, handlerFor('revealing'))
  .demandCommand().argv

function builder(argv: yargs.Argv<unknown>) {
  argv.options({ d: { type: 'number', alias: 'duration' } })
}
