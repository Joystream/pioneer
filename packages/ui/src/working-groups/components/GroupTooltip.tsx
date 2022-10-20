import React from 'react'
import styled from 'styled-components'

import { LinkSymbol } from '@/common/components/icons/symbols'
import { TooltipExternalLink, Tooltip, TooltipDefault } from '@/common/components/Tooltip'
import { TextMedium } from '@/common/components/typography'

export const GroupTooltip = ({ link, show }: { link?: string; show: boolean }) => {
  if (!link || !show) return <></>
  return (
    <Tooltip
      tooltipText={
        <StyledTooltipExternalLink href={link} target="_blank">
          <TextMedium>Learn more about this group</TextMedium> <LinkSymbol />
        </StyledTooltipExternalLink>
      }
    >
      <TooltipDefault />
    </Tooltip>
  )
}

const StyledTooltipExternalLink = styled(TooltipExternalLink)`
  margin-top: unset;
`
