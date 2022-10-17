import { GroupIdName } from '../types'

type OptionRequirements = Partial<{
  [key in GroupIdName]: string
}>

export const workingGroupLinks: OptionRequirements = {
  storageWorkingGroup: 'https://joystream.gitbook.io/testnet-workspace/system/storage',
  contentWorkingGroup: 'https://joystream.gitbook.io/testnet-workspace/system/content-directory',
  operationsWorkingGroupAlpha: 'https://joystream.gitbook.io/testnet-workspace/system/builders',
  operationsWorkingGroupGamma: 'https://joystream.gitbook.io/testnet-workspace/system/marketers',
  operationsWorkingGroupBeta:
    'https://joystream.gitbook.io/testnet-workspace/testnet/council-period-scoring/human-resources-score',
  distributionWorkingGroup: 'https://joystream.gitbook.io/testnet-workspace/system/storage#distributor',
  membershipWorkingGroup:
    'https://joystream.gitbook.io/testnet-workspace/testnet/council-period-scoring/human-resources-score',
}
