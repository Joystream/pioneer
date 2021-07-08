import React from 'react'
import styled from 'styled-components'

import { ButtonInnerWrapper } from '@/common/components/buttons'
import { DropDownButton, DropDownToggle } from '@/common/components/buttons/DropDownToggle'
import { MarkdownPreview } from '@/common/components/MarkdownPreview'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { BorderRad, Colors } from '@/common/constants'
import { useToggle } from '@/common/hooks/useToggle'

interface Props {
  rationale: string
}
export const RationalePreview = ({ rationale }: Props) => {
  const [isOpen, toggle] = useToggle()

  return (
    <RationaleSection>
      <RationaleToggle>
        <h5>Rationale</h5>
        <ToggleButton isDropped={isOpen} onClick={toggle} />
      </RationaleToggle>

      <DropDownToggle isDropped={isOpen}>
        <MarkdownPreview markdown={rationale} />
      </DropDownToggle>
    </RationaleSection>
  )
}

const RationaleSection = styled(RowGapBlock).attrs({ gap: 24 })`
  padding: 16px;
  background: ${Colors.Black[50]};
  border: 1px solid ${Colors.Black[200]};
  border-radius: ${BorderRad.s};
`

const RationaleToggle = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`

const ToggleButton = styled(DropDownButton)`
  ${ButtonInnerWrapper} > svg {
    color: ${Colors.Black[600]};
  }
`
