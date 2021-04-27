import BN from 'bn.js'
import React from 'react'

import { UnknownAccountInfo } from '../../../accounts/components/UnknownAccountInfo'
import { AboutDateColumn } from '../../../common/components/AboutDateColumn'
import { TokenValue } from '../../../common/components/typography'
import { openingTitle } from '../../helpers'
import { WorkingGroupApplication } from '../../types/WorkingGroupApplication'

interface Props {
  application: WorkingGroupApplication
}

export const GeneralDetails = React.memo(({ application }: Props) => (
  <>
    <table>
      <tr>
        <td>Opening</td>
        <td>{openingTitle(application)}</td>
      </tr>
      <tr>
        <td>Status</td>
        <td>{application.status}</td>
      </tr>
      <tr>
        <td>Your stake</td>
        <td>
          <TokenValue value={new BN(100000)} />
        </td>
      </tr>
      <tr>
        <td>Staking account</td>
        <td>
          <UnknownAccountInfo address={application.stakingAccount} placeholderName="Staking account" />
        </td>
      </tr>
      <tr>
        <td>Applied on</td>
        <AboutDateColumn time={application.createdAtTime} block={application.createdAtBlock} />
      </tr>
      <tr>
        <td>Application ID</td>
        <td>{application.id}</td>
      </tr>
    </table>
  </>
))
