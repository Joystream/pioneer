import BN from 'bn.js'
import React from 'react'
import styled from 'styled-components'

import { UnknownAccountInfo } from '../../../accounts/components/UnknownAccountInfo'
import { LabelLink } from '../../../common/components/forms'
import { BlockIcon } from '../../../common/components/icons'
import { TextMedium, TextSmall, TokenValue } from '../../../common/components/typography'
import { Colors, Transitions } from '../../../common/constants'
import { formatDateString, formatTokenValue } from '../../../common/model/formatters'
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
        <AboutDateColumn>
          <AboutText>{formatDateString(application.createdAtTime)}</AboutText>
          <Block height={application.createdAtBlock} network={'Olympia'} />
        </AboutDateColumn>
      </tr>
      <tr>
        <td>Application ID</td>
        <td>{application.id}</td>
      </tr>
    </table>
  </>
))

const AboutDateColumn = styled.div`
  display: grid;
  grid-row-gap: 4px;
  width: 100%;
  height: fit-content;
`
const AboutText = styled(TextMedium)`
  color: ${Colors.Black[600]};
`
interface BlockInfoProps {
  height: number
  network: string
}
const Block = React.memo(({ height, network }: BlockInfoProps) => (
  <BlockInfo>
    <BlockIcon />
    <BlockNumber>{formatTokenValue(height)}</BlockNumber>
    <BlockNetworkInfo>on {network} network</BlockNetworkInfo>
  </BlockInfo>
))

const BlockInfo = styled.span`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 4px;
  align-items: center;
  width: fit-content;
  height: fit-content;
  color: ${Colors.Black[400]};
`
const BlockNetworkInfo = styled(TextSmall)`
  color: ${Colors.Black[400]};
`
const BlockNumber = styled(LabelLink)`
  font-size: inherit;
  line-height: inherit;
  transition: ${Transitions.all};
`
