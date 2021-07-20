import React from 'react'

import { FileIcon } from '@/common/components/icons'
import { StatisticItem, Statistics } from '@/common/components/statistics'
import { TextBig } from '@/common/components/typography'

import { RuntimeUpgrade } from '../../types/ProposalDetails'

import { ProposalPropertiesContent } from './ProposalDetails'

interface Props {
  details: RuntimeUpgrade
}
export const RuntimeUpgradeComponent: ProposalPropertiesContent<'runtimeUpgrade'> = ({ details }: Props) => {
  return (
    <Statistics>
      <StatisticItem title="Blob">
        <TextBig>
          <FileIcon /> File Preview
        </TextBig>
      </StatisticItem>
    </Statistics>
  )
}
