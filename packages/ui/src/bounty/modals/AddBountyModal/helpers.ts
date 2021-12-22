import { AugmentedConst } from '@polkadot/api/types'
import { u32 } from '@polkadot/types'
import { BalanceOf } from '@polkadot/types/interfaces/runtime'
import BN from 'bn.js'

import { AddBountyModalMachineState, AddBountyStates } from '@/bounty/modals/AddBountyModal/machine'
import { BN_ZERO } from '@/common/constants'

interface Conditions {
  minCherryLimit?: BalanceOf & AugmentedConst<'rxjs'>
  maxCherryLimit?: BN
  minFundingLimit?: BalanceOf & AugmentedConst<'rxjs'>
  maxWhitelistSize?: u32 & AugmentedConst<'rxjs'>
  minWorkEntrantStake?: BalanceOf & AugmentedConst<'rxjs'>
}

export const isNextStepValid = (state: AddBountyModalMachineState, conditions: Conditions): boolean => {
  const { context } = state
  switch (true) {
    case state.matches(AddBountyStates.generalParameters): {
      return !!(context.creator && context.description && context.title && context.coverPhotoLink)
    }
    case state.matches(AddBountyStates.fundingPeriodDetails): {
      const isLimited = context.fundingPeriodType === 'limited'
      const limitedConditions = isLimited
        ? context.fundingPeriodLength &&
          context.fundingMinimalRange &&
          context.fundingMinimalRange.gtn(conditions.minFundingLimit?.toNumber() || 0) &&
          context.fundingMinimalRange.lt(context.fundingMaximalRange || BN_ZERO)
        : true
      const cherryConditions =
        context.cherry?.lte(conditions.maxCherryLimit || BN_ZERO) &&
        context.cherry?.gten(conditions.minCherryLimit?.toNumber() || 0)

      return !!(
        context.cherry &&
        cherryConditions &&
        context.fundingMaximalRange &&
        context.fundingMaximalRange.gtn(0) &&
        limitedConditions
      )
    }
    case state.matches(AddBountyStates.workingPeriodDetails): {
      const stake = !!(context.workingPeriodStakeAllowance
        ? context.workingPeriodStake && conditions.minWorkEntrantStake?.lt(context.workingPeriodStake)
        : true)
      const type = !!(context.workingPeriodType === 'closed'
        ? context.workingPeriodWhitelist?.length &&
          conditions.maxWhitelistSize?.gtn(context.workingPeriodWhitelist.length)
        : true)

      return !!(stake && type && context.workingPeriodLength)
    }
    case state.matches(AddBountyStates.judgingPeriodDetails): {
      return !!(context.oracle && context.judgingPeriodLength)
    }
    case state.matches(AddBountyStates.forumThreadDetails): {
      return !!(context.forumThreadTopic && context.forumThreadDescription)
    }
    default:
      return false
  }
}

// export const createBountyParametersFactory = (
//   state: AddBountyModalMachineState
// ): {
//   cherry: BN | undefined
//   oracle: { asMember: string | undefined; isMember: boolean; isCouncil: boolean }
//   funding_type: FundingPeriodType | undefined
// } => ({
//   oracle: {
//     isCouncil: false,
//     isMember: true,
//     asMember: state.context.oracle?.id,
//   },
//   cherry: state.context.cherry,
//   funding_type: state.context.fundingPeriodType,
//   fundingPeriodLength: state.context.fundingPeriodLength,
//   fundingMinimalRange: state.context.fundingMinimalRange,
//   fundingMaximalRange: state.context.fundingMaximalRange,
//   // readonly oracle: BountyActor;
//   // readonly contract_type: AssuranceContractType;
//   // readonly creator: BountyActor;
//   // readonly cherry: u128;
//   // readonly entrant_stake: u128;
//   // readonly funding_type: FundingType;
//   // readonly work_period: u32;
//   // readonly judging_period: u32;
// })
