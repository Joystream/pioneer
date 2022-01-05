import { sumStakes } from '@/common/utils/bn'
import { WorkerFieldsFragment } from '@/working-groups/queries'

export const getAverageStake = (workers: Pick<WorkerFieldsFragment, 'stake'>[]) =>
  sumStakes(workers).divn(workers.length)
