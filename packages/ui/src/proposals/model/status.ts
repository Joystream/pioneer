export const proposalActiveStatuses = ['deciding', 'gracing', 'dormant']
export const proposalPastStatuses = [
  'vetoed',
  'executed',
  'executionFailed',
  'slashed',
  'rejected',
  'expired',
  'cancelled',
  'cancelledByRuntime',
]

export const proposalStatuses = [...proposalActiveStatuses, ...proposalPastStatuses]
