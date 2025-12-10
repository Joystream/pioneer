import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'

import { useModal } from '@/common/hooks/useModal'
import { ValidatorsRoutes } from '@/validators/constants/routes'
import { ClaimStakingRewardsModalCall } from '@/validators/modals/ClaimStakingRewardsModal'

export const useClaimAllNavigation = () => {
  const history = useHistory()
  const { showModal } = useModal<ClaimStakingRewardsModalCall>()

  return useCallback(() => {
    history.push(ValidatorsRoutes.stakes)
    showModal({ modal: 'ClaimStakingRewardsModal' })
  }, [history, showModal])
}
