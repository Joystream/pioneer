import React, { useMemo } from 'react'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { Loading } from '@/common/components/Loading'
import { NoAccountStep } from '@/common/modals/OnBoardingModal/components/NoAccountStep'
import { SelectAccountStep } from '@/common/modals/OnBoardingModal/components/SelectAccountStep'

export const OnBoardingAccount = () => {
  const { hasAccounts, isLoading } = useMyAccounts()

  const step = useMemo(() => {
    if (!hasAccounts) {
      return <NoAccountStep />
    }

    return <SelectAccountStep />
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return step
}
