import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { BountyWinnerListItem } from '@/bounty/components/BountyWinnerListItem/BountyWinnerListItem'
import { Bounty } from '@/bounty/types/Bounty'
import { List } from '@/common/components/List'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextHuge, TextMedium } from '@/common/components/typography'
import { BN_ZERO, Colors } from '@/common/constants'
import { randomBlock } from '@/mocks/helpers/randomBlock'

interface Props {
  bounty: Bounty
}

export const WinnersTab = ({ bounty }: Props) => {
  const { t } = useTranslation('bounty')

  const renderedWinners = useMemo(() => {
    const winners = bounty.entries?.filter((entry) => entry.winner) ?? []

    if (winners.length) {
      return (
        <List as="div">
          {winners.map((winner) => (
            <BountyWinnerListItem
              entrant={winner.worker}
              inBlock={bounty.judgement?.inBlock ?? randomBlock()}
              reward={winner.reward ?? BN_ZERO}
            />
          ))}
        </List>
      )
    }

    return (
      <InformationBox>
        <TextHuge value bold>
          {t('information.bountyFailed.title')}
        </TextHuge>
        <TextMedium>{t('information.bountyFailed.description')}</TextMedium>
      </InformationBox>
    )
  }, [bounty])

  return <RowGapBlock gap={4}>{renderedWinners}</RowGapBlock>
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
