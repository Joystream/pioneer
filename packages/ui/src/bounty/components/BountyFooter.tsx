import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { Bounty } from '@/bounty/types/Bounty'
import { BlockInfo } from '@/common/components/BlockTime/BlockInfo'
import { TextSmall } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { formatDateString } from '@/common/model/formatters'

interface Props {
  bounty: Bounty
}

export const BountyFooter = ({ bounty }: Props) => {
  const { t } = useTranslation()

  return (
    <BountyInfoWrapper>
      <TextSmall>
        {t('created')}: {formatDateString(bounty.createdAt)}
      </TextSmall>
      <Separator>{' | '}</Separator>
      <BlockInfo
        block={{
          number: bounty.inBlock,
          network: 'OLYMPIA',
          timestamp: bounty.createdAt,
        }}
      />
    </BountyInfoWrapper>
  )
}

const BountyInfoWrapper = styled.div`
  display: flex;
  margin-top: 30px;
  color: ${Colors.Black[400]};
`

const Separator = styled.span`
  font-size: inherit;
  line-height: inherit;
  margin: 0 5px;
`
