import React, { useMemo } from 'react'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { Loading } from '@/common/components/Loading'
import { NoAccountStep } from '@/common/modals/OnBoardingModal/components/NoAccountStep'
import { SelectAccountStep } from '@/common/modals/OnBoardingModal/components/SelectAccountStep'

interface Props {
  onAccountSelect: (address: string) => void
}

export const OnBoardingAccount = ({ onAccountSelect }: Props) => {
  const { hasAccounts, isLoading } = useMyAccounts()

  const step = useMemo(() => {
    if (!hasAccounts) {
      return <NoAccountStep />
    }

    return <SelectAccountStep onAccountSelect={onAccountSelect} />
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return step
}
