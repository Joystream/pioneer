import BN from 'bn.js'

import { createType } from '@/common/model/createType'

describe('AddNewProposalModal types parameters', () => {
  describe('Specific parameters', () => {
    describe('createWorkingGroupLeadOpening', () => {
      const result = createType('PalletProposalsCodexProposalDetails', {
        CreateWorkingGroupLeadOpening: {
          description: 'Dolor deserunt adipisicing velit et.',
          stakePolicy: {
            stakeAmount: new BN(100),
            leavingUnstakingPeriod: 10,
          },
          rewardPerBlock: 10,
          group: 'Forum',
        },
      })

      it('Stake policy', () => {
        const stakePolicy = result.asCreateWorkingGroupLeadOpening.stakePolicy.toJSON()
        expect(stakePolicy).toEqual({ stakeAmount: 100, leavingUnstakingPeriod: 10 })
      })
    })
  })
})
