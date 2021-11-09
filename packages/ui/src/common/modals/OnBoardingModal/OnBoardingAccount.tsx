import React, { useMemo } from 'react'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { Loading } from '@/common/components/Loading'
import { NoAccountStep } from '@/common/modals/OnBoardingModal/components/NoAccountStep'

export const OnBoardingAccount = () => {
  const { hasAccounts, isLoading } = useMyAccounts()

  const step = useMemo(() => {
    if (!hasAccounts) {
      return <NoAccountStep />
    }

    return <div>connect account step</div>
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return step
}
