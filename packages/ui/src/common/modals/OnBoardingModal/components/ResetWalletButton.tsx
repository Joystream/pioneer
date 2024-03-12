import React from 'react'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { ButtonGhost } from '@/common/components/buttons'
import { Arrow } from '@/common/components/icons'

export const ResetWalletButton = () => {
  const { setWallet } = useMyAccounts()
  return (
    <ButtonGhost size="medium" onClick={() => setWallet?.(undefined)}>
      <Arrow direction="left" />
      Change wallet
    </ButtonGhost>
  )
}
