import BN from 'bn.js'
import React from 'react'

import { TokenValue } from '../../../common/components/typography'
import { WorkingGroupApplication } from '../../types/WorkingGroupApplication'

interface Props {
  application: WorkingGroupApplication
}

export const GeneralDetails = React.memo(({ application }: Props) => (
  <>
    <table>
      <tr>
        <td>Opening</td>
        <td>{application.opening.type + ' ' + application.opening.groupName}</td>
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
        <td>{application.stakingAccount}</td>
      </tr>
      <tr>
        <td>Applied on</td>
        <td>{application.createdAtTime}</td>
      </tr>
      <tr>
        <td>Application ID</td>
        <td>{application.id}</td>
      </tr>
    </table>
  </>
))
