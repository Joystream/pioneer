import React, { useMemo } from 'react'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useApi } from '@/api/hooks/useApi'
import { Loading } from '@/common/components/Loading'
import { NoAccountStep } from '@/common/modals/OnBoardingModal/components/NoAccountStep'
import { NoNodeConnection } from '@/common/modals/OnBoardingModal/components/NoNodeConnection'
import { SelectAccountStep } from '@/common/modals/OnBoardingModal/components/SelectAccountStep'

interface Props {
  onAccountSelect?: (address: string) => void
}

export const OnBoardingAccount = ({ onAccountSelect }: Props) => {
  const { hasAccounts, isLoading } = useMyAccounts()
  const { api } = useApi()

  const step = useMemo(() => {
    if (!api?.isConnected) {
      return <NoNodeConnection />
    }

    if (!hasAccounts) {
      return <NoAccountStep />
    }

    return <SelectAccountStep onAccountSelect={onAccountSelect} />
  }, [hasAccounts, api?.isConnected])

  if (isLoading) {
    return <Loading />
  }

  return step
}
