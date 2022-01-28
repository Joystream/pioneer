import React, { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { ItemCount } from '@/common/components/ItemCount'
import { Loading } from '@/common/components/Loading'
import { ForumIcon } from '@/common/components/page/Sidebar/LinksIcons'
import { TextExtraSmall, TextMedium } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { cutText } from '@/common/helpers'
import { ForumThreadMention } from '@/forum/types'
import { MemberInfo } from '@/memberships/components'

export interface ForumThreadTooltipProps {
  onMount(): void
  mention?: ForumThreadMention
}

export const ForumThreadTooltip = ({ onMount, mention }: ForumThreadTooltipProps) => {
  const { t } = useTranslation()

  const description = useMemo(() => mention?.text && cutText(mention.text), [mention])

  useEffect(() => {
    !mention && onMount()
  }, [])

  return (
    <Container>
      {mention ? (
        <>
          <TextMedium bold>{mention.title}</TextMedium>
          <MemberInfo member={mention.author} size="s" memberSize="s" hideGroup isOnDark />
          {description && <TextMedium lighter>{description}</TextMedium>}
          <Footer>
            <ForumIcon />
            <TextExtraSmall bold lighter>
              {t('mentions.tooltips.forumThread.answers')}
            </TextExtraSmall>
            <ItemCount count={mention.visiblePostsCount - 1} />
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

  ${TextMedium} {
    &:first-child {
      color: ${Colors.White};
    }
  }
`

const Footer = styled.div`
  display: flex;
  border-top: 1px solid ${Colors.Black[600]};
  column-gap: 8px;
  padding-top: 10px;
  align-items: center;

  svg > path {
    fill: ${Colors.Black[400]};
  }

  ${TextExtraSmall} {
    text-transform: uppercase;
  }
`
