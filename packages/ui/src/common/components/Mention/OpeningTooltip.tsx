import BN from 'bn.js'
import { formatDistanceToNowStrict, isPast } from 'date-fns'
import React, { useEffect, useMemo } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { CurrencyName } from '@/app/constants/currency'
import { BadgeStatus } from '@/common/components/BadgeStatus'
import { Loading } from '@/common/components/Loading'
import { TextMedium, TextSmall } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { cutText } from '@/common/helpers'
import { formatTokenValue } from '@/common/model/formatters'
import { WorkingGroupOpeningMention } from '@/working-groups/types'

export interface OpeningTooltipProps {
  onMount(): void
  mention?: WorkingGroupOpeningMention
  urlAddress?: string
}

export const OpeningTooltip = ({ onMount, mention, urlAddress }: OpeningTooltipProps) => {
  const { t } = useTranslation()

  const shortDescription = useMemo(() => mention?.shortDescription && cutText(mention.shortDescription, 20), [mention])
  const description = useMemo(() => mention?.description && cutText(mention.description), [mention])

  const distance = useMemo(() => {
    const date = mention?.expectedEnding && new Date(mention?.expectedEnding)
    if (date && !isPast(date)) {
      return formatDistanceToNowStrict(date)
    }
  }, [mention])

  const reward = useMemo(() => (mention ? formatTokenValue(new BN(mention?.rewardPerBlock).muln(3600)) : 0), [mention])

  useEffect(() => {
    !mention && onMount()
  }, [])

  return (
    <Container id="opening-tooltip">
      {mention ? (
        <>
          <TextSmall lighter>
            {distance
              ? t('mentions.tooltips.opening.duration', { time: distance })
              : t('mentions.tooltips.opening.past')}
          </TextSmall>
          <Row>
            <a href={urlAddress}>
              <TextMedium bold>{shortDescription}</TextMedium>
            </a>
            <BadgeStatus inverted size="l">
              {mention.type}
            </BadgeStatus>
          </Row>
          {description && <TextMedium lighter>{description}</TextMedium>}
          <Footer>
            <FooterRow>
              <Trans t={t} i18nKey="mentions.tooltips.opening.reward">
                <TextSmall lighter>''</TextSmall>
                <TextMedium bold>{{ value: reward }}</TextMedium>
                <TextMedium bold>{CurrencyName.integerValue}</TextMedium>
              </Trans>
            </FooterRow>
            <FooterRow>
              <span>
                <Trans t={t} i18nKey="mentions.tooltips.opening.applications">
                  <TextSmall lighter>''</TextSmall>
                  <TextMedium bold>{{ current: mention.applicants }}</TextMedium>
                </Trans>
              </span>
              <span>
                <Trans t={t} i18nKey="mentions.tooltips.opening.hired">
                  <TextSmall lighter>''</TextSmall>
                  <TextMedium bold>{{ current: mention.hiring.current }}</TextMedium>
                  <TextMedium lighter>{{ limit: mention.hiring.limit }}</TextMedium>
                </Trans>
              </span>
            </FooterRow>
          </Footer>
        </>
      ) : (
        <Loading />
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 14px;
  min-width: 150px;

  ${TextMedium} {
    &:first-child {
      color: ${Colors.White};
    }
  }
`

const Row = styled.div`
  display: inline-flex;
  justify-content: space-between;

  ${TextMedium} {
    color: ${Colors.White};
  }
`

const FooterRow = styled.div`
  display: inline-flex;
  align-items: center;
  column-gap: 5px;

  ${TextMedium} {
    color: ${Colors.White};
  }

  &:last-child {
    column-gap: 16px;

    > span {
      display: inline-flex;
      align-items: center;
      column-gap: 5px;

      &:last-child {
        ${TextMedium} {
          &:last-child {
            color: ${Colors.Black[400]};
          }
        }
      }
    }
  }
`

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${Colors.Black[600]};
  padding-top: 10px;
  row-gap: 12px;
`
