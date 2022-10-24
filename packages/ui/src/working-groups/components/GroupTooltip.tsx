import React from 'react'
import styled from 'styled-components'

import { LinkSymbol } from '@/common/components/icons/symbols'
import { TooltipExternalLink, Tooltip, TooltipDefault } from '@/common/components/Tooltip'
import { TextMedium } from '@/common/components/typography'

export const GroupTooltip = ({ name, link }: { name: string; link?: string }) => {
  if (!link) return <div />

  const TooltipText = () => (
    <div>
      <TextMedium>{name}</TextMedium>
      <TooltipExternalLink href={link} target="_blank">
        <TextMedium>Learn more about this group</TextMedium> <LinkSymbol />
      </TooltipExternalLink>
    </div>
  )

  return (
    <Tooltip tooltipText={<TooltipText />}>
      <LinkSymbol />
    </Tooltip>
  )
}
