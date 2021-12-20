import React, { useMemo } from 'react'

import { PageHeader } from '@/app/components/PageHeader'
import { BadgesRow } from '@/common/components/BadgeStatus/BadgesRow'
import { BadgeStatus } from '@/common/components/BadgeStatus/BadgeStatus'
import { ButtonGhost, ButtonPrimary } from '@/common/components/buttons'

interface IButtonFactory {
  label: string
  type: 'primary' | 'ghost'
  onClick: () => void
}

interface Props {
  title: string
  badgeNames?: string[]
  buttons?: IButtonFactory[]
}

export const BountyPreviewHeader = ({ title, badgeNames, buttons }: Props) => {
  const compiledButtons = useMemo(() => {
    // todo: replace it with correct logic when api schema arrives
    return buttons?.map((button) =>
      button.type === 'primary' ? (
        <ButtonPrimary size="large" onClick={button.onClick}>
          {button.label}
        </ButtonPrimary>
      ) : (
        <ButtonGhost size="large" onClick={button.onClick}>
          {button.label}
        </ButtonGhost>
      )
    )
  }, [buttons])

  const badges = useMemo(
    () => (
      <BadgesRow space={8}>
        {badgeNames?.map((badge) => (
          <BadgeStatus inverted>{badge}</BadgeStatus>
        ))}
      </BadgesRow>
    ),
    [badgeNames]
  )

  return <PageHeader title={title} buttons={compiledButtons} badges={badges} canGoBack />
}
