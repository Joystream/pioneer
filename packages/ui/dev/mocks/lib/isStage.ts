/* eslint-disable no-console */
import { ApiPromise } from '@polkadot/api'
import chalk from 'chalk'

export const isStage = async (api: ApiPromise, targetStage: 'Announcing' | 'Voting' | 'Revealing' | 'Idle') => {
  const currentCouncilStage = await api.query.council.stage()
  const currentElectionStage = await api.query.referendum.stage()
  const currentStage = currentCouncilStage.stage.isElection
    ? (currentElectionStage.type as 'Voting' | 'Revealing')
    : (currentCouncilStage.stage.type as 'Announcing' | 'Idle')
  const currentStageStartedAt = currentCouncilStage.stage.isElection
    ? currentElectionStage.isVoting
      ? currentElectionStage.asVoting.started
      : currentElectionStage.asRevealing.started
    : currentCouncilStage.changed_at

  const currentBlock = await api.derive.chain.bestNumber()
  const { announcingPeriodDuration, idlePeriodDuration } = api.consts.council
  const { voteStageDuration, revealStageDuration } = api.consts.referendum
  const durationByStage = {
    Announcing: announcingPeriodDuration,
    Voting: voteStageDuration,
    Revealing: revealStageDuration,
    Idle: idlePeriodDuration,
  } as const

  const currentStageEndsIn = currentStageStartedAt.add(durationByStage[currentStage]).sub(currentBlock)

  process.stdout.write(
    `Current stage: ${chalk.blue(currentStage)} - blocks left: ${chalk.blue(currentStageEndsIn.toNumber())}...`
  )

  return currentStage === targetStage && currentStageEndsIn.gten(3)
}
