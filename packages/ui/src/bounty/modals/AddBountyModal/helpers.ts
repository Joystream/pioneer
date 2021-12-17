import { AddBountyModalMachineState, AddBountyStates } from '@/bounty/modals/AddBountyModal/machine'

export const isNextStepValid = (state: AddBountyModalMachineState): boolean => {
  const { context } = state
  switch (true) {
    case state.matches(AddBountyStates.generalParameters): {
      return !!(context.creator && context.description && context.title && context.coverPhotoLink)
    }
    case state.matches(AddBountyStates.fundingPeriodDetails): {
      return !!(
        context.cherry &&
        context.fundingMaximalRange &&
        (context.fundingPeriodType === 'limited' ? context.fundingPeriodLength && context.fundingMinimalRange : true)
      )
    }
    case state.matches(AddBountyStates.workingPeriodDetails): {
      const stake = !!(context.workingPeriodStakeAllowance ? context.workingPeriodStake : true)
      const type = !!(context.workingPeriodType === 'closed' ? context.workingPeriodWhitelist?.length : true)

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
