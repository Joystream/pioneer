import { readFileSync, writeFileSync } from 'fs'

import yargs from 'yargs'

import { isDefined, objectEquals } from '../../../src/common/utils'
import rawCandidates from '../../../src/mocks/data/raw/candidates.json'
import rawMembers from '../../../src/mocks/data/raw/members.json'
import rawVotes from '../../../src/mocks/data/raw/votes.json'

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
const fromLastElection = objectEquals({ electionRoundId: String(CYCLE_ID) })

const candidates = rawCandidates.filter(fromLastElection).map((candidate) => [
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

const votes = rawVotes.filter(fromLastElection).map((vote) => [
  vote.castBy,
  {
    commitment: vote.commitment,
    cycle_id: CYCLE_ID,
    stake: vote.stake,
    vote_for: vote.voteForId ? Number(vote.voteForId) : null,
  },
])

const DefaultDurations = { voting: 5, revealing: 7 }

const handlerFor = (stageKind: 'announcing' | 'voting' | 'revealing') => (args: any) => {
  const pathName = `${__dirname}/data/chain-spec.json`
  const stage = stageKind.toLowerCase() as typeof stageKind

  // Load the current chain spec
  const spec = JSON.parse(readFileSync(pathName, 'utf8'))
  const { membership, council, referendumInstance1: referendum } = spec.genesis.runtime

  // Apply the stage config
  council.stage = configs[stage].council.stage
  referendum.stage = configs[stage].referendumInstance1.stage

  // Mock the chain data
  membership.members = members
  council.announcementPeriodNr = CYCLE_ID
  referendum.votes = votes

  council.candidates = []
  if (stage === 'voting' || stage === 'revealing') {
    council.candidates = candidates
    council.stage.stage.Election.candidates_count = candidates.length

    // HACK set stage length
    const referendumStage = referendum.stage[Object.keys(referendum.stage)[0]]
    referendumStage.started = isDefined(args.duration) ? args.duration - DefaultDurations[stage] : 0
  }

  // Override the current chain spec
  writeFileSync(pathName, JSON.stringify(spec, null, 2))
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
