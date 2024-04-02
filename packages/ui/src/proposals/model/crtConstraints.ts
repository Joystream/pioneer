import { Permill } from '@polkadot/types/interfaces'
import { combineLatest, map } from 'rxjs'

import { Api } from '@/api'
import { permillToPercent, whenDefined } from '@/common/utils'

const toPercent = map((permill: Permill) => permillToPercent(Number(permill)))

export const crtConstraints$ = (api: Api | undefined) =>
  whenDefined(api?.query.projectToken, (projectToken) =>
    combineLatest({
      ammBuyTxFees: projectToken.ammBuyTxFees().pipe(toPercent),
      ammSellTxFees: projectToken.ammSellTxFees().pipe(toPercent),
      bloatBond: projectToken.bloatBond(),
      maxYearlyRate: projectToken.maxYearlyPatronageRate().pipe(toPercent),
      minAmmSlope: projectToken.minAmmSlopeParameter(),
      minRevenueSplitDuration: projectToken.minRevenueSplitDuration().pipe(map(Number)),
      minRevenueSplitTimeToStart: projectToken.minRevenueSplitTimeToStart().pipe(map(Number)),
      minSaleDuration: projectToken.minSaleDuration().pipe(map(Number)),
      salePlatformFee: projectToken.salePlatformFee().pipe(toPercent),
    } as const)
  )
