import React from 'react'
import styled from 'styled-components'

import { LinkSymbol } from '@/common/components/icons/symbols'
import { TooltipExternalLink, Tooltip, TooltipDefault } from '@/common/components/Tooltip'
import { TextMedium } from '@/common/components/typography'

export const GroupTooltip = ({ name, link }: { name: string; link?: string }) => {
  if (!link) return <div />

  const TooltipText = () => (
    <StyledTooltipExternalLink href={link} target="_blank">
      <TextMedium>{name}</TextMedium>
      <TextMedium>Learn more about this group</TextMedium> <LinkSymbol />
    </StyledTooltipExternalLink>
  )

  return (
    <Tooltip tooltipText={<TooltipText />}>
      <LinkSymbol />
    </Tooltip>
  )
}

const StyledTooltipExternalLink = styled(TooltipExternalLink)`
  margin-top: unset;
`
