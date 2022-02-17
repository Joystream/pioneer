import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { Bounty } from '@/bounty/types/Bounty'
import { TextHuge, TextMedium } from '@/common/components/typography'
import { Colors } from '@/common/constants'

interface Props {
  bounty: Bounty
}

export const WinnersTab = ({ bounty }: Props) => {
  const { t } = useTranslation('bounty')
  const winners = useMemo(() => bounty.entries?.filter((entry) => entry.winner), [bounty])

  if (!winners?.length) {
    return (
      <InformationBox>
        <TextHuge value bold>
          {t('information.bountyFailed.title')}
        </TextHuge>
        <TextMedium>{t('information.bountyFailed.description')}</TextMedium>
      </InformationBox>
    )
  }

  // todo add displaying winners when needed
  return null
}

const InformationBox = styled.div`
  width: 100%;
  height: min-content;
  background-color: ${Colors.Blue[50]};
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  padding: 15px;
`
