import BN from 'bn.js'

import { asBlock, Block } from '@/common/types'
import { Member } from '@/memberships/types'

import { WorkingGroupApplicationFieldsFragment } from '../queries'

import { GroupIdName } from '.'
import { asWorkingGroupName } from './WorkingGroup'

export interface WorkingGroupApplication {
  id: string
  runtimeId: number
  opening: {
    id: string
    type: string
    groupName: string
    groupId: GroupIdName
    rewardPerBlock: BN
  }
  applicant?: Member
  stakingAccount: string
  status?: string
  createdAtBlock: Block
}

export const asApplication = (fields: WorkingGroupApplicationFieldsFragment): WorkingGroupApplication => ({
  id: fields.id,
  runtimeId: fields.runtimeId,
  opening: {
    id: fields.opening.id,
    type: fields.opening.type,
    groupName: asWorkingGroupName(fields.opening.group.name),
    groupId: fields.opening.group.id as GroupIdName,
    rewardPerBlock: new BN(fields.opening.rewardPerBlock),
  },
  status: fields.status.__typename,
  stakingAccount: fields.stakingAccount,
  createdAtBlock: asBlock(fields.createdInEvent),
})
