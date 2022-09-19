import { format } from 'date-fns'
import React, { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { Loading } from '@/common/components/Loading'
import { TextMedium, TextSmall } from '@/common/components/typography'
import { cutText } from '@/common/helpers'
import { ForumPostMention } from '@/forum/types'
import { MemberInfo } from '@/memberships/components'

export interface ForumPostTooltipProps {
  onMount(): void
  mention?: ForumPostMention
}

export const ForumPostTooltip = ({ mention, onMount }: ForumPostTooltipProps) => {
  const { t } = useTranslation()

  const description = useMemo(() => mention?.text && cutText(mention.text), [mention])

  const date = useMemo(() => mention && format(new Date(mention.createdAt), 'Pp'), [mention])

  useEffect(() => {
    !mention && onMount()
  }, [])

  return (
    <Container id="forum-post-tooltip">
      {mention ? (
        <>
          <TextSmall lighter>{t('mentions.tooltips.forumPost.repliedOn', { date })}</TextSmall>
          <MemberInfo member={mention.author} size="s" memberSize="s" hideGroup isOnDark />
          {description && <TextMedium lighter>{description}</TextMedium>}
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
`
