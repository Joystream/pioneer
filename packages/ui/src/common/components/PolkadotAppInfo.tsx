import React from 'react'

import { PolkadotSymbol } from '@/common/components/icons/symbols/PolkadotSymbol'
import { Link } from '@/common/components/Link'
import {
  DetailsItemWrapper,
  NetworkDetailsWrapper,
  StyledDetailsText,
} from '@/common/components/NetworkInfo/NetworkInfo'
import { TextMedium } from '@/common/components/typography'

interface PolkadotAppInfoProps {
  rpcUrl: string
  className?: string
}

export const PolkadotAppInfo = ({ rpcUrl, className }: PolkadotAppInfoProps) => {
  return (
    <NetworkDetailsWrapper className={className}>
      <DetailsItemWrapper>
        <PolkadotSymbol />
        <StyledDetailsText bold>Polkadot Explorer</StyledDetailsText>
      </DetailsItemWrapper>
      <TextMedium>
        Some operations for nomination and validation are only supported via Polkadot.js app.{' '}
        <Link href={`https://polkadot.js.org/apps/?rpc=${rpcUrl}#/explorer`}>Check Joystream network explorer</Link>
      </TextMedium>
    </NetworkDetailsWrapper>
  )
}
