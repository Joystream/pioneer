import { AN_HOUR, A_MINUTE, A_SECOND } from '../../src/common/constants'
import { durationFormatter, MILLISECONDS_PER_BLOCK } from '../../src/common/model/formatters'
import { withApi } from '../node-mocks/lib/api'

const etaFormat = durationFormatter([
  [AN_HOUR, 'hour'],
  [A_MINUTE, 'minute'],
  [A_SECOND, 'second'],
])

const handler = () =>
  withApi(async (api) => {
    const initialStageEnd = await stageEnd()
    let remaining: number
    while ((remaining = await getRemaining()) > 0) {
      process.stdout.write(`\nWait ${etaFormat(remaining)} for the current stage to end\n`)
      await new Promise<void>((resolve) => setTimeout(() => resolve(), remaining))
    }

    async function stageEnd(): Promise<number> {
      const currentCouncilStage = await api.query.council.stage()

      if (currentCouncilStage.stage.type === 'Election') {
        const currentElectionStage = await api.query.referendum.stage()
        const type = currentElectionStage.type as 'Voting' | 'Revealing'
        const periodName = type === 'Voting' ? 'voteStageDuration' : 'revealStageDuration'
        const duration = api.consts.referendum[periodName]
        const started = currentElectionStage[`as${type}`].started
        return started.add(duration).toNumber()
      } else {
        const type = currentCouncilStage.stage.type as 'Idle' | 'Announcing'
        const periodName = type === 'Idle' ? 'idlePeriodDuration' : 'announcingPeriodDuration'
        const duration = api.consts.council[periodName]
        const started = currentCouncilStage.changedAt
        return started.add(duration).toNumber()
      }
    }

    async function getRemaining(): Promise<number> {
      const currentBlock = (await api.rpc.chain.getHeader()).number.toNumber()
      return (initialStageEnd - currentBlock) * MILLISECONDS_PER_BLOCK
    }
  })

export const nextCouncilStageModule = {
  command: 'nextCouncilStage',
  describe: 'Wait until the next council stage start',
  handler,
}
