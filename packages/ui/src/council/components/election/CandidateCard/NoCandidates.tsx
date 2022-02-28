import React from 'react'
import { generatePath } from 'react-router'
import { useHistory } from 'react-router-dom'

import { TransactionButton } from '@/common/components/buttons/TransactionButton'
import { ArrowRightIcon } from '@/common/components/icons'
import { NoData } from '@/common/components/NoData'
import { TextMedium } from '@/common/components/typography'
import { CouncilRoutes } from '@/council/constants'

export const NoCandidates = () => {
  const history = useHistory()

  const goToCouncilPage = () => {
    history.push(generatePath(CouncilRoutes.council))
  }
  return (
    <NoData>
      <h3>There is no election now</h3>
      <TextMedium>
        Announcing period for new candidates starts when council period changes to Election. Elections are not held
        during the Normal state of council. Please refer to the council period length in the council module
      </TextMedium>
      <TransactionButton style="primary" size="medium" onClick={goToCouncilPage}>
        View current council <ArrowRightIcon white />
      </TransactionButton>
    </NoData>
  )
}
