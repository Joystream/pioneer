import { format } from 'date-fns'
import React, { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { Loading } from '@/common/components/Loading'
import { TextMedium, TextSmall } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { cutText } from '@/common/helpers'
import { MemberInfo } from '@/memberships/components'
import { WorkingGroupApplicationMention } from '@/working-groups/types/WorkingGroupApplication'

import { BadgeStatus } from '../BadgeStatus'

export interface ApplicationTooltipProps {
  onMount(): void
  mention?: WorkingGroupApplicationMention
  urlAddress?: string
}

export const ApplicationTooltip = React.memo(({ mention, onMount, urlAddress }: ApplicationTooltipProps) => {
  const { t } = useTranslation()

  const date = useMemo(() => mention && format(new Date(mention.createdAtBlock.timestamp), 'Pp'), [mention])

  const description = useMemo(() => mention?.opening.description && cutText(mention.opening.description), [mention])

  const shortDescription = useMemo(
    () => mention?.opening.shortDescription && cutText(mention.opening.shortDescription, 20),
    [mention]
  )

  useEffect(() => {
    !mention && onMount()
  }, [])

  return (
    <Container id="application-tooltip">
      {mention ? (
        <>
          <TextSmall lighter>{t('mentions.tooltips.application.appliedOn', { date })}</TextSmall>
          <TextMedium bold>{t('mentions.tooltips.application.application')}</TextMedium>
          <MemberInfo member={mention.applicant} size="s" memberSize="s" hideGroup isOnDark />
          <Footer>
            <FooterRow>
              <a href={urlAddress}>
                <TextMedium bold>{shortDescription}</TextMedium>
              </a>
              <BadgeStatus inverted size="l">
                {mention.opening.type}
              </BadgeStatus>
            </FooterRow>
            <TextMedium lighter>{description}</TextMedium>
          </Footer>
        </>
      ) : (
        <Loading />
      )}
    </Container>
  )
})

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 14px;
  min-width: 150px;

  ${TextMedium} {
    color: ${Colors.White};
  }
`

const Footer = styled.div`
  display: flex;
  border-top: 1px solid ${Colors.Black[600]};
  padding-top: 10px;
  flex-direction: column;
  row-gap: 14px;

  ${TextMedium} {
    color: ${Colors.Black[400]};
  }
`

const FooterRow = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 0;

  ${TextMedium} {
    color: ${Colors.White};
    max-width: 70%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    &:hover {
      color: ${Colors.Blue[500]};
    }
  }
`
