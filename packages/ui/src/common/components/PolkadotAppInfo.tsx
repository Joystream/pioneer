import React from 'react'

import { PolkadotSymbol } from '@/common/components/icons/symbols/PolkadotSymbol'
import { Link } from '@/common/components/Link'
import { SettingsInformation } from '@/common/components/SettingsInformation'
import { TextMedium } from '@/common/components/typography'

interface PolkadotAppInfoProps {
  rpcUrl: string
  className?: string
}

export const PolkadotAppInfo = ({ rpcUrl }: PolkadotAppInfoProps) => {
  return (
    <SettingsInformation icon={<PolkadotSymbol />} title="Polkadot Explorer">
      <TextMedium>
        Some operations for nomination and validation are only supported via Polkadot.js app.{' '}
        <Link href={`https://polkadot.js.org/apps/?rpc=${rpcUrl}#/explorer`}>Check Joystream network explorer</Link>
      </TextMedium>
    </SettingsInformation>
  )
}
