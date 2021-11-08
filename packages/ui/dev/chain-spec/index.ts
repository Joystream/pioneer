import { readFileSync, writeFileSync } from 'fs'

import { DeepMerger } from '@apollo/client/utilities'
import yargs from 'yargs'

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

const handlerFor = (stage: 'announcing' | 'voting' | 'revealing') => () => {
  const merger = new DeepMerger()
  const pathName = `${__dirname}/data/chain-spec.json`
  const oldSpec = JSON.parse(readFileSync(pathName, 'utf8'))
  const config = configs[stage]

  // Set members
  oldSpec.genesis.runtime.membership.members = members

  // Set candidates (on Voting and Revealing stage)
  const councilStageConf = config.genesis.runtime.council.stage.stage
  if (councilStageConf.Election) {
    oldSpec.genesis.runtime.council.candidates = candidates
    councilStageConf.Election.candidates_count = candidates.length
  }

  const newSpec = merger.merge(oldSpec, config)
  writeFileSync(pathName, `${JSON.stringify(newSpec, null, 2)}\n`)
}

yargs(process.argv.slice(2))
  .usage('yarn set-chain-spec <command>')
  .scriptName('')
  .command('announcing', 'Make the node start at the Announcing stage', handlerFor('announcing'))
  .command('voting', 'Make the node start at the Voting stage', handlerFor('voting'))
  .command('revealing', 'Make the node start at the Revealing stage', handlerFor('revealing'))
  .demandCommand().argv
